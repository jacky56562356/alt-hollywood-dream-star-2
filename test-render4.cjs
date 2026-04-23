fetch('https://althollywood.onrender.com')
  .then(r => r.text())
  .then(html => {
    const urls = [];
    const srcMatches = html.match(/src="([^"]+)"/g);
    if (srcMatches) {
        srcMatches.forEach(m => urls.push(m.substring(5, m.length - 1)));
    }
    const hrefMatches = html.match(/href="([^"]+)"/g);
    if (hrefMatches) {
        hrefMatches.forEach(m => urls.push(m.substring(6, m.length - 1)));
    }
    
    console.log("Checking URLs:");
    urls.forEach(url => {
        const fullUrl = url.startsWith('/') ? 'https://althollywood.onrender.com' + url : url;
        fetch(fullUrl)
            .then(r => console.log(r.status, fullUrl))
            .catch(e => console.log('ERROR:', fullUrl, e.message));
    });
  });
