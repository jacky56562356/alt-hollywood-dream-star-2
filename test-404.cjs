const http = require('http');
http.get('http://localhost:3000/some-random-route', (res) => {
  console.log('Status:', res.statusCode);
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => console.log('Length:', data.length));
});
