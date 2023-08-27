'use strict';

const s1 = +prompt('Syötä sivun 1 pituus: ');
const s2 = +prompt('Syötä sivun 2 pituus: ');
const s3 = +prompt('Syötä sivun 3 pituus: ');

let tyyppi = '';

// if ((s1 === s2) === s3) {}

if (s1 === s2 && s2 === s3) {
  tyyppi = 'tasasivuinen kolmio';
}

if ((s1 === s2 && s2 !== s3) || (s2 === s3 && s1 !== s3)) {
  tyyppi = 'tasakylkinen kolmio';
} else if (s1 !== s2 && s3 !== s1) {
  tyyppi = 'epäsäännöllinen kolmio';
}

document.getElementById('kohde').insertAdjacentHTML('afterbegin', tyyppi);
