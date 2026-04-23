import fs from 'fs';
import path from 'path';

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('<img') && !content.includes('referrerPolicy="no-referrer"')) {
        content = content.replace(/<img/g, '<img referrerPolicy="no-referrer"');
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      } else if (content.includes('<img') && content.includes('referrerPolicy="no-referrer"')) {
        // Some might be partially updated
        content = content.replace(/<img(?!\s+referrerPolicy)/g, '<img referrerPolicy="no-referrer"');
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

processDirectory('./components');
processDirectory('./pages');
if (fs.existsSync('./App.tsx')) {
    let content = fs.readFileSync('./App.tsx', 'utf8');
    content = content.replace(/<img(?!\s+referrerPolicy)/g, '<img referrerPolicy="no-referrer"');
    fs.writeFileSync('./App.tsx', content);
}
