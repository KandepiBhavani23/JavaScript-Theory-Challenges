/* 
- Currying is a function that takes one argument at a time and return a new function
expecting the next argument. 

- It is a conversion of functions from callable as f(a,b,c)into callable as f(a)(b)(c).

- They are constructed by chaining closures by immediately returning their inner functions simultaneously.

	Why should we use currying
	- To avoid same variable passing again and again 
	- To create Higher Order Function
	- To make your function pure and less prone to errors
  - It divides one function into multiple functions so that one handles one set of responsibility.
*/

//Example - 1
function add(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}
console.log(add(12)(23)(10));

//Function Declaration
function sendAutoEmail(to) {
  return function (subject) {
    return function (body) {
      console.log(`Sending Email to ${to} with subject ${subject}: ${body}`);
    };
  };
}

const step1 = sendAutoEmail("kandepibhavani@gmail.com");
let step2 = step1("New Order Confirmation");
step2("Hey Bhavani here is something for you");

//Using ES6
const sendAutoEmails = (to) => (subject) => (body) => {
  console.log(`Sending Email to ${to} with subject ${subject}: ${body}`);
};

sendAutoEmail("kandepibhavani@gmail.com")("New Order Confirmation")(
  "Hey Bhavani here is something for you"
);

//Example-2
const evaluate = (operation) => {
  return (a) => (b) => {
    if (operation === "sum") return a + b;
    else if (operation === "subtract") return a - b;
    else if (operation === "multiply") return a * b;
    else if (operation === "divide") return a / b;
    else if (operation === "modulo") return a % b;
    else if (operation === "power") return Math.pow(a, b);
    else return "Invalid Operation";
  };
};

const sum = evaluate("sum");
console.log(sum(3)(4));

const subtract = evaluate("subtract");
console.log(subtract(20)(4));

const power = evaluate("power");
console.log(power(2)(3));

const abs = evaluate("abs");
console.log(abs(2)(3)); //Invalid Operation

//Question - 3

// ************** Infinite Currying *******************

//Example : console.log(add(5)(2)(4)(5))

function add(a) {
  return function (b) {
    if (b) return add(a + b);
    return a;
  };
}

console.log(add(7)(3)(7)(10)());

//Question - 4
// ************** Currying vs Partial Application *******************

//Particial Application : This can take many arguments at a time
function addition(a) {
  return function (b, c) {
    return a + b + c;
  };
}

const add1 = addition(10)(20, 14);
console.log(add1);

let users = {
  firstName: "Bhavani",
  lastName: "Kandepi",
  city: "Bangalore",
};

const getUserDetails = (data) => {
  return (key) => data[key];
};

const userDetail = getUserDetails(users);
console.log(userDetail("firstName"));
console.log(userDetail("lastName"));

//Question - 5
//Convert f(a, b, c) to f(a)(b)(c)
function curry(func) {
  return function curriedFunc(...args) {
    if (args.length >= func.length) {
      return func(...args);
    } else {
      return function (...next) {
        return curriedFunc(...args, ...next);
      };
    }
  };
}

const join = (a, b, c) => {
  return `${a} ${b} ${c}`;
};
const curriedJoin = curry(join);
curriedJoin(1, 2)(3);

//Question - 6 :  Infinite Arguments
// add(1,2..n)(5,6…n)…(n)()

const infiniteAdd = (...args) => {
  const a = args.reduce((a, b) => a + b, 0);
  return (...args) => {
    const b = args.reduce((a, b) => a + b, 0);
    if (b) return a + b;
    else return a;
  };
};

console.log(infiniteAdd(1, 2, 3)(4, 6, 7));

//Question - 7 : Currying with Higher Order Functions
const checkBankDetails =
  (userName) => (expectedName) => (acctNo) => (expectedAcctNo) => {
    let nameResult = expectedName.test(userName);
    let acctResult = expectedAcctNo.test(acctNo);

    if (nameResult == false && acctResult == false) {
      console.log(
        "Bank Name and Account Number are incorrect! \nName must be two or three names \nand number must be 10"
      );
    } else if (nameResult == false && acctResult == true) {
      console.log("Bank Name is incorrect! \nName must be two or three names");
    } else if (nameResult == true && acctResult == false) {
      console.log("Account NUMBER is incorrect! \nMust be 10 numbers");
    } else {
      console.log(
        `Account Details are correct\n Please transfer some cash to the account\n ${userName}, ${acctNo}, Eco Bank! Thanks`
      );
    }
  };

let validBankName = /^[a-z]+\s[a-z]+(\s[a-z]+)?$/i;
let validAcctNumber = /^[0-9]{10}$/;
checkBankDetails("Smitha Das")(validBankName)(3010006919)(validAcctNumber);
