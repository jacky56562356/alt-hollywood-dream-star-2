fetch('https://althollywood.onrender.com/api/health', {
    headers: {
        'Origin': 'https://althollywood.onrender.com',
        'Referer': 'https://althollywood.onrender.com/summer-camp'
    }
}).then(r => console.log('Health:', r.status, r.headers.get('content-type')))
.catch(e => console.error(e));

const fs = require('fs');
fetch('https://althollywood.onrender.com/api/submit-application', {
    method: 'POST',
    headers: {
        'Origin': 'https://althollywood.onrender.com',
        'Referer': 'https://althollywood.onrender.com/summer-camp'
    },
    body: 'hello'
}).then(r => console.log('Submit:', r.status, r.headers.get('content-type')))
.catch(e => console.error(e));
