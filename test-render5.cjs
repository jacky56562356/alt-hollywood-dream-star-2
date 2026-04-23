const http = require('https');
http.get('https://althollywood.onrender.com', (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', res.headers);
  res.on('data', () => {});
});
