/**
 * 原型继承
 */



//定义一个 Animal 构造函数，作为 Dog 的父类
function Animal () {
    this.superType = 'Animal';
}

Animal.prototype.superSpeak = function () {
    console.log(this.superType);
}

function Dog (name) {
    this.name = name;
    this.type = 'Dog';  
}
//改变Dog的prototype指针，指向一个 Animal 实例
Dog.prototype = new Animal();
//上面那行就相当于这么写
//var animal = new Animal();
//Dog.prototype = animal;

Dog.prototype.speak = function () {
　　console.log(this.type);
}
var doggie = new Dog('jiwawa');
var doggie = new Dog("jjj");
doggie.superSpeak();  //Animal



//Student构造函数
function Student(name){

    this.name=name;
    this.hello=function(){

        console.log("Hello",this.name);

    }
}

xiaoming= new Student("小明");
console.log(Student.prototype,Animal.prototype);


console.log(xiaoming.__proto__);




