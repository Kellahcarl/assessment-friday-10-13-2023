const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = document.querySelector(".calculator__display");

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    // listen for all key presses &determine wich key was pressed
    const key = e.target;

    // Remove .is-depressed class from all keys

    Array.from(key.parentNode.children).forEach((k) =>
      k.classList.remove("is-depressed")
    );
    const action = key.dataset.action;
    const previousKeyType = calculator.dataset.previousKeyType;

    //When a user hits a number key the calculator should display the number that was hit a number & The current displayed number
    const keyContent = key.textContent;

    //If the previousKeyType is an operator, we want to replace the displayed number with clicked number
    const displayedNum = display.textContent;

    //If the key does not have a data-action attribute, it must be a number key
    if (!action) {
      if (
        displayedNum === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        // If the calculator shows 0, we want to replace the calculator’s display with the clicked key
        display.textContent = keyContent;
      } else {
        //If the calculator shows a non-zero number, we want to append the clicked key to the displayed number.
        display.textContent = displayedNum + keyContent; //update previousKeyType for each clicked key
      }
      console.log("number key!");
      calculator.dataset.previousKey = "number";
    }
    // If the key has a data-action that is either add, subtract, multiply or divide, we know the key is an operator.
    else if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;
      //check for firstValue and operator because secondValue always exists
      if (
        firstValue &&
        operator &&
        previousKeyType !== "operator" &&
        previousKeyType !== "calculate"
      ) {
        const calcValue = calculate(firstValue, operator, secondValue);
        display.textContent = calcValue;

        // Update calculated value as firstValue
        calculator.dataset.firstValue = calcValue;
      } else {
        // If there are no calculations, set displayedNum as the firstValue
        calculator.dataset.firstValue = displayedNum;
      }
      console.log("operator key!");
      //user hits an operator key, the operator should be highlighted so user knows the operator is active.
      key.classList.add("is-depressed");
      // Add custom attribute tell if the previous key is an operator key
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.firstValue = displayedNum;
      calculator.dataset.operator = action;
    }
    //If the key’s data-action is decimal, we know the user clicked on the decimal key.
    else if (action === "decimal") {
      //a decimal should appear on the display. If user hits any number after hitting a decimal key, the number should be appended on the display as well.
      console.log("decimal key!");
      //if the key’s data-action is clear, we know the user clicked on the clear (the one that says AC) key
      //also check is string has a dot do nothing if it does
      if (!displayedNum.includes(".")) {
        display.textContent = displayedNum + ".";
      } else if (
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        //check if the previous key is an operator. If it is, we want to replace the displayed number with 0.
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

      console.log("clear key!");
      calculator.dataset.previousKeyType = "clear";
    }
    // If the key’s data-action is calculate, we know the user clicked on the equals key.
    else if (action === "calculate") {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      if (firstValue) {
        if (previousKeyType === "calculate") {
          firstValue = displayedNum;
          secondValue = calculator.dataset.modValue;
        }
        display.textContent = calculate(firstValue, operator, secondValue);
      }
      //set modifier value carry forward the previous secondValue into the new calculation. For secondValue to persist to the next calculation, we need to store it in another custom attribute

      calculator.dataset.modValue = secondValue;
      calculator.dataset.previousKeyType = "calculate";
      console.log("equal key!");
    }
  }
});

const calculate = (n1, operator, n2) => {
  // Perform calculation and return calculated value
  let result = "";

  if (operator === "add") {
    result = parseFloat(n1) + parseFloat(n2);
  } else if (operator === "subtract") {
    result = parseFloat(n1) - parseFloat(n2);
  } else if (operator === "multiply") {
    result = parseFloat(n1) * parseFloat(n2);
  } else if (operator === "divide") {
    result = parseFloat(n1) / parseFloat(n2);
  }

  return result;
};
