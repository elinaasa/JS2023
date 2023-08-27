'use strict';

function sortArray(numbers, order) {

    let sortedArray;

    if (order === "asc") {
        sortedArray = numbers.slice().sort((a, b) => a - b);
    } else if (order === "desc") {
        sortedArray = numbers.slice().sort((a, b) => b - a);
    }

    return sortedArray;
}

const numbers = [5, 2, 8, 1, 9];

console.log(sortArray(numbers, "asc"));
console.log(sortArray(numbers, "desc"));
