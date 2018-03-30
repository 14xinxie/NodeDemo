/**
 * 函数对象和普通对象
 */

 /**
  * 凡是通过 new Function() 创建的对象都是函数对象，其他的都是普通对象。
  * f1,f2,归根结底都是通过 new Function()的方式进行创建的。Function Object 也都是通过 New Function()创建的。
  */
var o1 = {}; 
var o2 =new Object();
var o3 = new f1();

function f1(){}; 
var f2 = function(){};
var f3 = new Function('str','console.log(str)');

console.log(typeof Object); //function 
console.log(typeof Function); //function  

console.log(typeof f1); //function 
console.log(typeof f2); //function 
console.log(typeof f3); //function   

console.log(typeof o1); //object 
console.log(typeof o2); //object 
console.log(typeof o3); //object



function Person() {}
Person.prototype.name = 'Zaxlct';
Person.prototype.age  = 28;
Person.prototype.job  = 'Software Engineer';
Person.prototype.sayName = function() {
  alert(this.name);
}

let person1=new Person();

console.log(person1.constructor===Person.prototype.constructor) //true

console.log(Person.prototype === person1.__proto__) //person1是个普通对象

console.log(Person.__proto__ === Function.prototype) //Person是个函数对象

//注意：Person.prototype是个普通对象。