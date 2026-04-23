const formData = new FormData();
formData.append('studentNameEn', 'Dev Test');
fetch('https://ais-dev-fswvhkb7mfa3clgrl3clyh-59405682842.us-west2.run.app/api/submit-application', { method: 'POST', body: formData }).then(r=>console.log(r.status));
