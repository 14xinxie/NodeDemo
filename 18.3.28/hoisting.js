/**
 * 变量提升
 */
var tmp = new Date();
function f() {
    console.log(tmp);
    if (false) {
        var tmp = "hello world";
  }
}
f();        //console.log(tmp)；为undefined
//实质

var tmp;      //全局作用域的变量提升
tmp = new Date();
function f() {
    var tmp;      //函数作用域的变量提升
    console.log(tmp);
    if ( false ) {
        tmp = "hello world";
    }
}
f();