
/**
 * 解构赋值
 */
var [x,y,z]=[1,2,3]
console.log(x,y,z)

var person = {
    name: '小明',
    age: 20,
    gender: 'male',
    passport: 'G-12345678',
    school: 'No.4 middle school',
    address: {
        city: 'Beijing',
        street: 'No.1 Road',
        zipcode: '100001'
    }
};
var {name, passport:id} = person;


console.log(name,id)