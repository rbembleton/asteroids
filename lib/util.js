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
