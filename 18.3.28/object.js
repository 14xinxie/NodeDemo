/**
 * 对象
 */

var a=[1,2,3,4,5,"heell","hhh"]
console.log(a[0]+a[a.length-1])

var person = {
    name: 'Bob',
    age: 20,
    tags: ['js', 'web', 'mobile'],
    city: 'Beijing',
    hasCar: true,
    zipcode: null
};

console.log(person.age)

console.log("toString" in person)

console.log(person)

console.log(person.hasOwnProperty("toString"))