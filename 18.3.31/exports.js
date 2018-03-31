exports.add = function(){
    var sum = 0,
        i = 0,
        args = arguments,
        l = arguments.length;
    while(i < l){


        sum += args[i++];
    }
    return sum;
};

exports.name = "bars";