require('dotenv').config();
const nodemailer = require('nodemailer');

async function test() {
  console.log("USER:", process.env.GMAIL_USER);
  console.log("PASS:", process.env.GMAIL_APP_PASSWORD ? "SET" : "UNSET");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
  try {
    let info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: "Test Email from Server",
      text: "This is a test to verify nodemailer configuration."
    });
    console.log("Success:", info.messageId);
  } catch (e) {
    console.error("Error:", e);
  }
}
test();
