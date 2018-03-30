
/**
 * 面向对象编程
 */
 'use strict';
 //原型对象

var Student = {
    name: 'Robot',
    height: 1.2,
    run: function () {
        console.log(this.name + ' is running...');
    }
};

var xiaoming = {
    name: '小明'
};

xiaoming.__proto__ = Student;

console.log(xiaoming.name);
xiaoming.run();



//原型继承

function createStudent(name){

    //基于Student原型创建一个对象
    var s=Object.create(Student);
    //初始化新对象
    s.name = name;
    return s;

}

var xiaowang = createStudent("小王");
xiaowang.run();

console.log(xiaowang.__proto__ === Student);



