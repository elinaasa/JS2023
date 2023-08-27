'use strict';

const x1 = +prompt('Syötä koordinaatti x1 = ');

const y1 = +prompt('Syötä koordinaatti y1 = ');

const x2 = +prompt('Syötä koordinaatti x2 = ');

const y2 = +prompt('Syötä koordinaatti y1 = ');

const Distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

document.getElementById('kohde').innerHTML = Distance;