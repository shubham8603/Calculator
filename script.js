document.addEventListener("DOMContentLoaded", function () {
    let display = document.getElementById("display");
    let currentValue = "";
    let currentOperator = "";
    let waitingForSecondOperand = false;
    let firstOperand = 0;

    function updateDisplay() {
        display.innerText = currentValue;
    }

    document.querySelectorAll(".number").forEach((button) => {
        button.addEventListener("click", function () {
            if (waitingForSecondOperand) {
                currentValue = button.innerText;
                waitingForSecondOperand = false;
            } else {
                currentValue += button.innerText;
            }
            updateDisplay();
        });
    });

    document.querySelectorAll(".operator").forEach((button) => {
        button.addEventListener("click", function () {
            if (currentOperator !== "" && !waitingForSecondOperand) {
                compute();
            }
            currentOperator = button.innerText;
            firstOperand = parseFloat(currentValue);
            waitingForSecondOperand = true;
        });
    });

    document.getElementById("equals").addEventListener("click", function () {
        if (currentOperator !== "") {
            compute();
            currentOperator = "";
        }
    });

    document.getElementById("clear").addEventListener("click", function () {
        currentValue = "";
        currentOperator = "";
        firstOperand = 0;
        waitingForSecondOperand = false;
        updateDisplay();
    });

    function compute() {
        let result;
        const secondOperand = parseFloat(currentValue);
        switch (currentOperator) {
            case "+":
                result = firstOperand + secondOperand;
                break;
            case "-":
                result = firstOperand - secondOperand;
                break;
            case "*":
                result = firstOperand * secondOperand;
                break;
            case "/":
                if (secondOperand !== 0) {
                    result = firstOperand / secondOperand;
                } else {
                    result = "Error";
                }
                break;
            default:
                return;
        }
        currentValue = result.toString();
        waitingForSecondOperand = false;
        updateDisplay();
    }
});
