let MovingObject = require('./moving_object');
let Util = require('./util.js');

let Bullet = function (pos, vel, game) {
  MovingObject.call(this, {pos: pos, vel: vel, radius: Bullet.RADIUS, color: Bullet.COLOR, game: game});
  // this.normalizeVel();
};
Util.inherits(Bullet, MovingObject);

Bullet.RADIUS = 2;
Bullet.COLOR = 'black';

Bullet.prototype.move = function () {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  if (this.pos !== this.game.wrap(this.pos)) { remove(this); }
};

// Bullet.prototype.normalizeVel = function () {
//   this.vel = [this.vel[0] * 2, this.vel[1] * 2];
// };



module.exports = Bullet;
