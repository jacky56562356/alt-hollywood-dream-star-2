export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const fields = req.body;
    
    let htmlContent = '<h2>New Application - ALT Hollywood Dream Star</h2>';
    htmlContent += '<table border="1" cellpadding="8" style="border-collapse:collapse;width:100%">';
    
    for (const [key, value] of Object.entries(fields)) {
      if (value) {
        htmlContent += `<tr><td style="background:#f5f5f5;font-weight:bold;width:30%">${key}</td><td>${value}</td></tr>`;
      }
    }
    htmlContent += '</table>';

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: 'altdreamstar@gmail.com',
        subject: 'New Application - ALT Hollywood Dream Star',
        html: htmlContent,
      }),
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      const error = await response.json();
      return res.status(500).json({ error: error.message });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
