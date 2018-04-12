const child_process = require('child_process');

const fs = require('fs');



/**
 * 使用excFile()方法创建子进程
 */

// const p = child_process.execFile(
//     'node', //可执行文件
//     ['child.js','a','b'],　//传递给命令的参数
//     {cwd:"./18.4.2"},   //指定命令执行的目录
//     (err,stdout,stderr)=>{
//     if(err){
//         console.log('err:',err.code,err.signal);

//     }
//     console.log('stdout:',stdout);
//     console.log('stderr:',stderr);

// });
// console.log('child pid:',p.pid);

/**
 * 利用进程stdio流的管道特性
 * 作用等价于 find . -type f | wc -l ，递归统计当前目录文件数量
 */
// const { spawn } = require('child_process');
// const find = spawn('find', ['.', '-type', 'f']);

// //console.log(find.stdout);
// const wc = spawn('wc', ['-l']);
// find.stdout.pipe(wc.stdin);
// wc.stdout.on('data', (data) => {
//   console.log(`Number of files ${data}`);
// });



/**
 * 使用exec()方法创建子进程
 */
// const p = child_process.exec(
//     'node child.js a b', //执行的命令
//     {cwd:'./18.4.2'},   //指定命令执行的目录
//     (err,stdout,stderr)=>{
//     if(err){
//         console.log('err:',err.code,err.signal);

//     }
//     console.log('stdout:',stdout);
//     console.log('stderr:',stderr);

// });

// console.log('child pid:',p.pid);




const p = child_process.spawn('node',['child.js'],{});

console.log('child pid:',p.pid);

p.on('exit',code=>{
    console.log('exit:',code);

});

//父进程的输入直接pipe给子进程（子进程可以通过process.stdin拿到）
process.stdin.pipe(p.stdin);

//子进程的输出pipe给父进程的输出
//p.stdout.pipe(process.stdout);

//或者通过监听 data 事件来获取结果
var all = '';
p.stdout.on('data', data => {
    all += data; 
});
p.stdout.on('close', code => {
    console.log('close:', code);
    console.log('data:', all);
});


// 子进程的错误输出 pipe 给父进程的错误输出
p.stderr.pipe(process.stderr);

// const p = child_process.spawn(
//     'node', ['child.js', 'a', 'b'],
//     {
//     　'cwd':'./18.4.2',
//       // 'stdio': ['inherit', 'inherit', 'inherit']
//       'stdio': 'inherit'
//     }
//   );
//   console.log('child pid:', p.pid);
  
//   p.on('exit', code => {
//     console.log('exit:', code);
//   });


// const out = fs.openSync('./out.log', 'a');
// const err = fs.openSync('./err.log', 'a');

// // parent.js
// const p = child_process.spawn(
//   'node', ['child.js', 'a', 'b'],
//   {
//     'cwd':'./18.4.2',
//     'stdio': ['ignore', out, err], // 父子进程间不建立通道
//     'detached': true   // 让子进程能在父进程退出后继续运行
//   }
// );
// // 默认情况，父进程会等子进程，这个方法可以让子进程完全独立运行
// p.unref();

// console.log('child pid:', p.pid);

// p.on('exit', code => {
//   console.log('exit:', code);
// });

// p.kill();