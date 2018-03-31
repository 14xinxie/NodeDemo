

//引入文件模块
var fs = require('fs');


var filename = 'hello.txt';
var fsdir = __dirname+'/'+filename;

fs.readFile(fsdir,'utf-8',function(err,data){

    //如果文件读取有误，抛出错误
    if(err){
        console.log(err);

      
        throw err;
    } 
      
    console.log(data);

});


//输出当前
console.log(__dirname);

//输出系统查找模块的路径数组
console.log(module.paths);


//输出系统已有的扩展加载方式
console.log(require.extensions)