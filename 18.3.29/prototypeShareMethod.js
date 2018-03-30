
/**
 * 使用prototype来实现Person类的
 */
function Person(name) {
    this.name = name;
    this.hello=function(){
        console.log('Hello, ' + this.name + '!');
    }
}

// Person.prototype.hello = function () {
//     console.log('Hello, ' + this.name + '!');
// };


var ming = new Person("明明");

var hong = new Person("红红");
console.log(ming.name); // '明明'

console.log(hong.name); //‘红红’

ming.hello(); // function: Student.hello()
hong.hello(); // function: Student.hello()

console.log(ming.hello === hong.hello); // false