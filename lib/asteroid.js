let MovingObject = require('./moving_object');
let Util = require('./util.js');
let Ship = require('./ship.js');
let Bullet = require('./bullet.js');

let Asteroid = function(pos, game) {
  MovingObject.call(this, {pos: pos, vel: Util.randomVec(1), radius: Asteroid.RADIUS, color: Asteroid.COLOR, game: game});
};
Util.inherits(Asteroid, MovingObject);

Asteroid.COLOR = 'orange';
Asteroid.RADIUS = 20;



Asteroid.prototype.collideWith = function (otherObject) {

    if (otherObject instanceof Ship) {
      otherObject.relocate();
    }

    if (otherObject instanceof Bullet) {
      this.game.remove(otherObject);

      if (this.radius === Asteroid.RADIUS) {
        this.game.blowUpAsteroid(this);
      } else {
        this.game.remove(this);
      }
    }

};



module.exports = Asteroid;
