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


myFunction();