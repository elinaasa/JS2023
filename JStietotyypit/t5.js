'use strict';

const numero = +prompt("Syötä positiivinen kokonaisluku: ");

function laskesumma(numero) {

    let summa = 0;
    for (let i = 1; i <= numero; i++) {
        summa += i;
    }

    return summa

}

if (numero > 0) {
    const vastaus = laskesumma(numero)
    document.getElementById('kohde').innerHTML = `Luonnollisten lukujen summa numeroon ${numero} on ${vastaus}`;
} else {
    document.getElementById('kohde').innerHTML = `Syötä positiivinen luku.`;
}