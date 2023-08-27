'use strict';
const asteetC = +prompt('Syötä celsius asteet: ');

const asteetF = (asteetC * 9) / 5 + 32;
const asteetK = asteetC + 273.15;

const vastaus = `${asteetC} astetta
celsiusta on ${asteetF} fahrenheittia ja ${asteetK} kelviniä.`;

document.getElementById('kohde').innerHTML = vastaus;