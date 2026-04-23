const fs = require('fs');
fetch('https://ais-pre-fswvhkb7mfa3clgrl3clyh-59405682842.us-west2.run.app/api/health')
  .then(r => console.log('GET Health:', r.status))
  .catch(e => console.error(e));

const fd = new FormData();
fd.append('studentNameEn', 'Test');
fetch('https://ais-pre-fswvhkb7mfa3clgrl3clyh-59405682842.us-west2.run.app/api/submit-application', { method: 'POST', body: fd })
  .then(async r => {
    console.log('POST Submit:', r.status);
    console.log('Body:', await r.text());
  })
  .catch(e => console.error(e));
