// // // 引入 events 模块
// // var events = require('events');
// // // 创建 eventEmitter 对象
// // var eventEmitter = new events.EventEmitter();

// // // 创建事件处理程序
// // var connectHandler = function connected() {
// //    console.log('连接成功。');
  
// //    // 触发 data_received 事件 
// //    eventEmitter.emit('data_received');
// // }

// // // 绑定 connection 事件处理程序
// // eventEmitter.on('connection', connectHandler);
 
// // // 使用匿名函数绑定 data_received 事件
// // eventEmitter.on('data_received', function(){
// //    console.log('数据接收成功。');
// // });

// // // 触发 connection 事件 
// // eventEmitter.emit('connection');

// // console.log("程序执行完毕。");
// // var events = require('events');
// // var eventEmitter = new events.EventEmitter();

// // // 监听器 #1
// // var listener1 = function listener1() {
// //    console.log('监听器 listener1 执行。');
// // }

// // // 监听器 #2
// // var listener2 = function listener2() {
// //   console.log('监听器 listener2 执行。');
// // }

// // // 绑定 connection 事件，处理函数为 listener1 
// // eventEmitter.addListener('connection', listener1);

// // // 绑定 connection 事件，处理函数为 listener2
// // eventEmitter.on('connection', listener2);

// // var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
// // console.log(eventListeners + " 个监听器监听连接事件。");

// // // 处理 connection 事件 
// // eventEmitter.emit('connection');

// // // 移除监绑定的 listener1 函数
// // eventEmitter.removeListener('connection', listener1);
// // console.log("listener1 不再受监听。");

// // // 触发连接事件
// // eventEmitter.emit('connection');

// // eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
// // console.log(eventListeners + " 个监听器监听连接事件。");

// // console.log("程序执行完毕。");
// // buf = Buffer.alloc(256);
// // len = buf.write("www.baidu.com");

// // console.log("写入字节数 : "+  len);
// // const buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
// // const json = JSON.stringify(buf);

// // // 输出: {"type":"Buffer","data":[1,2,3,4,5]}
// // console.log(json);

// // const copy = JSON.parse(json, (key, value) => {
// //   return value && value.type === 'Buffer' ?
// //     Buffer.from(value.data) :
// //     value;
// // });

// // // 输出: <Buffer 01 02 03 04 05>
// // console.log(copy);

// // let n = 10000;
// // let count = (new Array(10)).fill(0);
 
// // for (let i = 0; i < n; i ++) {
// //     let arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
// //     arr.sort(() => Math.random() - 0.5);
// //     count[arr.indexOf('a')]++;
// // }
 
// // console.log(count);

// function randomSort(a){
//     var arr = a,
//         random = [],
//         len = arr.length;
//     for (var i = 0; i < len; i++) {
//       var index = Math.floor(Math.random()*(len - i));
//       random.push(a[index]);
//       arr.splice(index,1);
//     }
//     return random;
//   }

//   var a = [1,2,3,4,5,6,7,8,9,10];
//   console.log(randomSort(a));


//   /**
//  * 二分查找，递归实现。
//  * @param target
//  * @param arr
//  * @param start
//  * @param end
//  * @returns {*}
//  */
// function binarySearch(target,arr,start,end) {
//     var start   = start || 0;
//     var end     = end || arr.length-1;

//     var mid = parseInt(start+(end-start)/2);
//     if(target==arr[mid]){
//         return mid;
//     }else if(target>arr[mid]){
//         return binarySearch(target,arr,mid+1,end);
//     }else{
//         return binarySearch(target,arr,start,mid-1);
//     }
//     return -1;
// }



// console.log(['1','2','3'].map(parseInt));




// function f() {
//     if (arguments.length <= 1) {
//       // 参数长度为1
//       var val = arguments[0];
//       // 闭包，存储val值
//       var fn = function(x) {
//         return f(val + x);
//       };
//       fn.valueOf = function() {
//         return val;
//       };
//       return fn;
//     } else {
//       // 多个参数，直接arguments求和
//       var sum = 0;
//       // 转成数组调用Array方法.forEach();
//       Array.from(arguments).forEach(function (item, index) {
//         sum += item;
//       });
//       return sum;
//     }
//   }

