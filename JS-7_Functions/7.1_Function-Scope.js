/*

1. Scoping in refers to the rules that determine the visibility and accessibility of variables within your code. 

2. JavaScript has function-level scoping, which means variables declared within a function are only accessible within that function. 

3. JavaScript also has block-level scoping introduced in ES6 with the let and const keywords.

*/

//1. Global Scope

//Example-1 : Accessing a Global Variable Inside a Function
var variable = "Global Variable";
function globalScope() {
  console.log(variable); //Global Variable
}

globalScope();
console.log(variable); //Global Variable

//Example-2 : Modifying a Global Variable Inside a Function

var string = "Wikipedia is a free online encyclopedia";
function globalScope1() {
  string = "Wikipedia's purpose is to benefit readers";
}

globalScope1();
console.log(string); //Wikipedia's purpose is to benefit readers

//Example-3 : Variable Shadowing
var x = 20;

function globalScope2() {
  var x = 30;
  console.log(x); //30
}

globalScope2();
console.log(x); //20

console.log(
  "************************************************************************************"
);

//2. Function Scope

//Example-1 : Accessing a Local Variable Outside the Function
function functionScope() {
  var localVar = "Function Variable";
  console.log(localVar); //Function Variable
}

functionScope();
console.log(localVar); //ReferenceError: globalVar is not defined

//Example-2 : Variable Shadowing
function outerFunction() {
  var x = 10;

  function innerFunction() {
    var x = 20;
    console.log(x); // Output: 20
  }

  innerFunction();
  console.log(x); // Output: 10
}

outerFunction();

console.log(
  "************************************************************************************"
);

//3. Block Scope

//Example-1 : Accessing a Block-Scoped Variable Inside a Block
function blockScope() {
  if (true) {
    let blockVar = "I am a block-scoped variable";
    console.log(blockVar); //I am a block-scoped variable
  }
  console.log(blockVar); //ReferenceError: blockVar is not defined
}
blockScope();

//Example-2: Modifying a Block-Scoped Variable Inside a Block

let blockVar = "Initial value";

if (true) {
  blockVar = "Modified value";
}

console.log(blockVar);

//Example-3: Variable Shadowing
let x = 10;

if (true) {
  let x = 20;
  console.log(x); // Output: 20
}

console.log(x); // Output: 10

console.log(
  "************************************************************************************"
);
