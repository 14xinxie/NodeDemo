var exp = require('./exports');

var a = exp.add(2,1);

console.log(a);

console.log(exp.name)

var baz = {'foo':2};
console.log(baz);


setTimeout(function (){
    console.log(4);
},0);

new Promise(function(resolve){
    console.log(1);
    for(var i=0;i<10000;i++){
        i==9999 && resolve();
    }

    console.log(2);

}).then(function(){
    console.log(5);

});

console.log(3);