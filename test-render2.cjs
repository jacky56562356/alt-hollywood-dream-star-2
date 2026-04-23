fetch('https://althollywood.onrender.com/summer-camp')
  .then(r => {
    console.log('Status Route:', r.status);
    return r.text();
  }).then(t => console.log('Body Route:', t.slice(0, 200)));
