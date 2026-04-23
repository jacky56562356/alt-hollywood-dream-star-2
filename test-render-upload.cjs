const fs = require('fs');

async function testUpload() {
  try {
    const FormData = require('form-data');
    const form = new FormData();
    form.append('studentName', 'Test Student');
    form.append('studentAge', '12');
    form.append('guardianName', 'Test Guardian');
    form.append('contactInfo', 'test@example.com');
    
    // Create a dummy file
    fs.writeFileSync('dummy.jpg', 'fake image content');
    form.append('headshot', fs.createReadStream('dummy.jpg'));

    const fetch = (await import('node-fetch')).default;
    const res = await fetch('https://althollywood.onrender.com/api/submit-application', {
      method: 'POST',
      body: form,
      headers: {
        'Origin': 'https://althollywood.onrender.com',
        'Referer': 'https://althollywood.onrender.com/summer-camp'
      }
    });

    console.log('Status:', res.status);
    console.log('Body:', await res.text());
  } catch (err) {
    console.error(err);
  }
}

testUpload();
