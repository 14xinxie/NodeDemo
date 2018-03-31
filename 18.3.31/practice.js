
/**
 * 计算一个整数的阶乘
 */

function factorial(num){
    if(num > 0 ){
        return (num * factorial(num -1));
    }
    else{
        return 1;
    }
}

console.log(factorial(4));

/**
 * 函数打印数组元素对应下标
 */

let a =[];

for(let i=0;i<10;i++){
    a.push(function(){
        console.log(i);
    });
}


a[1]();

 /**
  * 将file1.txt的内容追加写入file2.txt
  */
function writeContent(file1Path,file2Path,name){
    var fs=require('fs');
    console.log(file1Path,file2Path);
    fs.readFile(file1Path,"utf-8",function(err,data){
        if(err){
            console.log("读取file1文件的内容出错！");
            throw err;
        }else{
            console.log("file1文件的内容为："+data);
            fs.appendFile(file2Path,"\n"+data+"\n"+name,function(err){
                if(err){
                    console.log("向文件2写入内容出错！");
                }else{
                    console.log("向文件2写入内容成功！");
                }
            });
        }
    });
}

writeContent(__dirname+"/file1.txt",__dirname+"/file2.txt",'谢鑫');
 
/**
 * 解析url查询参数的中间件
 */
function parseUrl(str){
    var queryString = require('querystring');
    var obj = queryString.parse(str);
    console.log(JSON.stringify(obj,2));
}


parseUrl('nick=casper&age=24');
    

/**
 * 使用Promise实现红绿灯功能
 */
function redLight(){
    return new Promise(function(resolve,reject){
        setTimeout(resolve,3000,"红灯");
    });
}

function greenLight(){
    return new Promise(function(resolve,reject){
        setTimeout(resolve,2000,"绿灯");
    });
}

function yellowLight(){
    return new Promise(function(resolve,reject){
        setTimeout(resolve,1000,"黄灯");
    });
}

(function restart(){
   

    greenLight().then((value)=>{
        console.log(value);
    });

    yellowLight().then((value)=>{
        console.log(value);
        restart();
    });

    redLight().then((value)=>{
        console.log(value);
    });
    
    

    
})();