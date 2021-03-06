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
	let Game = __webpack_require__(6);
	let GameView = __webpack_require__(7);

	const canvasEl = document.getElementById("game-canvas");
	// canvasEl.height = window.innerHeight;
	// canvasEl.width = window.innerWidth;
	canvasCtx = canvasEl.getContext("2d");
	gv = new GameView(canvasCtx);
	gv.start();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	let MovingObject = __webpack_require__(2);
	let Util = __webpack_require__(3);
	let Ship = __webpack_require__(4);
	let Bullet = __webpack_require__(5);

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

	MovingObject.prototype.collideWith = function (otherObject) {
	  // if (this instanceof Asteroid) {
	  //
	  //   if (otherObject instanceof Ship) {
	  //     otherObject.relocate();
	  //   }
	  //
	  //   if (otherObject instanceof Bullet) {
	  //     this.game.remove(otherObject);
	  //   }
	  //
	  // }
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

	let MovingObject = __webpack_require__(2);
	let Util = __webpack_require__(3);
	let Bullet = __webpack_require__(5);

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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	let MovingObject = __webpack_require__(2);
	let Util = __webpack_require__(3);

	let Bullet = function (pos, vel, game) {
	  MovingObject.call(this, {pos: pos, vel: vel, radius: Bullet.RADIUS, color: Bullet.COLOR, game: game});
	};
	Util.inherits(Bullet, MovingObject);

	Bullet.RADIUS = 5;
	Bullet.COLOR = 'black';

	Bullet.prototype.move = function () {
	  this.pos[0] += this.vel[0];
	  this.pos[1] += this.vel[1];
	  if (this.isOffScreen(this.pos)) { this.game.remove(this); }
	};

	Bullet.prototype.isOffScreen = function (pos) {
	  if (pos[0] <= 0) { return true; }
	  if (pos[0] >= this.game.DIM_X) { return true; }
	  if (pos[1] <= 0) { return true; }
	  if (pos[1] >= this.game.DIM_Y) { return true; }
	  return false;
	};


	module.exports = Bullet;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	let Asteroid = __webpack_require__(1);
	let Ship = __webpack_require__(4);
	let Bullet = __webpack_require__(5);

	let Game = function() {
	  this.asteroids = [];
	  this.addAsteroids();
	  this.ship = new Ship(this);
	  this.bullets = [];

	};
	Game.DIM_X = 1000;
	Game.DIM_Y = 800;
	Game.NUM_ASTEROIDS = 10;

	Game.prototype.addAsteroids = function() {
	  for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
	    let pos = this.randomPosition();
	    let newAst = new Asteroid(pos, this);
	    this.asteroids.push(newAst);
	  }

	};

	Game.prototype.blowUpAsteroid = function (oldAst) {
	  for (var i = 0; i < 3; i++) {
	    let pos = [oldAst.pos[0], oldAst.pos[1]];
	    let newAst = new Asteroid(pos, this);
	    newAst.radius = 13;
	    this.asteroids.push(newAst);
	  }
	  this.remove(oldAst);
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
	  let theseObjs = this.allObjects();
	    for (var i = 0; i < theseObjs.length - 1; i++) {
	      for (var j = i + 1; j < theseObjs.length; j++) {
	        if (theseObjs[i].isCollidedWith(theseObjs[j])) {
	          theseObjs[i].collideWith(theseObjs[j]);
	        }
	      }
	    }
	};

	Game.prototype.remove = function (object) {
	  if (object instanceof Asteroid) {
	    let astIdx = this.asteroids.indexOf(object);
	    this.asteroids.splice(astIdx, 1);
	  } else if (object instanceof Bullet) {
	    let btIdx = this.bullets.indexOf(object);
	    this.bullets.splice(btIdx, 1);
	  }
	};

	Game.prototype.step = function () {
	  this.moveObjects();
	  this.checkCollisions();

	};

	Game.prototype.allObjects = function () {
	  return this.asteroids.concat(this.bullets).concat(this.ship);
	};



	module.exports = Game;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	let Game = __webpack_require__(6);

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

	};


	module.exports = GameView;


/***/ }
/******/ ]);