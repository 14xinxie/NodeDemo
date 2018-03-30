/**
 * 类的继承
 */
class Car{

    constructor(number,v){
        this.number=number;
        this.v=v
    }

    run(time){
        console.log(time*this.v);
    }
}


class Bus extends Car{
    
    work(){

        console.log("汽车正在运动中")
    }
}


class Cycle extends Car{

    work(){
        console.log("单车正在运动中")
    }
}


b=new Bus(2,1);
b.run(5)
b.work()