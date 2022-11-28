
//DOM Manipulation
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

//JavaScript Object
const randomFunc = {
    upper: getRandomUpper,
    lower: getRandonLower,
    number: getRandomNumber,
    symbol: getRandomSymbol,

};

generateEl.addEventListener('click', () => {
    // + sign convet/tell type of length 
    const length = +lengthEl.value;
    // console.log(typeof length);
    const hasUpper = uppercaseEl.checked;
    const hasLower = lowercaseEl.checked;
    const hasSymbol = symbolsEl.checked;
    const hasNumber = numbersEl.checked;
    //  console.log(hasNumber);

    resultEl.innerHTML = generatePassword(hasUpper, hasLower, hasNumber, hasSymbol, length);

});

//copy password to clipboard
clipboardEl.addEventListener('click', () => {
    const textArea = document.createElement('textarea');
    const password = resultEl.innerText;
    if (!password) {
        return;
    }

    textArea.value = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
    alert('Password Copied');
});


//function to generate password
function generatePassword(upper, lower, number, symbol, length) {

    //1. Init Password Variable
    //2. Filter out unchecked Types
    //3. Loop over length call generator function for each type
    //4. Add final Password to the password variable and return

    let generatedPassword = '';
    const typeCount = upper + lower + number + symbol;
    //  console.log(typeCount);

    const typeArr = [{ upper }, { lower }, { number }, { symbol }].filter(
        items => Object.values(items)[0]
    );
    // console.log(typeArr);
    if (typeCount == 0) {
        return '';
    }

    for (let i = 0; i < length; i += typeCount) {
        typeArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }
    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}







function getRandonLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}


function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol() {
    const symbols = "!@#$%^&*()+-:;><?/";
    return symbols[Math.floor(Math.random() * symbols.length)];
}
console.log(getRandomSymbol());