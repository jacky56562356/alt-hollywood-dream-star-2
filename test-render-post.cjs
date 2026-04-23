const fd = new FormData();
fd.append('studentNameEn', 'Test');
fetch('https://althollywood.onrender.com/api/submit-application', { method: 'POST', body: fd })
  .then(async r => {
    console.log('API POST Status:', r.status);
    console.log('API POST Body:', await r.text());
  })
  .catch(console.error);
