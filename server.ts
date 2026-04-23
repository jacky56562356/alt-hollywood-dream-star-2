import express from "express";
// import { createServer as createViteServer } from "vite"; // Removed to lazy load
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import multer from "multer";
import cors from "cors";

dotenv.config();

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 25 * 1024 * 1024, // 25 MB limit per file
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Enable all CORS requests to ensure mobile browsers don't fail on preflight OPTIONS
  app.use(cors());

  // Middleware to log all requests
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  // Middleware to parse JSON bodies (increased limit for file uploads)
  app.use(express.json({ limit: '200mb' }));
  app.use(express.urlencoded({ limit: '200mb', extended: true }));

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/submit-application", (req, res) => {
    console.log("GET request made to /api/submit-application. Likely a redirect drop.");
    return res.status(405).json({ error: "Method not allowed. Use POST.", method: req.method, suggestion: "If you see this, the POST request was converted to a GET (often due to http->https redirect or missing trailing slash)." });
  });

  // Handle both with and without trailing slash just in case Exress 5 strictly requires it
  const handleSubmission = async (req: express.Request, res: express.Response) => {
    try {
      const data = req.body || {};
      const files = req.files as Express.Multer.File[];
      
      console.log("Received application submission:", {
        bodyKeys: Object.keys(data),
        filesCount: files?.length
      });

      const userEmail = process.env.GMAIL_USER || process.env.EMAIL_USER;
      const appPassword = process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_PASS;

      if (!userEmail || !appPassword) {
        console.error("Missing EMAIL_USER or EMAIL_PASS environment variables.");
        return res.status(500).json({ error: "Email configuration is missing on the server." });
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: userEmail,
          pass: appPassword,
        },
      });

      // Format all form data into an HTML table
      let htmlContent = `
        <div style="font-family: sans-serif; max-width: 800px; margin: 0 auto; background-color: #ffffff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #ffffff; background-color: #C9A84C; padding: 15px; text-align: center; border-radius: 6px; margin-top: 0;">New Summer Camp Application 2026</h2>
          <p style="color: #555; font-size: 14px; text-align: center; margin-bottom: 20px;">A new application has been submitted. Please review the details below.</p>
          <table border="1" cellpadding="12" style="border-collapse: collapse; width: 100%; border-color: #e0e0e0; font-size: 14px;">
            <tr style="background-color: #f8f9fa;">
               <th style="width: 35%; text-align: left; color: #333; border-bottom: 2px solid #C9A84C;">Field (字段)</th>
               <th style="text-align: left; color: #333; border-bottom: 2px solid #C9A84C;">Value (内容)</th>
            </tr>
      `;

      const fieldNames: Record<string, string> = {
        studentNameZh: "学员姓名（中文）",
        studentNameEn: "Student Name (English)",
        dob: "出生日期",
        age: "年龄",
        gender: "性别",
        session: "选择期次",
        school: "学校名称",
        grade: "年级",
        parentNameZh: "家长姓名（中文）",
        parentNameEn: "Parent Name (English)",
        parentRelation: "与学员关系",
        parentPhone: "联系电话",
        parentAltPhone: "备用联系电话",
        parentEmail: "电子邮件",
        address: "家庭住址",
        city: "城市",
        zip: "邮政编码",
        emergencyName: "紧急联系人姓名",
        emergencyRelation: "紧急联系人与学员关系",
        emergencyPhone: "紧急联系电话",
        emergencyAltPhone: "紧急联系备用电话",
        authorizedPickup: "授权接送人员",
        doctorName: "主治医生姓名",
        doctorPhone: "医生联系电话",
        insurance: "医疗保险信息",
        allergy: "是否有过敏史",
        allergyDetails: "过敏史详情",
        hereditary: "是否有遗传性疾病",
        hereditaryDetails: "遗传病详情",
        meds: "目前是否用药",
        medsDetails: "用药详情",
        conditions: "现有医疗状况",
        conditionsDetails: "医疗状况详情",
        recentIllness: "近期疾病/手术史",
        dietary: "饮食限制",
        physicalLimits: "活动限制",
        medicalNotes: "其他医疗备注",
        experience: "表演/影视经验",
        skills: "特长技能",
        motivation: "报名动机",
        howDidYouHearAboutUs: "如何得知本夏令营",
        consentMedia: "同意媒体使用授权",
        consentMedical: "同意医疗授权",
        consentLiability: "同意责任豁免",
        consentTruth: "确认信息真实",
        consentPrivacy: "同意隐私保护",
        signatureName: "家长签名",
        signatureDate: "签名日期",
        signatureRelation: "签名人关系"
      };

      for (const [key, value] of Object.entries(data)) {
        if (!value || value === "") continue;
        let formattedKey = fieldNames[key];
        if (!formattedKey) {
          formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        }
        let displayValue = value;
        if (value === "on") displayValue = "是 (Yes)";
        
        htmlContent += `
            <tr>
              <td style="font-weight: bold; color: #444; background-color: #fafafa;">${formattedKey}</td>
              <td style="color: #222; white-space: pre-wrap;">${displayValue}</td>
            </tr>
        `;
      }

      htmlContent += `
          </table>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
            <p style="color: #888; font-size: 12px; margin: 0;">ALT Hollywood Dream Star System</p>
            <p style="color: #aaa; font-size: 11px; margin-top: 5px;">This is an automated message. Please do not reply directly to this email.</p>
          </div>
        </div>
      `;

      const studentName = data.studentNameZh || data.studentNameEn || data.childFirstName || 'New Student';

      const mailAttachments: any[] = [];
      if (files && files.length > 0) {
        for (const file of files) {
          mailAttachments.push({
            filename: file.originalname,
            content: file.buffer,
            contentType: file.mimetype
          });
        }
      }

      const mailOptions = {
        from: `"ALT Hollywood Dream Star" <${userEmail}>`,
        to: userEmail,
        subject: `New Summer Camp Application: ${studentName}`,
        html: htmlContent,
        attachments: mailAttachments,
      };

      await transporter.sendMail(mailOptions);
      return res.json({ success: true, message: "Application submitted successfully" });
    } catch (error: any) {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: "Failed to send application", details: error.message });
    }
  };

  app.post("/api/submit-form", upload.any(), handleSubmission);
  app.post("/api/submit-form/", upload.any(), handleSubmission);

  // Catch-all for unhandled API routes (moved to ensure it doesn't conflict)
  app.use("/api", (req, res) => {
    console.log(`404 API Route Not Found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ 
      error: `API route not found: ${req.originalUrl}`,
      method: req.method,
      suggestion: "Check if the path is correct and the method is POST"
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.use((req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Global error handler
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Global error handler caught:", err);
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({ error: "File too large" });
      }
    }
    res.status(500).json({ error: err.message || "Internal Server Error" });
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