//   new Promise(function(res, rej) {
//     console.log(Date.now() + " start setTimeout 1");
//     setTimeout(res, 2000);
// }).then(function() {
//     console.log(Date.now() + " timeout 1 call back");
//     return new Promise(function(res, rej) {
//         console.log(Date.now() + " start setTimeout 2");
//         setTimeout(res, 3000);
//     });
// }).then(function() {
//     console.log(Date.now() + " timeout 2 call back");
// });


// let obj = {a:{b:2,c:{d:1}}};

// let objCopy = Object.assign({}, obj);

// console.log(obj===objCopy)
// console.log(objCopy);
// obj.a=89
// console.log(obj)
// console.log(objCopy)


// //变量提升

// var tmp = new Date();
// function f() {
//     console.log(tmp);
//     if (false) {
//         var tmp = "hello world";
//   }
// }
// f();        //console.log(tmp)；为undefined
// //实质

// var tmp;      //全局作用域的变量提升
// tmp = new Date();
// function f() {
//     var tmp;      //函数作用域的变量提升
//     console.log(tmp);
//     if ( false ) {
//         tmp = "hello world";
//     }
// }
// f();



// var a = ['A', 'B', 'C'];
// a.length;
// for (var i in a) {

//     console.log(typeof(i))
//     console.log(i); // '0', '1', '2'
//     console.log(a[i]); // 'A', 'B', 'C'
// }

// const foo={}
// foo.prop=123
// console.log(foo.prop)


// var arr=[1,2,3]
// arr.push('A','B')

// console.log(arr)
// arr.pop()
// console.log(arr)
// arr.pop();
// arr.pop();
// arr.pop();
// arr.pop();
// var b=arr.pop();
// console.log(arr,b)

// arr.unshift('A',"E")
// console.log(arr)
// arr.shift()
// console.log(arr)

// console.log(arr.concat(['C','D']))

// 'use strict';

// function area_of_circle(r, pi) {

//     var s=0;

//      console.log(r)
//       if(arguments.length>1){
//           s=pi*r*r;
         
//       } else{
//           s=3.14*r*r;
//     }  

   
// return s;

// }
// // 测试:
// if (area_of_circle(2) === 12.56 && area_of_circle(2, 3.1416) === 12.5664) {
//     console.log('测试通过');
// } else {
//     console.log('测试失败');
// }


// var foo=function(){

//     for(var i=0;i<3;i++){


//     }
//     console.log(i)

// }

// foo()


// var fuu=function(){

//     for(let j=0;j<3;j++){


//     }
//     console.log(j)
// }

// // fuu()


// var PI=3.14
// PI=1

// console.log(PI)




// var xiaoming = {
//     name: '小明',
//     birth: 1990,
//     // age: function () {
//     //     var that = this; // 在方法内部一开始就捕获this
//     //     function getAgeFromBirth() {
//     //         var y = new Date().getFullYear();
//     //         return y - that.birth; // 用that而不是this
//     //     }
//     //     return getAgeFromBirth();
//     // }
//     age:getAge
// };


// function getAge(){
//     var y = new Date().getFullYear();
//     return y - this.birth; // 用that而不是this

// }

// //xiaoming.age()

// console.log(xiaoming.age()); // 25

// console.log(getAge.apply(xiaoming,[]));



// var a=new Array(2,3,4,5,6);
// var sum=0;
// for (var i=0;i<a.length;i++){
//     sum+=a[i];
// }

// console.log(sum)

// var num;
// num=5+true

// console.log(num)

// let x,{x:y=1}={x};
// //y;
// console.log(x,y)

// var b=[1<2<3,3<2<1]
// console.log(b)


// Object.assign([1,2,3],[4,5]);

// var foo='bar';
// //var baz={[foo]}
// console.log([1,2,3].map(n=>({number:n})));

// const c={};
// c.n=1

// console.log(c)

// let a=1,b;
// //let a=0;
// [a,b]=[b,a];
// console.log(a,b)

// console.log(["1","2","3"].map(parseInt))

// function f(y) {
    
//     var x=y*y;
//     return x;
// }

// for (var x=0;x<5;x++){

//     var y=f(x);
//     console.log(y)
// }

// console.log(0.1+0.2>0.3)




// var num=(function (x,f=()=>x) {
//     var x;
//     var y=x;
//     x=2;
//     return [x,y,f()];
//   })(1)

