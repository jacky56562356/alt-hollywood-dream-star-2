const { spawn } = require('child_process');
const start = spawn('npx', ['cross-env', 'NODE_ENV=production', 'npm', 'start']);
start.stdout.on('data', d => console.log('OUT:', d.toString()));
start.stderr.on('data', d => console.log('ERR:', d.toString()));
start.on('close', code => console.log('Exit:', code));
setTimeout(() => { start.kill(); console.log("Done"); }, 3000);
