/**
 * this file contains logic by which our calculator will calculate the result and show it
 * to the user
 * note that we are only adding event listener to the DOM elements (button)
 * here we are not writing anything to DOM
 * this work is done by vendor.js file
 */

const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

/**
 * creating a function that will maintain a log of event that is happening at
 * the webpage
 */
function writeLog(operatorIndentifier, prevResult, userInput) {
  const logEntry = {
    event: operatorIndentifier,
    previousResult: prevResult,
    userInput_: userInput,
    finalResult_: currentResult,
  };
  logEntries.push(logEntry);
  console.log(logEntries);
}

/**
 * this function will extract the value from the input tag and convert that
 * value to integer data type
 */
function getUserInput() {
  return parseInt(userInput.value);
}

/**
 * this function will build the properly formatted string which user will see
 * at the page (result)
 * give call to function that will update the DOM
 */
function displayResult(operator, previousRes, enteredNum) {
  //javascript expression language, this is known as a string literal
  const displayText = `${previousRes} ${operator} ${enteredNum}`;
  outputResult(currentResult, displayText); // from vendor.js file
}

/**
 * logic to add the number entered by the user to currentResult
 */
function add() {
  const initialResult = currentResult; //globally declared
  const numberEntered = getUserInput();
  currentResult += numberEntered;
  writeLog("ADD", initialResult, numberEntered);
  displayResult("+", initialResult, numberEntered);
}

/**
 * logic to multiply the number entered by the user to currentResult
 */
function substract() {
  const initialResult = currentResult;
  const numberEntered = getUserInput();
  currentResult -= numberEntered;
  writeLog("SUBSTRACT", initialResult, numberEntered);
  displayResult("-", initialResult, numberEntered);
}

/**
 * logic to multiply the number entered by the user to currentResult
 */
function multiply() {
  const initialResult = currentResult;
  const numberEntered = getUserInput();
  currentResult *= numberEntered;
  writeLog("MULTIPLY", initialResult, numberEntered);
  displayResult("*", initialResult, numberEntered);
}

/**
 * logic to divide the number entered by the user to currentResult
 */
function divide() {
  const initialResult = currentResult;
  const numberEntered = getUserInput();
  currentResult /= numberEntered;
  writeLog("DIVIDE", initialResult, numberEntered);
  displayResult("/", initialResult, numberEntered);
}

/**
 * adding event listeners to the buttons, click event
 * when user will click the button the call back function associated with that
 * button will get executed
 * in case of addBtn it is add()
 */
addBtn.addEventListener("click", add); // from vendor.js file
subtractBtn.addEventListener("click", substract); // from vendor.js file
multiplyBtn.addEventListener("click", multiply); // from vendor.js file
divideBtn.addEventListener("click", divide); // from vendor.js file
