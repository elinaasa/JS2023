'use strict';

const numbers = [];

for (let i = 0; i < 5; i++) {
    const number = +prompt("Enter a number:");
    numbers.push(number);
}

console.log("Numbers :", numbers);

const searchNumber = +prompt("Enter a number to search: ");
if (numbers.includes(searchNumber)) {
    console.log(searchNumber + " is found in the array.");
} else {
    console.log(searchNumber + " is not found in the array.");
}

const removedNumber = numbers.pop();

console.log("Removed number:", removedNumber);

console.log("Updated numbers array:", numbers);

numbers.sort();

console.log("Sorted numbers array:", numbers);
