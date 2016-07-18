/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	let Asteroid = __webpack_require__(1);
	let Game = __webpack_require__(5);
	let GameView = __webpack_require__(4);

	const canvasEl = document.getElementById("game-canvas");
	// canvasEl.height = window.innerHeight;
	// canvasEl.width = window.innerWidth;
	canvasCtx = canvasEl.getContext("2d");
	debugger
	gv = new GameView(canvasCtx);
	gv.start();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	let MovingObject = __webpack_require__(2);
	let Util = __webpack_require__(3);

	let Asteroid = function(pos, game) {
	  MovingObject.call(this, {pos: pos, vel: Util.randomVec(1), radius: Asteroid.RADIUS, color: Asteroid.COLOR, game: game});
	};
	Util.inherits(Asteroid, MovingObject);

	Asteroid.COLOR = 'orange';
	Asteroid.RADIUS = 20;

	// window.Asteroid = Asteroid;
	module.exports = Asteroid;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	let Util = __webpack_require__(3);

	let MovingObject = function (options) {
	  this.pos = options.pos;
	  this.vel = options.vel;
	  this.radius = options.radius;
	  this.color = options.color;
	  this.game = options.game;
	};

	MovingObject.prototype.draw = function (ctx) {
	  ctx.fillStyle = this.color;
	  ctx.beginPath();

	  ctx.arc(
	    this.pos[0],
	    this.pos[1],
	    this.radius,
	    0,
	    2 * Math.PI,
	    false
	  );

	  ctx.fill();
	};

	MovingObject.prototype.move = function () {
	  this.pos[0] += this.vel[0];
	  this.pos[1] += this.vel[1];
	  this.game.wrap(this.pos);
	};

	MovingObject.prototype.isCollidedWith = function (otherObject) {
	  let collDist = this.radius + otherObject.radius;
	  let currDist = Math.sqrt(Math.pow((this.pos[0] - otherObject.pos[0]),2) + Math.pow((this.pos[1] - otherObject.pos[1]),2));
	  return (collDist >= currDist);
	};





	module.exports = MovingObject;


/***/ },
/* 3 */
/***/ function(module, exports) {

	const Util = {
	  inherits (childClass, parentClass) {
	   let Surrogate = function () {};
	   Surrogate.prototype = parentClass.prototype;
	   childClass.prototype = new Surrogate();
	   childClass.prototype.constructor = childClass;
	 },
	  randomVec (length) {
	    let xVel = (Math.random() * length * 2) - length;
	    let yVel = Math.sqrt(Math.pow(length, 2) - Math.pow(xVel, 2));
	    if (Math.random() >= 0.5) { yVel *= -1; }
	    return [xVel, yVel];
	  }
	};

	module.exports = Util;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	let Game = __webpack_require__(5);

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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	let Asteroid = __webpack_require__(1);
	let Ship = __webpack_require__(6);

	let Game = function() {
	  this.asteroids = [];
	  this.addAsteroids();
	  this.ship = new Ship(this);

	};
	Game.DIM_X = 500;
	Game.DIM_Y = 500;
	Game.NUM_ASTEROIDS = 20;

	Game.prototype.addAsteroids = function() {
	  for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
	    let pos = this.randomPosition();
	    // debugger
	    let newAst = new Asteroid(pos, this);
	    this.asteroids.push(newAst);
	  }

	};

	Game.prototype.randomPosition = function() {
	  let randX = Math.random() * Game.DIM_X;
	  let randY = Math.random() * Game.DIM_Y;
	  return [randX, randY];
	};

	Game.prototype.draw = function(ctx) {
	  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	  this.allObjects().forEach(function (object) {
	    object.draw(ctx);
	  });
	};

	Game.prototype.moveObjects = function() {
	  this.allObjects().forEach(function (object) {
	    object.move();
	  });
	};

	Game.prototype.wrap = function (pos) {
	  if (pos[0] <= 0) { pos[0] += Game.DIM_X; }
	  if (pos[0] >= Game.DIM_X) { pos[0] -= Game.DIM_X; }
	  if (pos[1] <= 0) { pos[1] += Game.DIM_Y; }
	  if (pos[1] >= Game.DIM_Y) { pos[1] -= Game.DIM_Y; }
	  return pos;
	};

	Game.prototype.checkCollisions = function () {
	  // let theseObjs = this.allObjects();
	  // console.log(theseObjs);
	    for (var i = 0; i < this.asteroids.length - 1; i++) {
	      for (var j = i + 1; j < this.asteroids.length; j++) {
	        if (this.asteroids[i].isCollidedWith(this.asteroids[j])) {
	          // this.asteroids.splice(j, 1);
	          // this.asteroids.splice(i, 1);
	          this.remove(this.asteroids[j]);
	          this.remove(this.asteroids[i]);
	          j = i;
	          // alert("Collison");
	        }
	      }
	    }
	};

	Game.prototype.remove = function (asteroid) {
	  let astIdx = this.asteroids.indexOf(asteroid);
	  this.asteroids.splice(astIdx, 1);
	};

	Game.prototype.step = function () {
	  this.moveObjects();
	  this.checkCollisions();

	};

	Game.prototype.allObjects = function () {
	  debugger
	  return this.asteroids.concat(this.ship);
	};

	module.exports = Game;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	let MovingObject = __webpack_require__(2);
	let Util = __webpack_require__(3);

	let Ship = function(game) {
	  MovingObject.call(this, {pos: game.randomPosition(), vel: [0,0], radius: Ship.RADIUS, color: Ship.COLOR, game: game});
	};
	Util.inherits(Ship, MovingObject);

	Ship.RADIUS = 3;
	Ship.COLOR = 'green';

	module.exports = Ship;


/***/ }
/******/ ]);