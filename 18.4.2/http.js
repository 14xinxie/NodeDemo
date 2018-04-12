
"use strict";

//导入http模块
let http = require("http");

//创建http server，并传入回调函数
let server = http.createServer(function(request,response){
    //回调函数接受request和response对象
    //获得HTTP请求的method和url
    console.log(request.method+":"+request.url);

    response.writeHead(200,{"ContentType":"text/html"});

    //将HTTP响应的html内容写入response
    response.write("hhhh");

    response.end('<h1>Hello world!</h1>');

});

//让服务端监听8080端口
server.listen(8080);

console.log("Server is running at http://127.0.0.1:8080/");
