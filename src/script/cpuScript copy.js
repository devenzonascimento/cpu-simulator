import { main } from "./cpuInstructions";


export let count = 0;
export let currentStep = 0;



let executeIsValid = true;
export const executeNextStep = () => {
  if (!executeIsValid) {
    executeIsValid = true;
    clearCPU();
    alert("O PROGRAMA FOI ENCERRADO");
    return false;
  }

  if (currentStep < main.length) {
    main[currentStep]();
    currentStep++;
  }

  return true;
};

export const instructionExecute = (array) => {
  main = main.concat(array);
}


export function clearCPU() {
  currentStep = 0;
  main = search;
  pc = "00000000";
  mar = "00000000";
  mdr = "00000000";
  acc = "00000000";
  cir = "00000000";
  count = 0;
  opcode = "";
  operand = "";
  description = {};
  removeAllActiveComponentStyles();
}
export function clearMemory() {
  memory = blank;
}

export function toBinary(num) {
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
}

export function toDecimal(num) {
  const decimal = parseInt(num, 2);

  if (num.charAt(0) === "1") {
    return decimal - 256;
  }

  return decimal;
}

let previous = {
  element: "",
  style: "",
};

export function activeComponentStyle(element, styleName) {
  previous.element && previous.element.classList.remove(previous.style);

  const focusElement = document.querySelector(element);

  if (focusElement) {
    focusElement.classList.add(styleName);
    previous.element = focusElement;
    previous.style = styleName;
  } else {
    console.error("O elemento não foi encontrado.");
  }
}

function removeAllActiveComponentStyles() {
  const arrayElementClass = [
    ".register-container",
    ".ram-input",
    ".instruction-row",
    ".decode-container",
  ];

  for (let i = 0; i < arrayElementClass.length; i++) {
    document.querySelectorAll(arrayElementClass[i]).forEach((element) => {
      element.classList.remove("focus");
    });
  }

  document.querySelector("#alu").classList.remove("focus-alu");
}


  /*for (let i = -128; i < 128; i++) console.log(`${i} => ${toBinary(i)}`)
  let arr = [];
  for (let value of Object.values(biggest)) {
    arr.push(toDecimal(value))
  }

  console.log(arr)



  // ADD 16 to 31
  // SUB 32 to 47
  // STORE 48 to 63
  // LOAD 64 to 79
  
  // INPUT -111
  // OUTPUT -110 */