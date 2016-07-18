Function.prototype.inherits = function (superClass) {

  let Surrogate = function () {};
  Surrogate.prototype = superClass.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;

};

function MovingObject () {}

function Ship () {}
Ship.inherits(MovingObject);

function Asteroid () {}
Asteroid.inherits(MovingObject);

Ship.prototype.fly = function () {
  console.log(`I'm flying`);

};

let mayflower = new Ship();
