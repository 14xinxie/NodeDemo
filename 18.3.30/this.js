
/**
 * this指向
 */
var o = {
    a:10,
    b:{
        a:12,
        fn:function(){
            console.log(this.a); //undefined
        }
    }
}
var j=o.b.fn;
j();


function fn()  
{  
    this.user = '追梦子';  
    return ;
}
var a = new fn;  
console.log(a.user); //追梦子



var person = {
    name: "test",
    
    
    shout:function(){
      const shout = () => console.log(this.name);
      return shout;
    }
  }
  person.shout();


  function foo() {
    setTimeout( () => {
      console.log("id:", this.id);
    },100);
  }
  
  var id = 21; // 箭头函数运行时所在的环境
  
  foo.call( { id: 42 } ); // 箭头函数定义时所在的环境