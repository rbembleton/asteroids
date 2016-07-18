let MovingObject = require('./moving_object');
let Util = require('./util.js');

let Ship = function(game) {
  MovingObject.call(this, {pos: game.randomPosition(), vel: [0,0], radius: Ship.RADIUS, color: Ship.COLOR, game: game});
};
Util.inherits(Ship, MovingObject);

Ship.RADIUS = 3;
Ship.COLOR = 'green';

module.exports = Ship;