//   console.log(num)


// //箭头函数没有自己的this，所以bind方法无效，内部的this指向外部的this。
// var res=(function(){
//     return [
//         (()=>this.x).bind({x:'inner'})(),
//         (()=>this.x)()
//     ]
// }).call({x:'outer'});

// console.log(res);


// var number=2;
// var obj={
//     number:4,
//     fn1:(function(){
        
//         //console.log("hhh:"+this.number)
//         this.number*=2;
        
//         number=number*2;
//         //console.log(number);
//         var number=3;
//         return function(){
//             this.number*=2;
//             number*=3;
//             console.log(number);
//         }
//     })(),
//     db2:function(){this.number*=2}
// };

// var fn1=obj.fn1;
// console.log(number);
// //console.log(obj.db2())
// fn1();
// obj.fn1()
// console.log(global.number)
// console.log(obj.number)


// let value1=0;
// let value2=0;
// let value3=0;
// for(let i=1;i<=3;i++){


//     let i2=i;
//     console.log('i2==>',i2);
//     (function () {
//         let i3=i;
//         console.log('i3==>',i3);
//         setTimeout(function(){

//             console.log('ti==>',i);
//             console.log('ti2==>',i2);
//             console.log('ti3==>',i3);
//             value1+=i;
//             value2+=i2;
//             value3+=i3;

//             console.log('value1==>',value1);
//             console.log('value2==>',value2);
//             console.log('value3==>',value3);
//         },1);
//       })()
// }

// setTimeout(function () {
//     console.log(value1,value2,value3);
//   },1000);


// function a(){
//     var i=0;
//     function b(){
//         console.log(++i); 
//     }
//     return b;
// }
// var c=a();
// c();

// process.nextTick(function foo() {
//     process.nextTick(foo);
//   });


// for (var i = 0; i < 3; i++) {
//     setTimeout(function () {
//       console.log(i) }, 1000);
//  }

//  console.log(".......")

//  for (let i = 0; i < 3; i++) {
//     (function () {
//         setTimeout(function () {
//             console.log(i) }, 1000);
//        }
//       )()
//     }

    // let fileA=require('./a.js');
    // console.log(fileA.name);
    // console.log(fileA.age);

   



    // var a = {n:1}; /*定义a，赋值为{n:1}，假设指向存储地址为add_1*/
    // var b = a; /*定义b，赋值为a，指向同一存储地址add_1*/  
    // a.x = a = {n:2};
    /*（1）：定义a.x，赋值为a，即{n:1}，存储地址add_1上面的内容被更改
    （2）：a.x重新赋值为{n:2}，存储地址add_1上面的内容被更改
    （3）：a重新赋值为{n:2}，更改存储地址add_2*/
    //window.alert(a.x);
    /*现在a的存储地址add_2，内容为{n:2}，上面并不存在a.x属性，所以为undefined*/ 
    //window.alert(b.x);
    /*现在b的存储地址add_1，内容为{n:1,x:{n:2}}，所以b.x为{n:2}*/ 
    // var a={n:1};
    // var b=a;
    // a.x=a={n:2};
    // console.log(a.x);
    // console.log(b.x);
    // for(var i=0;i<5;i++){
      
    //         setTimeout(function () {
    //             console.log(i);
    //         },i*1000);
     
    // }


    // var k=0;
    // for (let i=0,j=0;i<10,j<6;i++,j++){

    //     k=i+j;
    // }

    // console.log(k)

    // var foo=1;
    // // function bar(){
    // //     console.log(foo);
    // //     //var foo=2;
    // //     //console.log(foo)
    // // }

    // // bar()

    // var x,y;
    // x=10;
    // y=x++;

    // console.log(y)


    // var a=0;
    // test();

    // function test() {

    //     var a=6;
    //     b();
    //   }
    // function b(){

    //     console.log(a);
    //     var a=2;
    // }


    // let str='58px';
    // let str1=str.slice(-2);
    // console.log(str1);
    

    

    var myArray = {
        0: '你',
        1: '的',
        2: '名字',
        length: 5
      };
      
      myArray[Symbol.iterator] = function * (){
        for(var i = 0; i < this.length; i++) {
          yield this[i];
        }
      };
      
      for(var item of myArray) {
        console.log(item);
      }
      //你
      //的
  

    