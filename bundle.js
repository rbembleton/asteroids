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
	let Game = __webpack_require__(4);
	let GameView = __webpack_require__(6);

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
	let Ship = __webpack_require__(5)

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

	};








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

	MovingObject.prototype.collideWith = function (otherObject) {

	  // this.game.remove(otherObject);
	  // this.game.remove(this);
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

	let Asteroid = __webpack_require__(1);
	let Ship = __webpack_require__(5);
	let Bullet = __webpack_require__(7)

	let Game = function() {
	  this.asteroids = [];
	  this.addAsteroids();
	  this.ship = new Ship(this);
	  this.bullets = [];

	};
	Game.DIM_X = 1000;
	Game.DIM_Y = 800;
	Game.NUM_ASTEROIDS = 2;

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
	  let theseObjs = this.allObjects();
	  // console.log(theseObjs);
	    for (var i = 0; i < theseObjs.length - 1; i++) {
	      for (var j = i + 1; j < theseObjs.length; j++) {
	        if (theseObjs[i].isCollidedWith(theseObjs[j])) {
	          // this.asteroids.splice(j, 1);
	          // this.asteroids.splice(i, 1);
	          // this.remove(this.asteroids[j]);
	          // this.remove(this.asteroids[i]);
	          theseObjs[i].collideWith(theseObjs[j]);
	          // j = i;
	          // alert("Collison");
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
	  // debugger

	  return this.asteroids.concat(this.bullets).concat(this.ship);
	};



	module.exports = Game;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	let MovingObject = __webpack_require__(2);
	let Util = __webpack_require__(3);
	let Bullet = __webpack_require__(7);

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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	let Game = __webpack_require__(4);

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


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	let MovingObject = __webpack_require__(2);
	let Util = __webpack_require__(3);

	let Bullet = function (pos, vel, game) {
	  MovingObject.call(this, {pos: pos, vel: vel, radius: Bullet.RADIUS, color: Bullet.COLOR, game: game});
	  // this.normalizeVel();
	};
	Util.inherits(Bullet, MovingObject);

	Bullet.RADIUS = 2;
	Bullet.COLOR = 'black';

	Bullet.prototype.move = function () {
	  this.pos[0] += this.vel[0];
	  this.pos[1] += this.vel[1];
	  if (this.pos !== this.game.wrap(this.pos)) { remove(this); }
	};

	// Bullet.prototype.normalizeVel = function () {
	//   this.vel = [this.vel[0] * 2, this.vel[1] * 2];
	// };



	module.exports = Bullet;


/***/ }
/******/ ]);