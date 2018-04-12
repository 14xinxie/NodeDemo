'use strict'
let url =  require('url');
let fs = require('fs');
let http = require('http');
let path = require('path');
console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'));

//解析当前目录
let workDir = path.resolve('');

//console.log(filePath);

//创建服务器
let server = http.createServer(function(request,response){

    //获得URL的path
    let pathName = url.parse(request.url).pathname;

    console.log(url.parse(request.url));
    console.log("请求的文件路径："+pathName);

    //获得对应的本地文件路径
    let filePath = path.join(workDir,pathName);

    fs.stat(filePath,function(err,stats){
        if(!err && stats.isFile()){
            //没有出错且文件存在
            console.log('200'+request.url);

            //发送200响应
            response.writeHead(200);

            //将文件流导向response
            fs.createReadStream(filePath).pipe(response);
        }else{
            //出错了或者文件不存在

            console.log('404'+request.url);
            //发送404响应
            response.writeHead(404);

            response.end('404 Not Found');
        }
    });
});


server.listen(8080);
console.log("Server is running at http://127.0.0.1:8080/");