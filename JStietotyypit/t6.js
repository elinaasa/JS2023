'use strict';

function generateTable(number) {

  let tableHTML = "<table>";

  for (let i = 1; i <= number; i++) {
    tableHTML += "<tr>";
    for (let j = 1; j <= number; j++) {
      tableHTML += "<td>" + (i * j) + "</td>";
    }
    tableHTML += "</tr>";
  }

  tableHTML += "</table>";

  document.body.innerHTML = "Multiplication Table:" + tableHTML;
}

const number = +prompt("Enter a positive integer:");
generateTable(number);
