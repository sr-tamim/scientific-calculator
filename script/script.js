const screen = document.getElementById('display');
const topScreen = document.getElementById('topDisplay');
const numBut = document.querySelectorAll('.numberButton');
const operationBut = document.querySelectorAll('.operationButton');
const bracketBut = document.querySelectorAll('.bracketButton');
const squareBut = document.querySelector('#squareBut');
const sqrtBut = document.querySelector('#sqrtBut');
const percentBut = document.querySelector('#percentBut');
const equalBut = document.querySelector('#equalBut');
const acBut = document.querySelector('#ac');
const delBut = document.querySelector('#del');
const dotBut = document.getElementById('dot');

window.addEventListener('load', acFunc);

let calculation = [], showOnScreen = [];


function updateScreen() {
    topScreen.value = showOnScreen.join('');
}

acBut.addEventListener('click', acFunc);

function acFunc() {
    calculation = [];
    showOnScreen = [];
    screen.value = 0;
    updateScreen();
}
delBut.addEventListener('click', () => {
    calculation.pop();
    showOnScreen.pop();
    updateScreen();
})




// dotBut.addEventListener('click', dotFunc);
// function dotFunc() {
//     if (screen.value == '') { screen.value = 0 }
//     if (screen.value.indexOf('.') == -1) {
//         screen.value += '.';
//     }
// }



numBut.forEach(element => {
    element.addEventListener('click', numButFunction);
})

function numButFunction(event) {
    calculation.push(event.target.innerText);
    showOnScreen.push(event.target.innerText);
    updateScreen();
}
operationBut.forEach(element => {
    element.addEventListener('click', operationButFunction);
})

function operationButFunction(event) {
    calculation.push(event.target.dataset.buttonSymbol);
    showOnScreen.push(event.target.innerText);
    updateScreen();

    numBut.forEach(element => {
        element.removeEventListener('click', removeAns);
    })
}


bracketBut.forEach(element => {
    element.addEventListener('click', bracketFunc);
});
function bracketFunc(event) {
    let bracketCount = 0;
    for (let value of calculation.join('')) {
        if (value == '(') { bracketCount++ }
        if (value == ')') { bracketCount-- }
    }

    if (isNaN(parseFloat(showOnScreen[showOnScreen.length - 1])) == false &&
        event.target.innerText == '(') {
        calculation.push('*');
    } else if (event.target.innerText == ')') {
        if (bracketCount == 0) { return }
    }

    calculation.push(event.target.innerText);
    showOnScreen.push(event.target.innerText);
    updateScreen();

    numBut.forEach(element => {
        element.removeEventListener('click', removeAns);
    })
}

function autoCloseBracket() {
    let startParenthesis = 0;
    let endParenthesis = 0;
    for (element of calculation) {
        element = element.toString();
        if (element.indexOf('(') != -1) { startParenthesis++ }
        else if (element.indexOf(')') != -1) { endParenthesis++ }
    }
    for (let i = endParenthesis; i < startParenthesis; i++) {
        calculation.push(')');
    }
}

squareBut.addEventListener('click', squareFunc);

function squareFunc() {
    let squareOf = [];
    if (calculation[calculation.length - 1] == ')') {
        let bracketCount = 0;
        for (let i = calculation.length - 1; i >= 0; i--) {
            if (calculation[i] == '(') { bracketCount++ }
            if (calculation[i] == ')') { bracketCount-- }
            squareOf.unshift(calculation[i]);
            calculation.pop();
            if (bracketCount == 0) { break }
        }
    } else {
        for (let i = calculation.length - 1; i >= 0; i--) {
            if (isNaN(calculation[i])) { break }
            squareOf.unshift(calculation[i]);
            calculation.pop();
        }
    }
    let squared = Math.pow(eval(squareOf.join('')), 2);
    calculation.push(squared);
    console.log(calculation);

    showOnScreen.push('²');
    updateScreen();
}


sqrtBut.addEventListener('click', sqrtFunc);

function sqrtFunc() {
    if (isNaN(Number(showOnScreen[showOnScreen.length - 1])) == false) {
        calculation.push('*');
        calculation.push('Math.sqrt(');
        showOnScreen.push('√(');
        updateScreen();
    } else {
        calculation.push('Math.sqrt(');
        showOnScreen.push('√(');
        updateScreen();
    }
}



equalBut.addEventListener('click', equalFunc);

function equalFunc() {
    autoCloseBracket();
    console.log(calculation);

    let answer = eval(calculation.join(''));

    calculation = [answer.toString()];
    showOnScreen = [answer.toString()];
    screen.value = answer;


    // clear answer when number button clicked
    numBut.forEach(element => {
        element.addEventListener('click', removeAns);
    })
}

function removeAns(event) {
    calculation = [];
    showOnScreen = [];
    updateScreen();
    numBut.forEach(element => {
        element.removeEventListener('click', removeAns);
    })
    numButFunction(event);
}
