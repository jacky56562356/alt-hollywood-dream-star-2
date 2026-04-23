const http = require('http');
http.get('http://localhost:3000/', (res) => {
  console.log('Status:', res.statusCode);
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => console.log(data.substring(0, 100)));
});
