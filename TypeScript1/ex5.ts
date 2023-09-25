// TODO: Implement the lengthOrSquare function
// define the type(s) for 'value'
function lengthOrSquare(value: string | number) {
  // TODO: Use a type guard to check the actual type of 'value'
  if (typeof value === "string") {
    // if type is string, retrurn the length of the string
    return value.length;
  } else if (typeof value === "number") {
    // if type is number return the square of the number
    return value * value;
  }
}

// Prompt the user to enter a value as either a string or a number
const userInput = prompt("Enter a value as either a string or a number");
const parsedValue =
  userInput !== null
    ? isNaN(Number(userInput))
      ? userInput
      : Number(userInput)
    : "";

// Call the lengthOrSquare function
const result = lengthOrSquare(parsedValue);
console.log(typeof result);
console.log(result);
