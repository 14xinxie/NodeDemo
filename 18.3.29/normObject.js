/**
 * 标准对象
 */


//Date对象
var now=new Date();
console.log(now.getMonth()); //注意:JS中月份是从0开始计算的，即0代表1月份，1代表2月份
console.log(now.getMilliseconds());
console.log(now.getDate());


var d=new Date(1435146562875);

console.log(d.toUTCString())
console.log(d.toLocaleString());

console.log(Date.now().toLocaleString());

//RegExp对象
var re = /^\d{3}\-\d{3,8}$/;
console.log(re.test('010-12345')); // true
console.log(re.test('010-1234x')); // false
console.log(re.test('010 12345')); // false

var s='a,   b,   ,    c'.split(/[\s\,]+/); // ['a', 'b', 'c']
console.log(s);


var re = /^(\d+?)(0*)$/;
console.log(re.exec('102300')); // ['102300', '102300', '']

var s = 'JavaScript, VBScript, JScript and ECMAScript';
var re=/[a-zA-Z]+Script/g;

var re=/^[a-zA-Z]+Script$/g;//表示匹配以字母开头，以“Script”结尾的字符串

// 使用全局匹配:

console.log(re.exec(s),re.lastIndex);// ['JavaScript'],10

console.log(re.exec(s),re.lastIndex);// ['VBScript'],20

console.log(re.exec(s),re.lastIndex); // ['JScript'],29

console.log(re.exec(s),re.lastIndex); // ['ECMAScript'],44

console.log(re.exec(s),re.lastIndex); // null，直到结束仍没有匹配到
//re.exec(s); 


//邮箱验证的正则表达式
var emal=/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+\.){1,63}[a-z0-9]+$/;
console.log(emal.test("1429285206@qq.com"));