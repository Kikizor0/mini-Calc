"use strict";
let resultEl = document.getElementById("final-result");
let inputtEl = document.getElementById("current-input");
let numberBtns = document.querySelectorAll(".number-btn");
let symbolBtns = document.querySelectorAll(".symbol-btn");
let additonBtn = document.getElementById("addition");
let multiplyBtn = document.getElementById("multiply");
let subtractBtn = document.getElementById("subtract");
let resetBtn = document.getElementById("clear");
let divideBtn = document.getElementById("divide");
let equallBtn = document.getElementById("equall");

let totalResult;
let allInputs = [];
let tempNumber = [];
let currentNumber = 0;
let currentOperation = 0;
let bugFix = false;

function setNumber() {
  if (tempNumber.length > 0) {
    let numberAfterConcat = "";
    for (let numb of tempNumber) {
      numberAfterConcat += numb;
    }
    currentNumber = +numberAfterConcat;
    tempNumber = [];
  }
}

// Change Input
function showInputs() {
  let input = "";
  for (let i of allInputs) {
    if (i !== "=") input += i;
  }
  inputtEl.textContent = input;
}

// operation functions
function addition() {
  if (!bugFix) {
    switch (currentOperation) {
      case 2:
        subtract();
        break;
      case 3:
        divide();
        break;
      case 4:
        multiply();
        break;
    }
  }
  currentOperation = 1;
  totalResult = isNaN(totalResult) ? 0 : totalResult;
  currentNumber = isNaN(currentNumber) ? 0 : currentNumber;
  totalResult += currentNumber;
  currentNumber = undefined;
  resultEl.textContent = totalResult;
}
function subtract() {
  if (!bugFix) {
    switch (currentOperation) {
      case 1:
        addition();
        break;
      case 3:
        divide();
        break;
      case 4:
        multiply();
        break;
    }
  }
  currentOperation = 2;
  totalResult = isNaN(totalResult) ? currentNumber * 2 : totalResult;
  currentNumber = isNaN(currentNumber) ? 0 : currentNumber;
  totalResult -= currentNumber;
  currentNumber = undefined;
  resultEl.textContent = totalResult;
}

function multiply() {
  if (!bugFix) {
    switch (currentOperation) {
      case 1:
        addition();
        break;
      case 2:
        subtract();
        break;
      case 3:
        divide();
        break;
    }
  }
  currentOperation = 4;
  totalResult = isNaN(totalResult) ? 1 : totalResult;
  currentNumber = isNaN(currentNumber) ? 1 : currentNumber;
  totalResult *= currentNumber;
  currentNumber = undefined;
  resultEl.textContent = totalResult;
}
function divide() {
  if (!bugFix) {
    switch (currentOperation) {
      case 1:
        addition();
        break;
      case 2:
        subtract();
        break;
      case 4:
        multiply();
        break;
    }
  }
  currentOperation = 3;
  totalResult = isNaN(totalResult) ? currentNumber ** 2 : totalResult;
  currentNumber = isNaN(currentNumber) ? 1 : currentNumber;
  totalResult /= currentNumber;
  currentNumber = undefined;
  resultEl.textContent = totalResult;
}

function reset() {
  totalResult = undefined;
  allInputs = [];
  tempNumber = [];
  currentNumber = 0;
  currentOperation = 0;
  console.log(`cleared`);
  resultEl.textContent = 0;
  inputtEl.textContent = 0;
}

function equallNow() {
  switch (currentOperation) {
    case 1:
      return addition();
    case 2:
      return subtract();
    case 3:
      return divide();
    case 4:
      return multiply();
  }
}

// ------------------

for (let btn of numberBtns) {
  btn.addEventListener("click", () => {
    tempNumber.push(btn.textContent);
    allInputs.push(btn.textContent);

    showInputs();
  });
}

for (let btn of symbolBtns) {
  btn.addEventListener("click", () => {
    setNumber();
    allInputs.push(btn.textContent);
    showInputs();
  });
}

// operators buttons
additonBtn.addEventListener("click", () => {
  addition();
});
multiplyBtn.addEventListener("click", () => {
  multiply();
});
subtractBtn.addEventListener("click", () => {
  subtract();
});
divideBtn.addEventListener("click", () => {
  divide();
});
resetBtn.addEventListener("click", () => {
  reset();
});
equall.addEventListener("click", () => {
  bugFix = true;
  equallNow();
  bugFix = false;
});

// keyEvents
document.addEventListener("keydown", (e) => {
  if (e.key === "+") {
    document.getElementById("addition").click();
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "-") {
    document.getElementById("subtract").click();
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "/") {
    document.getElementById("divide").click();
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "*") {
    document.getElementById("multiply").click();
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "=" || e.key === "Enter") {
    document.getElementById("equall").click();
  }
});
document.addEventListener("keydown", (e) => {
  numberClick(e.key);
});

function numberClick(e) {
  if (
    e === "." ||
    e === "1" ||
    e === "2" ||
    e === "3" ||
    e === "4" ||
    e === "5" ||
    e === "6" ||
    e === "7" ||
    e === "8" ||
    e === "9" ||
    e === "0"
  ) {
    document.getElementById(`${e}`).click();
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Backspace") {
    allInputs.pop();
    tempNumber.pop();
    showInputs();
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Delete") {
    reset();
  }
});
