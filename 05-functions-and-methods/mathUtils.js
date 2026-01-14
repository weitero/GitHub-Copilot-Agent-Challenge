// 1. A function add that takes two parameters and returns their sum
function add(a, b) {
  return a + b;
}

// 2. A function multiply with default parameter values (second parameter defaults to 1)
function multiply(a, b = 1) {
  return a * b;
}

// 3. An arrow function square that takes a number and returns its square
const square = (n) => n * n;

// 4. A function calculate that accepts another function as a parameter and two numbers, then applies the function to those numbers
function calculate(operation, a, b) {
  return operation(a, b);
}

// 5. Demonstrate calling each function with appropriate test cases
console.log('--- Math Utils Demonstrations ---');

// Test add
console.log(`add(5, 3) = ${add(5, 3)}`); // Expected: 8

// Test multiply
console.log(`multiply(4, 2) = ${multiply(4, 2)}`); // Expected: 8
console.log(`multiply(7) = ${multiply(7)}`); // Expected: 7 (default param starts working)

// Test square
console.log(`square(6) = ${square(6)}`); // Expected: 36

// Test calculate
console.log(`calculate(add, 10, 5) = ${calculate(add, 10, 5)}`); // Expected: 15
console.log(`calculate(multiply, 10, 5) = ${calculate(multiply, 10, 5)}`); // Expected: 50

// Demonstrate using an anonymous function with calculate (Subtraction example)
console.log(
  `calculate((x, y) => x - y, 10, 5) = ${calculate((x, y) => x - y, 10, 5)}`
); // Expected: 5
