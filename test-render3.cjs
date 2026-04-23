fetch('https://althollywood.onrender.com/api/health', { cache: 'no-store' })
  .then(r => {
    console.log('API Status:', r.status);
    return r.text();
  }).then(t => console.log('API Body:', t));
