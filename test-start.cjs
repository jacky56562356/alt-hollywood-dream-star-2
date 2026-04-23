const { spawn } = require('child_process');
const start = spawn('npx', ['node', '--experimental-strip-types', 'server.ts']);
start.stdout.on('data', d => console.log('OUT:', d.toString()));
start.stderr.on('data', d => console.log('ERR:', d.toString()));
setTimeout(() => { start.kill(); console.log("Done"); }, 3000);
