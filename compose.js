import { compose } from 'redux'

function removeSpaces(str) {
    return str.split(" ").join("");
}

function repeatString(str) {
    return str.repeat(2);
}

function convertToUpper(str) {
    return str.toUpperCase();
}

// console.log(removeSpaces('Remove Spaces'))
// console.log(repeatString("Repeat String"))
// console.log(convertToUpper("Convert to Upper Case"))

const input = 'abc def ghi';

// basic function composition
/*const output = convertToUpper(repeatString(removeSpaces(input)));  //  h(g(f(x)))
console.log('Output: ' + output);*/

// using compose function from redux 
const composedFunction = compose(removeSpaces, repeatString, convertToUpper);
console.log(composedFunction(input))
