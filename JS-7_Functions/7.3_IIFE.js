/*
	IIFE - Immediately Invoked Function Expression
*/
//1. With Anonymous Arrow Function Inside
(() => {})();

//2. With Function Keyword
(function () {})();

//3. With Function Name(allows for recursion)
(function IIFE() {
  num++;
  console.log(num);
  return num !== 5 ? IIFE(num) : console.log("Finished");
})((num = 0));

/* Reason for using IIFE function */

//Reason-1. Does not pollute the global object namespace
const sentence = "Wikipedia is a free online encyclopedia";
const globalScope1 = () => "Wikipedia's purpose is to benefit readers";

//isolate declarations within the function
(() => {
  const sentence = "Wikipedias are places where people work together";
  const globalScope1 = () => "We use Simple English words and grammar here";

  console.log(sentence);
  console.log(globalScope1());
})();

console.log(sentence);
console.log(globalScope1());

//Reason - 2: Private Variables and Methods from Closures
const increment = (() => {
  let counter = 0;
  console.log(counter);
  const credits = (num) => console.log(`I have ${num} credits`);
  return () => {
    counter++;
    credits(counter);
  };
})();

increment();
increment();
increment();

//Reason - 3a : Module Pattern
const Score = (() => {
  let count = 0;
  return {
    current: () => {
      return count;
    },
    increment: () => {
      count++;
    },
    decrement: () => {
      count--;
    },
    reset: () => {
      count = 0;
    },
  };
})();

Score.increment();
console.log(Score.current());

Score.increment();
console.log(Score.current());

Score.decrement();
console.log(Score.current());

Score.reset();
console.log(Score.current());

//Reason - 3b : The Revealing Pattern is a variation of the Module Pattern

const Game = (() => {
  let count = 0;
  const current = () => {
    return `Game score is ${count}.`;
  };

  const increment = () => {
    count++;
  };

  const decrement = () => {
    count--;
  };

  const reset = () => {
    count = 0;
  };

  return {
    current,
    increment,
    decrement,
    reset,
  };
})();

Game.increment();
console.log(Game.current());

Game.increment();
console.log(Game.current());

Game.decrement();
console.log(Game.current());

Game.reset();
console.log(Game.current());

// Reason - 3c : Injecting a namespace object
((namespace) => {
  namespace.count = 0;
  namespace.current = function () {
    return `App count is ${this.count}.`;
  };

  namespace.increment = function () {
    this.count++;
  };

  namespace.decrement = function () {
    this.count--;
  };

  namespace.reset = function () {
    this.count = 0;
  };
})((window.App = window.App || {}));

App.increment();
console.log(App.current());
