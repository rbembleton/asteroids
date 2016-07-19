let MovingObject = require('./moving_object');
let Util = require('./util.js');
let Bullet = require('./bullet.js');

let Ship = function(game) {
  MovingObject.call(this, {pos: game.randomPosition(), vel: [0,0], radius: Ship.RADIUS, color: Ship.COLOR, game: game});
};
Util.inherits(Ship, MovingObject);

Ship.RADIUS = 36;
Ship.COLOR = 'lightblue';

Ship.prototype.relocate = function () {
  this.pos = this.game.randomPosition();
  this.vel = [0,0];
};

Ship.prototype.power = function (impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];

};

Ship.prototype.fireBullet = function () {
  debugger
  let bulletizeVel = function (oldVel) {
    let bulletVel = [];
    oldVel.forEach (function(el) {
      let speedy = el + el;
      bulletVel.push(speedy);
    });
    return bulletVel;
  };

  let thisBullet = new Bullet(this.pos.slice(), bulletizeVel(this.vel), this.game);
  this.game.bullets.push(thisBullet);

};



module.exports = Ship;
