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
 * calculateResult function will have all the common steps that are required for
 * calculating result
 * earlier steps were repeating
 * but now we just have a common function call
 * code is written once and executed multiple times and dynamically for any situation
 */

function calculateResult(operation){
  const initialResult = currentResult; //globally declared
  const numberEntered = getUserInput();
  
  // this if block is for avoiding any random and undefined situation
  if(operation !== "ADD" &&
  operation !== "SUBSTRACT" &&
  operation !== "MULTIPLY" &&
  operation !== "DIVIDE" || !numberEntered){
    return;
  }
  
  let mathOperator = "";
  if(operation === "ADD"){
    currentResult += numberEntered;
    mathOperator = "+";
  }else if(operation == "SUBSTRACT"){
    currentResult -= numberEntered;
    mathOperator = "-";
  }else if(operation == "MULTIPLY"){
    currentResult *= numberEntered;
    mathOperator = "*";
  }else{
    currentResult /= numberEntered;
    mathOperator = "/";
  }
  writeLog(operation, initialResult, numberEntered);
  displayResult(mathOperator, initialResult, numberEntered);
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
  calculateResult("ADD");
}

/**
 * logic to multiply the number entered by the user to currentResult
 */
function substract() {
  calculateResult("SUBSTRACT");
}

/**
 * logic to multiply the number entered by the user to currentResult
 */
function multiply() {
  calculateResult("MULTIPLY");
}

/**
 * logic to divide the number entered by the user to currentResult
 */
function divide() {
  calculateResult("DIVIDE");
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
