let Asteroid = require('./lib/asteroid.js');
let Game = require('./lib/game.js');
let GameView = require('./lib/game_view.js');

const canvasEl = document.getElementById("game-canvas");
// canvasEl.height = window.innerHeight;
// canvasEl.width = window.innerWidth;
canvasCtx = canvasEl.getContext("2d");
debugger
gv = new GameView(canvasCtx);
gv.start();
