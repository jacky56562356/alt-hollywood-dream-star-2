const { spawn } = require('child_process');
const start = spawn('node', ['dist/server.js'], { env: { ...process.env, NODE_ENV: 'production', PORT: '3000' } });
start.stdout.on('data', d => console.log('OUT:', d.toString()));
start.stderr.on('data', d => console.log('ERR:', d.toString()));
start.on('close', code => console.log('Exit:', code));
setTimeout(() => { start.kill(); console.log("Done"); }, 3000);
