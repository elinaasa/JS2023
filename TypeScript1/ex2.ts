function SquareRoot(num: number | null | undefined): number | string {
  // TODO: Check if the input is undefined or null
  if (num === undefined || num === null) {
    return "Input is undefined or null.";
  }

  // TODO: Check if the input is a valid number. If fail, return 'Invalid input. Please enter a valid number.'
  if (typeof num !== "number" || isNaN(num)) {
    return "Invalid input. Please enter a valid number.";
  }

  // TODO: Handle cases where the input is negative. If fail, return 'Cannot calculate square root of a negative number.'
  if (num < 0) {
    return "Cannot calculate square root of a negative number.";
  }

  // Calculate and return the the result
  return Math.sqrt(num);
}

// Prompt the user to enter a number
const userInput = prompt("Enter a number to calculate its square root:") || "";

// Convert user input to a number or keep it undefined if empty
// TODO: replce x and y with proper types
// Convert user input to a number or keep it undefined if empty
const numberInput: number | undefined = userInput
  ? parseFloat(userInput)
  : undefined;

// Call the squareRoot function and display the result
const result = SquareRoot(numberInput);
console.log(result);
