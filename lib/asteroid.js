let MovingObject = require('./moving_object');
let Util = require('./util.js');

let Asteroid = function(pos, game) {
  MovingObject.call(this, {pos: pos, vel: Util.randomVec(1), radius: Asteroid.RADIUS, color: Asteroid.COLOR, game: game});
};
Util.inherits(Asteroid, MovingObject);

Asteroid.COLOR = 'orange';
Asteroid.RADIUS = 20;

// window.Asteroid = Asteroid;
module.exports = Asteroid;
