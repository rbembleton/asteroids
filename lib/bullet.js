let MovingObject = require('./moving_object');
let Util = require('./util.js');
// let Game = require('./game.js');

let Bullet = function (pos, vel, game) {
  MovingObject.call(this, {pos: pos, vel: vel, radius: Bullet.RADIUS, color: Bullet.COLOR, game: game});
  // this.normalizeVel();
};
Util.inherits(Bullet, MovingObject);

Bullet.RADIUS = 5;
Bullet.COLOR = 'black';

Bullet.prototype.move = function () {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  if (this.isOffScreen(this.pos)) { this.game.remove(this); }
};

Bullet.prototype.isOffScreen = function (pos) {
  if (pos[0] <= 0) { return true; }
  if (pos[0] >= this.game.DIM_X) { return true; }
  if (pos[1] <= 0) { return true; }
  if (pos[1] >= this.game.DIM_Y) { return true; }
  return false;
};

// Bullet.prototype.normalizeVel = function () {
//   this.vel = [this.vel[0] * 2, this.vel[1] * 2];
// };



module.exports = Bullet;
