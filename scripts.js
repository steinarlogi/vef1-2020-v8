/**
 * Verkefni 8 – Caesar dulmál með vefviðmóti
 *
 * Verður að passa _nákvæmlega_ við gefið HTML, mun annars brotna.
 * Þ.e.a.s., ekki þarf að skrifa meðhöndlun á HTML elementum sem vantar
 */

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */
function encode(str, n, alphabet = '') {
  let temp = "";

  for(let i = 0; i < str.length; i++) {

    let index = alphabet.indexOf(str[i]);

    if(index === -1) {
      return '';
    }

    temp = temp + alphabet[(index + n) % alphabet.length];
  }

  str = temp;

  return str;
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n, alphabet = '') {
  let temp = "";

  for(let i = 0; i < str.length; i++) {

    let index = alphabet.indexOf(str[i]);

    if(index === -1) {
      return '';
    }

    temp = temp + alphabet[(((index - n) % alphabet.length) + alphabet.length) % alphabet.length];
  }

  str = temp;

  return str;
}

const Caesar = (() => {
  // Default stafróf, uppfært þegar slegið inn í "alphabet"
  let alphabet = 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ';

  // Default type, uppfært af radio input
  let type = 'encode';

  // Default hliðrun, uppfært af "shift"
  let shift = 10;

  let string = '';

  //fall sem afkóðar/kóðar eftir upplýsingum
  //sem það fær og breytir dominu á viðeigandi hátt.
  function update() {
    let codedString = '';
    string = string.toUpperCase();

    console.log(type === 'encode');

    if(type === 'encode') {
      codedString = encode(string, shift, alphabet);
    } else {
      codedString = decode(string, shift, alphabet);
    }

    document.querySelector('.result').innerHTML = codedString;
  }

  function updateShift(shiftChooser) {
    shiftChooser.setAttribute('max', alphabet.length);

    shift = shift > alphabet.length ? alphabet.length : shift;

    document.querySelector('.shiftValue').innerHTML = shift;
  }

  function init(el) {
    let inputAlphabet = document.querySelector('#alphabet');
    let inputString = document.querySelector('#input');
    let shiftChooser = document.querySelector('#shift');
    let codeChooser = document.querySelector('.radio');
    let radio = document.getElementsByName('type');

    inputAlphabet.addEventListener('input', function(e) {
      alphabet = inputAlphabet.value;

      updateShift(shiftChooser);
      update();
    });

    inputString.addEventListener('input', function(e) {
      string = inputString.value;

      updateShift(shiftChooser);
      update();
    });

    shiftChooser.addEventListener('input', function(e) {
      shift = shiftChooser.value;

      updateShift(shiftChooser);
      update();
    });

    codeChooser.addEventListener('input', function(e) {
      if(radio[0].checked) {type = radio[0].value}
      else {type = radio[1].value}

      update();
    });

  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const ceasarForm = document.querySelector('.ceasar');

  Caesar.init(ceasarForm);
});
