const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = document.querySelector(".calculator__display");

keys.addEventListener("click", (event) => {
  if (event.target.matches("button")) {
    const key = event.target;
    const action = key.dataset.action;
    const previousKeyType = calculator.dataset.previousKeyType;
    const keyContent = key.textContent;
    const currentValue = display.textContent;

    if (!action) {
      if (
        currentValue === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = keyContent;
      } else {
        display.textContent = currentValue + keyContent;
      }
      calculator.dataset.previousKey = "number";
    } else if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = currentValue;
      if (
        firstValue &&
        operator &&
        previousKeyType !== "operator" &&
        previousKeyType !== "calculate"
      ) {
        const calcValue = calculate(firstValue, operator, secondValue);
        display.textContent = calcValue;

        calculator.dataset.firstValue = calcValue;
      } else {
        calculator.dataset.firstValue = currentValue;
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
        display.textContent = "0.";
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
      display.textContent = 0;

      calculator.dataset.previousKeyType = "clear";
    } else if (action === "calculate") {
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

      calculator.dataset.modValue = secondValue;
      calculator.dataset.previousKeyType = "calculate";
    }
  }
});

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
