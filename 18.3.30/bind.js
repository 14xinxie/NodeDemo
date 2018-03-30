
/**
 * 简化console.log()函数
 */


//bind方法允许手动传入一个this，作为当前方法的上下文，然后返回持有上下文的方法
 var log = console.log.bind(console); //即返回一个以console为当前上下文的一个方法   

 //log("jhh");
global.log=log; //要将这个log赋值给一个全局变量域中的另一个变量，这样才能被其他js文件引用

//log(global.log);

 //但由于bind()方法并不支持ie8以及更低版本的浏览器

//下面自己实现的一个bind()方法

//首先判断Function的原型对象中有没有bind()方法，如果没有则返回自定义的bind()方法。
 //_this指向当前方法，context指向当前方法的上下文。
 Function.prototype.bind = Function.prototype.bind || function(context){

    var _this=this;
    return function(){
        _this.apply(context.arguments);
    }
 }