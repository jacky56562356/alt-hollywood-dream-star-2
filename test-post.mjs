const formData = new FormData();
formData.append('studentNameEn', 'Test User');

fetch('http://localhost:3000/api/submit-application', {
  method: 'POST',
  body: formData
}).then(async r => {
  console.log('Status:', r.status);
  const text = await r.text();
  console.log('Body:', text);
}).catch(console.error);
