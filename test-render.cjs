fetch('https://althollywood.onrender.com')
  .then(r => {
    console.log('Status Root:', r.status);
    return r.text();
  }).then(t => console.log('Body Root:', t.slice(0, 200)));

fetch('https://althollywood.onrender.com/api/health')
  .then(r => {
    console.log('Status API:', r.status);
    return r.text();
  }).then(t => console.log('Body API:', t.slice(0, 200)));
