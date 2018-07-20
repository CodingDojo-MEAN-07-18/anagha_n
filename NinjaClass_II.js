var Ninja= function Ninja(name){
    this.name = name;
    this.health = 100;
    var speed = 3;
    var strength = 3;

    this.showStats= function(){
        console.log("Name: "+this.name+ ", Health: "+this.health+", Speed: "+speed+", Strength: "+strength);
        return this;
    }
    this.kick = function(ninja){
        ninja.health -= 15;
        console.log(ninja.name+ " was kicked by "+this.name+ " which decreased his health by 15 points")
    }
}
Ninja.prototype.sayName = function(){
    console.log("My name is "+this.name);
    return this;
}
Ninja.prototype.drinkSake = function(){
    this.health += 10;
    console.log("My Health: "+this.health);
    return this;
}
Ninja.prototype.punch = function(){
    this.health -= 5;
    console.log("My health after punch: "+this.health);
    return this;
}

var ninja1= new Ninja("Hyabusa")
ninja1.sayName();
//ninja1.drinkSake();
var ninja2= new Ninja("Katomi")
ninja2.sayName();

ninja1.punch(ninja2);
ninja1.kick(ninja2);

ninja1.showStats();
ninja2.showStats();