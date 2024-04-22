import { main, clearCPU } from "./cpuInstructions";

let currentStep = 0;
let executeIsValid;

export const executeStepByStep = () => {
  if (executeIsValid !== undefined) {
    executeIsValid = undefined;
    resetCPU();
    alert("O PROGRAMA FOI ENCERRADO");
    return false;
  }

  if (currentStep < main.length) {
    executeIsValid = main[currentStep]();
    currentStep++;
  }

  return true;
};

export const resetCPU = () => {
  currentStep = 0;
  clearCPU();
};

export const toBinary = (num) => {
  const isNegative = num < 0;

  if (isNegative) {
    const binaryUnsigned = Number(Math.abs(num)).toString(2).padStart(8, "0");

    const complement = binaryUnsigned
      .split("")
      .map((bit) => (bit === "0" ? "1" : "0"))
      .join("");
    num = parseInt(complement, 2) + 1;
  }

  return Number(num).toString(2).padStart(8, "0");
};

export const toDecimal = (num) => {
  const decimal = parseInt(num, 2);

  if (num.charAt(0) === "1") {
    return decimal - 256;
  }

  return decimal;
};
