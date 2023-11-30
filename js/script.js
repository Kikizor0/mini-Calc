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
  currentOperation = 1;
  totalResult = isNaN(totalResult) ? 0 : totalResult;
  currentNumber = isNaN(currentNumber) ? 0 : currentNumber;
  totalResult += currentNumber;
  currentNumber = undefined;
  resultEl.textContent = totalResult;
}
function subtract() {
  currentOperation = 2;
  totalResult = isNaN(totalResult) ? currentNumber * 2 : totalResult;
  currentNumber = isNaN(currentNumber) ? 0 : currentNumber;
  totalResult -= currentNumber;
  currentNumber = undefined;
  resultEl.textContent = totalResult;
}

function multiply() {
  currentOperation = 4;
  totalResult = isNaN(totalResult) ? 1 : totalResult;
  currentNumber = isNaN(currentNumber) ? 1 : currentNumber;
  totalResult *= currentNumber;
  currentNumber = undefined;
  resultEl.textContent = totalResult;
}
function divide() {
  currentOperation = 3;
  totalResult = isNaN(totalResult) ? currentNumber ** 2 : totalResult;
  currentNumber = isNaN(currentNumber) ? 1 : currentNumber;
  totalResult /= currentNumber;
  currentNumber = undefined;
  resultEl.textContent = totalResult;
}

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
  totalResult = undefined;
  allInputs = [];
  tempNumber = [];
  currentNumber = 0;
  currentOperation = 0;
  console.log(`cleared`);
  resultEl.textContent = 0;
  inputtEl.textContent = 0;
});
equall.addEventListener("click", () => {
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
    case 4:
      multiply();
      break;
  }
});
