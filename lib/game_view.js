let Game = require('./game.js');

let GameView = function(ctx) {
  this.game = new Game();
  this.ctx = ctx;
};

GameView.prototype.start = function () {
  this.bindKeyHandlers();

  const animateCallBack = function () {
    this.game.step();
    this.game.draw(this.ctx);
    requestAnimationFrame(animateCallBack);
  }.bind(this);

  animateCallBack();
};

GameView.prototype.bindKeyHandlers = function () {
  key('w', function(){ this.game.ship.power([0,-1]); }.bind(this));
  key('a', function(){ this.game.ship.power([-1,0]); }.bind(this));
  key('d', function(){ this.game.ship.power([1,0]); }.bind(this));
  key('s', function(){ this.game.ship.power([0,1]); }.bind(this));
  key('x', function(){ this.game.ship.fireBullet(); }.bind(this));
  key('space', function(){ this.game.ship.fireBullet(); }.bind(this));

  // key('space', () => { this.game.ship.fireBullet(); });

};


module.exports = GameView;
