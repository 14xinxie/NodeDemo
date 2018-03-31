
/**
 * promise的原理
 */
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done');
  });
  }
  
timeout(100).then((value) => {
  console.log(value);
})




function myFunction() {
  myVar = setTimeout(alertFunc, 3000,"zzz");
}

function alertFunc(value) {
  console.log("Hello!",value);
	
}


//myFunction();


function test(resolve, reject) {
  var timeOut = Math.random() * 2;
  console.log('set timeout to: ' + timeOut + ' seconds.');
  setTimeout(function () {
    if (timeOut < 1) {
      console.log('call resolve()...');
      resolve('200 OK');
    }
    else {
      console.log('call reject()...');
      reject('timeout in ' + timeOut + ' seconds.');
    }
  }, timeOut * 1000);
}

// p1 = new Promise(test);

// p2 = p1.then(function(result){

//   console.log("成功："+result);
// });


// p3 = p2.catch(function(reason){
//   console.log("失败："+reason);
// });

  

// 0.5秒后返回input*input的计算结果:
function multiply(input) {
  return new Promise(function (resolve, reject) {
    console.log('calculating ' + input + ' x ' + input + '...');
    setTimeout(resolve, 500, input * input);
  });
}

// 0.5秒后返回input+input的计算结果:
function add(input) {
  return new Promise(function (resolve, reject) {
    console.log('calculating ' + input + ' + ' + input + '...');
    setTimeout(resolve, 500, input + input);
  });
}

var p = new Promise(function (resolve, reject) {
  console.log('start new Promise...');
  resolve(123);
});

// p.then(multiply).catch(function (result){
//   console.log("计算乘法失败！");
// })
// .then(add).catch(function (result){
  
//   console.log("计算加法失败！");
// })
// .then(multiply).catch(function (result){
//   console.log("计算乘法失败！");
// })
// .then(add).catch(function (result){
//   console.log("计算加法失败！");
// })
// .then(function (result) {
//   console.log('Got value: ' + result);
// });



var p1 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 500, 'P1');
});
var p2 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 600, 'P2');
});


// // 同时执行p1和p2，并在它们都完成后执行then:
// Promise.all([p1, p2]).then(function (results) {
//   console.log(results); // 获得一个Array: ['P1', 'P2']
// });

//由于p1执行较快，Promise的then()将获得结果'P1'。p2仍在继续执行，但执行结果将被丢弃。
Promise.race([p1,p2]).then(function (result){
  console.log(result);
})