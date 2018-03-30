
/**
 * 数组元素的遍历、增加、删除、连接等操作
 */
var a = ['A', 'B', 'C'];

//数组遍历

for (var i in a) {

    console.log(typeof(i))
    console.log(i); // '0', '1', '2'
    console.log(a[i]); // 'A', 'B', 'C'
}



//数组元素的增加和删除操作
var arr=[1,2,3]
arr.push('A','B')

console.log(arr)
arr.pop()
console.log(arr)
arr.pop();
arr.pop();
arr.pop();
arr.pop();
var b=arr.pop();
console.log(arr,b)

arr.unshift('A',"E")
console.log(arr)
arr.shift()
console.log(arr)


//数组之间的连接
console.log(arr.concat(['C','D']))
