let Game = require('./game.js');

let GameView = function(ctx) {
  this.game = new Game();
  this.ctx = ctx;
};

GameView.prototype.start = function () {

  const animateCallBack = function () {
    this.game.step();
    this.game.draw(this.ctx);
    requestAnimationFrame(animateCallBack);
  }.bind(this);

  animateCallBack();
};


module.exports = GameView;
