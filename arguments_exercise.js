let sum = function(...args) {
  // let args = Array.prototype.slice.call(arguments);
  sum = 0;
  args.forEach(function(el) {
    sum += el;
  });
  return sum;
};

// console.log(sum(1,3,6));


Function.prototype.myBind = function() {
  let bindArgs = Array.prototype.slice.call(arguments);
  let ctx = bindArgs.shift();
  let that = this;
  this.call(ctx);
  return function () {
    let callArgs = Array.prototype.slice.call(arguments);
    let allArgs = bindArgs.concat(callArgs);
    that.apply(ctx, allArgs);
  };

};

function Cat(name) {
  this.name = name;
}

Cat.prototype.says = function (sound, person) {
  console.log(this.name + " says " + sound + " to " + person + "!");
  return true;
};

const markov = new Cat("Markov");
const breakfast = new Cat("Breakfast");
//
// markov.says("meow", "Ned");
// // Markov says meow to Ned!
// // true
//
// markov.says.myBind(breakfast, "meow", "Kush")();
// // Breakfast says meow to Kush!
// // true
//
// markov.says.myBind(breakfast)("meow", "a tree");
// // Breakfast says meow to a tree!
// // true
//
// markov.says.myBind(breakfast, "meow")("Markov");
// // Breakfast says meow to Markov!
// // true
//
// const notMarkovSays = markov.says.myBind(breakfast);
// notMarkovSays("meow", "me");
// // Breakfast says meow to me!
// // true



function sumThree(num1, num2, num3) {
  return num1 + num2 + num3;
}
//
// sumThree(4, 20, 6); // == 30
//
// // you'll write `Function#curry`!
// let f1 = sumThree.curry(3); // tells `f1` to wait until 3 arguments are given before running `sumThree`
// f1 = f1(4); // [Function]
// f1 = f1(20); // [Function]
// f1 = f1(6); // = 30
//
// // or more briefly:
// sumThree.curry(3)(4)(20)(6); // == 30


let curriedSum = function(numArgs) {
  let numbers = [];

  let _curriedSum = function(number) {
    numbers.push(number);
    console.log(numArgs);
    if (numbers.length === numArgs) {
      return sum(...numbers);
    } else {
      return _curriedSum;
    }
  };

  //
  return _curriedSum;
};
//
// const mySum = curriedSum(4);
// console.log(mySum(5)(30)(20)(1)); // => 56
//
//
//
Function.prototype.curry = function(numArgs) {
  let args = [];
  let that = this;

  let collectArgs = function(...moreArgs) {
    // let moreArgs = Array.prototype.slice.call(arguments);
    args = args.concat(moreArgs);
    let cats = "cats";
    if (args.length === numArgs) {
      return that(...args);
      // return that.apply(null, args);
    } else {
      return collectArgs;
    }
  };

  return collectArgs;
};

// or more briefly:
console.log(sumThree.curry(3)(4)(20)(6)); // == 30
