let Asteroid = require('./asteroid.js');
let Ship = require('./ship.js');

let Game = function() {
  this.asteroids = [];
  this.addAsteroids();
  this.ship = new Ship(this);

};
Game.DIM_X = 500;
Game.DIM_Y = 500;
Game.NUM_ASTEROIDS = 20;

Game.prototype.addAsteroids = function() {
  for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
    let pos = this.randomPosition();
    // debugger
    let newAst = new Asteroid(pos, this);
    this.asteroids.push(newAst);
  }

};

Game.prototype.randomPosition = function() {
  let randX = Math.random() * Game.DIM_X;
  let randY = Math.random() * Game.DIM_Y;
  return [randX, randY];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.allObjects().forEach(function (object) {
    object.draw(ctx);
  });
};

Game.prototype.moveObjects = function() {
  this.allObjects().forEach(function (object) {
    object.move();
  });
};

Game.prototype.wrap = function (pos) {
  if (pos[0] <= 0) { pos[0] += Game.DIM_X; }
  if (pos[0] >= Game.DIM_X) { pos[0] -= Game.DIM_X; }
  if (pos[1] <= 0) { pos[1] += Game.DIM_Y; }
  if (pos[1] >= Game.DIM_Y) { pos[1] -= Game.DIM_Y; }
  return pos;
};

Game.prototype.checkCollisions = function () {
  // let theseObjs = this.allObjects();
  // console.log(theseObjs);
    for (var i = 0; i < this.asteroids.length - 1; i++) {
      for (var j = i + 1; j < this.asteroids.length; j++) {
        if (this.asteroids[i].isCollidedWith(this.asteroids[j])) {
          // this.asteroids.splice(j, 1);
          // this.asteroids.splice(i, 1);
          this.remove(this.asteroids[j]);
          this.remove(this.asteroids[i]);
          j = i;
          // alert("Collison");
        }
      }
    }
};

Game.prototype.remove = function (asteroid) {
  let astIdx = this.asteroids.indexOf(asteroid);
  this.asteroids.splice(astIdx, 1);
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();

};

Game.prototype.allObjects = function () {
  debugger
  return this.asteroids.concat(this.ship);
};

module.exports = Game;
