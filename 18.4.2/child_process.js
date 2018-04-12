// const { spawn } = require('child_process');
// const ls = spawn('ls', ['-lh', '/usr']);

// ls.stdout.on('data', (data) => {
//   console.log(`输出：${data}`);
// });

// ls.stderr.on('data', (data) => {
//   console.log(`错误：${data}`);
// });

// ls.on('close', (code) => {
//   console.log(`子进程退出码：${code}`);
// });



//var exec = require('child_process').exec;

// // 成功的例子

// //用于开启子进程执行shell命令
// exec('node mysql.js',{cwd:"./18.4.2"}, function(error, stdout, stderr){
//     if(error) {
//         console.error('error: ' + error);
//         return;
//     }
//     console.log('stdout: ' + stdout);
//     console.log('stderr: ' + typeof stderr);
// });


// const util = require('util');
// const execFile = util.promisify(require('child_process').execFile);
// async function getVersion() {
//   const { stdout } = await execFile('node', ['--version']);
//   console.log(stdout);
// }
// getVersion();


// const fs = require('fs');
//const { spawn } = require('child_process');
// const out = fs.openSync('./out.log', 'a');
// const err = fs.openSync('./out.log', 'a');

// const subprocess = spawn('prg', [], {
//   detached: true,
//   stdio: [ 'ignore', out, err ]
// });

// subprocess.unref();
const {spawn}  = require('child_process');
const grep = spawn('grep', ['ssh']);

grep.on('close', (code, signal) => {
  console.log(`子进程收到信号 ${signal} 而终止`);
});

// 发送 SIGHUP 到进程
grep.kill('SIGHUP');




