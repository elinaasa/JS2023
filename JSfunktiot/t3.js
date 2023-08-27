'use strict';

const numbers = [];

let continueEntering = true;
while (continueEntering) {
    const input = prompt("Enter a number (or 'done' to finish): ");

    if (input === 'done') {
        continueEntering = false;
    } else {
        const number = parseFloat(input);
        if (!isNaN(number)) {
            numbers.push(number);
        }
    }
}

const evenNumbers = [];

for (const num of numbers) {
    if (num % 2 === 0) {
        evenNumbers.push(num)
        document.getElementById('kohde1').innerHTML = "Even Numbers:" + evenNumbers;
    } else {
        document.getElementById('kohde1').innerHTML = "Even Numbers: none"
    }
}

document.getElementById('kohde2').innerHTML = "Program has ended.";