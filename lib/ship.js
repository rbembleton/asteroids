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

  let bulletizeVel = function (oldVel) {

    if (oldVel[0] === 0 && oldVel[1] === 0) { return Util.randomVec(2 * Math.sqrt(2)); }
    let bulletVel = [];
    let cTemp = Math.sqrt(Math.pow(oldVel[0],2) + Math.pow(oldVel[1],2));
    let mod = ((cTemp + 2) / cTemp);

    oldVel.forEach (function(el) {
      let speedy = el * mod;
      bulletVel.push(speedy);

    });

    return bulletVel;
  };

  let thisBullet = new Bullet(this.pos.slice(), bulletizeVel(this.vel), this.game);
  this.game.bullets.push(thisBullet);

};



module.exports = Ship;
