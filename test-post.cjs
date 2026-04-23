const http = require('http');

const req = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/api/submit-application',
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
  }
}, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.write('------WebKitFormBoundary7MA4YWxkTrZu0gW\r\n');
req.write('Content-Disposition: form-data; name="studentNameZh"\r\n\r\n');
req.write('Test\r\n');
req.write('------WebKitFormBoundary7MA4YWxkTrZu0gW--\r\n');
req.end();
