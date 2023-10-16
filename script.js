const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator-keys");
const display = document.querySelector(".calculator-display");

keys.addEventListener("click", (event) =>
  // listen for all key presses &determine wich key was pressed
  {
    if (event.target.matches("button")) {
      const key = event.target;
      const action = key.dataset.action;
      const previousKeyType = calculator.dataset.previousKeyType;
      const keyContent = key.textContent; //When a user hits a number key the calculator should display the number that was hit a number & The current displayed number
      const currentValue = display.textContent; //If the previousKeyType is an operator, we want to replace the displayed number with clicked number

      if (!action) {
        if (
          currentValue === "0" ||
          previousKeyType === "operator" ||
          previousKeyType === "calculate"
        ) {
          // If the calculator shows 0, we want to replace the calculator’s display with the clicked key
          display.textContent = keyContent;
        } else {
          //If the calculator shows a non-zero number, we want to append the clicked key to the displayed number.
          display.textContent = currentValue + keyContent;
        }
        calculator.dataset.previousKey = "number";
      } else if (
        // If the key has a data-action that is either add, subtract, multiply or divide, we know the key is an operator.
        action === "add" ||
        action === "subtract" ||
        action === "multiply" ||
        action === "divide"
      ) {
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = currentValue;

        if (
          //check for firstValue and operator because secondValue always exists
          firstValue &&
          operator &&
          previousKeyType !== "operator" &&
          previousKeyType !== "calculate"
        ) {
          const calcValue = calculate(firstValue, operator, secondValue);
          display.textContent = calcValue;

          calculator.dataset.firstValue = calcValue; // Update calculated value as firstValue
        } else {
          calculator.dataset.firstValue = currentValue; // If there are no calculations, set currentValue as the firstValue
        }

        calculator.dataset.previousKeyType = "operator";
        calculator.dataset.firstValue = currentValue;
        calculator.dataset.operator = action;
      } else if (action === "decimal") {
        if (!currentValue.includes(".")) {
          display.textContent = currentValue + ".";
        } else if (
          previousKeyType === "operator" ||
          previousKeyType === "calculate"
        ) {
          display.textContent = "0."; //check if the previous key is an operator. If it is, we want to replace the displayed number with 0.
        }
        calculator.dataset.previousKey = "decimal";
      } else if (action === "clear") {
        if (key.textContent === "AC") {
          calculator.dataset.firstValue = "";
          calculator.dataset.modValue = "";
          calculator.dataset.operator = "";
          calculator.dataset.previousKeyType = "";
        } else {
          key.textContent = "AC";
        }
        //check if the previous key is an operator. If it is, we want to replace the displayed number with 0. If it is not, we want to replace the displayed number with 0.
        display.textContent = 0;

        calculator.dataset.previousKeyType = "clear";
      } else if (action === "calculate") {
        // If the key’s data-action is calculate, we know the user clicked on the equals key. We need to perform the calculation and display the result.
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = currentValue;

        if (firstValue) {
          if (previousKeyType === "calculate") {
            firstValue = currentValue;
            secondValue = calculator.dataset.modValue;
          }
          display.textContent = calculate(firstValue, operator, secondValue);
        }
        //set modifier value carry forward the previous secondValue into the new calculation. the secondValue to persist to the next calculation, we store it in another custom attribute
        calculator.dataset.modValue = secondValue;
        calculator.dataset.previousKeyType = "calculate";
      }
    }
  }
);

// Perform calculation and return calculated value
const calculate = (n1, operator, n2) => {
  if (operator === "add") {
    return parseFloat(n1) + parseFloat(n2);
  } else if (operator === "subtract") {
    return parseFloat(n1) - parseFloat(n2);
  } else if (operator === "multiply") {
    return parseFloat(n1) * parseFloat(n2);
  } else if (operator === "divide") {
    return parseFloat(n1) / parseFloat(n2);
  }
};
