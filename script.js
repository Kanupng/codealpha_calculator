let display = document.getElementById("display");
let previousDisplay = document.getElementById("previous-display");

let currentInput = "";
let previousInput = "";
let operator = null;
let shouldResetDisplay = false;


// Add number
function appendNumber(number) {

    if (shouldResetDisplay) {
        currentInput = "";
        shouldResetDisplay = false;
    }

    if (currentInput === "0") {
        currentInput = number;
    } else {
        currentInput += number;
    }

    updateDisplay();
}


// Add decimal
function appendDecimal() {

    if (shouldResetDisplay) {
        currentInput = "0";
        shouldResetDisplay = false;
    }

    if (!currentInput.includes(".")) {
        currentInput += ".";
    }

    updateDisplay();
}


// Add operator
function appendOperator(selectedOperator) {

    if (currentInput === "" && previousInput === "") {
        return;
    }

    if (currentInput === "" && previousInput !== "") {
        operator = selectedOperator;
        return;
    }

    if (previousInput !== "" && operator !== null) {
        calculate();
    }

    previousInput = currentInput;
    operator = selectedOperator;

    currentInput = "";

    previousDisplay.textContent =
        previousInput + " " + getOperatorSymbol(operator);
}


// Calculate result
function calculate() {

    if (previousInput === "" || currentInput === "" || operator === null) {
        return;
    }

    let num1 = parseFloat(previousInput);
    let num2 = parseFloat(currentInput);

    let result;

    switch (operator) {

        case "+":
            result = num1 + num2;
            break;

        case "-":
            result = num1 - num2;
            break;

        case "*":
            result = num1 * num2;
            break;

        case "/":

            if (num2 === 0) {
                display.value = "Error";
                resetCalculator();
                return;
            }

            result = num1 / num2;
            break;

        case "%":
            result = num1 % num2;
            break;

        default:
            return;
    }

    result = parseFloat(result.toFixed(10));

    display.value = result;

    previousDisplay.textContent =
        previousInput + " " +
        getOperatorSymbol(operator) +
        " " +
        currentInput + " =";

    currentInput = result.toString();

    previousInput = "";

    operator = null;

    shouldResetDisplay = true;
}


// Clear calculator
function clearDisplay() {

    currentInput = "";
    previousInput = "";
    operator = null;

    display.value = "0";

    previousDisplay.textContent = "";
}


// Delete last character
function deleteLast() {

    if (shouldResetDisplay) {
        clearDisplay();
        return;
    }

    currentInput = currentInput.slice(0, -1);

    updateDisplay();

}


// Update display
function updateDisplay() {

    display.value = currentInput || "0";

}


// Convert operator into symbol
function getOperatorSymbol(operator) {

    switch (operator) {

        case "*":
            return "×";

        case "/":
            return "÷";

        case "-":
            return "−";

        case "+":
            return "+";

        case "%":
            return "%";

        default:
            return operator;
    }
}


// Reset calculator
function resetCalculator() {

    currentInput = "";
    previousInput = "";
    operator = null;

    shouldResetDisplay = true;
}


// Keyboard support
document.addEventListener("keydown", function(event) {

    const key = event.key;

    // Numbers
    if (key >= "0" && key <= "9") {

        appendNumber(key);

    }

    // Decimal
    else if (key === ".") {

        appendDecimal();

    }

    // Operators
    else if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "%"
    ) {

        appendOperator(key);

    }

    // Enter or =
    else if (key === "Enter" || key === "=") {

        event.preventDefault();

        calculate();

    }

    // Backspace
    else if (key === "Backspace") {

        deleteLast();

    }

    // Escape
    else if (key === "Escape") {

        clearDisplay();

    }

});