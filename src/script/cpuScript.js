import { descriptions } from "./phaseDescriptions";

export const blank = {
  "00000000": "00000000",
  "00000001": "00000000",
  "00000010": "00000000",
  "00000011": "00000000",
  "00000100": "00000000",
  "00000101": "00000000",
  "00000110": "00000000",
  "00000111": "00000000",
  "00001000": "00000000",
  "00001001": "00000000",
  "00001010": "00000000",
  "00001011": "00000000",
  "00001100": "00000000",
  "00001101": "00000000",
  "00001110": "00000000",
  "00001111": "00000000",
};
export const add = {
  "00000000": "10010001",
  "00000001": "00111111",
  "00000010": "10010001",
  "00000011": "00011111",
  "00000100": "10010010",
  "00000101": "00000000",
  "00000110": "00000000",
  "00000111": "00000000",
  "00001000": "00000000",
  "00001001": "00000000",
  "00001010": "00000000",
  "00001011": "00000000",
  "00001100": "00000000",
  "00001101": "00000000",
  "00001110": "00000000",
  "00001111": "00000000",
};
export const sub = {
  "00000000": "10010001",
  "00000001": "00111111",
  "00000010": "10010001",
  "00000011": "00101111",
  "00000100": "10010010",
  "00000101": "00000000",
  "00000110": "00000000",
  "00000111": "00000000",
  "00001000": "00000000",
  "00001001": "00000000",
  "00001010": "00000000",
  "00001011": "00000000",
  "00001100": "00000000",
  "00001101": "00000000",
  "00001110": "00000000",
  "00001111": "00000000",
};
export const biggest = {
  "00000000": "10010001",
  "00000001": "00111110",
  "00000010": "10010001",
  "00000011": "00111111",
  "00000100": "00101110",
  "00000101": "10001001",
  "00000110": "01011111",
  "00000111": "10010010",
  "00001000": "00000000",
  "00001001": "01011110",
  "00001010": "10010010",
  "00001011": "00000000",
  "00001100": "00000000",
  "00001101": "00000000",
  "00001110": "00000000",
  "00001111": "00000000",
};
export let programs = [add, sub, biggest];

export let memory = blank;

export const updateMemory = (newMemory) => {
  memory = newMemory;
};

export const chooseProgram = (index) => {
  memory = { ...programs[index] };
  clearCPU();
};

export let pc = "00000000";
export let mar = "00000000";
export let mdr = "00000000";
export let acc = "00000000";
export let cir = "00000000";
export let count = 0;
export let currentStep = 0;
export let opcode = "";
export let operand = "";
export let description = {};

export let main = [
  () => {
    mar = pc;

    activeComponentStyle(".mar", "focus");
    description = {
      phase: "Busca",
      text: "A Unidade de Controle copia o valor do registrador PC para o registrador MAR que envia o valor para o Barramento de Endereço, que funciona como uma interface entre a CPU e a Memória.",
    };
  },
  () => {
    activeComponentStyle(`#address-${mar}`, "focus");
    description = {
      phase: "Busca",
      text: "A Unidade de Controle sinaliza a Memória para fazer a leitura no endereço que está no Barramento de Endereço, carregar e armazenar esse valor no Barramento de Dados.",
    };
  },
  () => {
    mdr = memory[mar].padStart(8, "0");

    activeComponentStyle(".mdr", "focus");
    description = {
      phase: "Busca",
      text: "A Unidade de Controle copia o valor do Barramento de Dados para o registrador MDR. Ele atua como um intermediário em qualquer transferência de dados que envolva a Memória.",
    };
  },
  () => {
    cir = mdr;

    activeComponentStyle(".cir", "focus");
    description = {
      phase: "Busca",
      text: "A Unidade de Controle copia o valor do registrador MDR para o registrador de instrução CIR. O CIR armazena temporariamente a instrução que será decodificada e executada posteriormente.",
    };
  },
  () => {
    pc = count <= 15 ? toBinary((count = count + 1)) : toBinary((count = 0));

    activeComponentStyle(".pc", "focus");
    description = {
      phase: "Busca",
      text: "A Unidade de Controle incrementa o registrador PC para apontar para o próximo endereço de instrução na sequência, preparando-se para o ciclo de busca da próxima instrução",
    };
  },
  () => {
    activeComponentStyle(".decode-container", "focus");
    description = {
      phase: "Decodificação",
      text: `O Decodificador recebe o valor do registrador de instrução CIR, esse valor é quebrado ao meio e transformado em OPCODE e OPERANDO.`,
    };
  },
  () => decode(cir),
];

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

export function instructionExecute(array) {
  main = main.concat(array);
}

const search = [
  () => {
    mar = pc;

    activeComponentStyle(".mar", "focus");
    description = descriptions.fetchPcToMar;
  },
  () => {
    activeComponentStyle(`#address-${mar}`, "focus");
    description = descriptions.fetchReadMemoryCell;
  },
  () => {
    mdr = memory[mar].padStart(8, "0");

    activeComponentStyle(".mdr", "focus");
    description = descriptions.fetchMemoryDataToMdr;
  },
  () => {
    cir = mdr;

    activeComponentStyle(".cir", "focus");
    description = descriptions.fetchMdrToCir;
  },
  () => {
    pc = count <= 15 ? toBinary((count = count + 1)) : toBinary((count = 0));

    activeComponentStyle(".pc", "focus");
    description = descriptions.fetchPcIncrement;
  },
  () => {
    activeComponentStyle(".decode-container", "focus");
    description = descriptions.decodeCirToDecode;
  },
  () => decode(cir),
];

const addInstruction = [
  () => {
    mar = operand.padStart(8, "0");

    activeComponentStyle(".mar", "focus");

    description = descriptions.decodeOperandToMar;
  },
  () => {
    activeComponentStyle(`#address-${mar}`, "focus");

    description = descriptions.execMemoryCellToBus;
  },
  () => {
    mdr = memory[mar];

    activeComponentStyle(".mdr", "focus");

    description = descriptions.execMemoryDataToMdr;
  },
  () => {
    acc = toBinary(toDecimal(acc) + toDecimal(mdr));

    const aluElement = document.getElementById("alu");
    aluElement.classList.add("focus-alu");

    activeComponentStyle(".acc", "focus");

    description = descriptions.execAddResultToAcc;

    setTimeout(() => aluElement.classList.remove("focus-alu"), 600);
  },
  () => {
    instructionExecute(search);

    description = descriptions.checkForInterruptions;
  },
];

const subInstruction = [
  () => {
    mar = operand.padStart(8, "0");

    activeComponentStyle(".mar", "focus");

    description = descriptions.decodeOperandToMar;
  },
  () => {
    activeComponentStyle(`#address-${mar}`, "focus");

    description = descriptions.execMemoryCellToBus;
  },
  () => {
    mdr = memory[mar];

    activeComponentStyle(".mdr", "focus");

    description = descriptions.execMemoryDataToMdr;
  },
  () => {
    acc = toBinary(toDecimal(acc) - toDecimal(mdr));

    const aluElement = document.getElementById("alu");
    aluElement.classList.add("focus-alu");

    activeComponentStyle(".acc", "focus");

    description = descriptions.execSubResultToAcc;

    setTimeout(() => aluElement.classList.remove("focus-alu"), 600);
  },
  () => {
    instructionExecute(search);

    description = descriptions.checkForInterruptions;
  },
];

const storeInstruction = [
  () => {
    mar = operand.padStart(8, "0");

    activeComponentStyle(".mar", "focus");

    description = descriptions.decodeOperandToMar;
  },
  () => {
    mdr = acc;

    activeComponentStyle(".mdr", "focus");

    description = descriptions.execAccToMdr;
  },
  () => {
    memory[mar] = mdr;

    activeComponentStyle(`#address-${mar}`, "focus");

    description = descriptions.execMdrToMemoryCell;
  },
  () => {
    instructionExecute(search);

    description = descriptions.checkForInterruptions;
  },
];

const loadInstruction = [
  () => {
    mar = operand.padStart(8, "0");

    activeComponentStyle(".mar", "focus");

    description = descriptions.decodeOperandToMar;
  },
  () => {
    activeComponentStyle(`#address-${mar}`, "focus");

    description = descriptions.execReadMemoryCell;
  },
  () => {
    mdr = memory[mar];

    activeComponentStyle(".mdr", "focus");

    description = descriptions.execMemoryDataToMdr;
  },
  () => {
    acc = mdr;

    activeComponentStyle(".acc", "focus");

    description = descriptions.execMdrToAcc;
  },
  () => {
    instructionExecute(search);

    description = descriptions.checkForInterruptions;
  },
];

const inputInstruction = [
  () => {
    acc = toBinary(prompt("Informe um numero: (-127 a 127)"));

    activeComponentStyle(".acc", "focus");

    description = descriptions.decodeInput;
  },
  () => {
    instructionExecute(search);

    description = descriptions.checkForInterruptions;
  },
];

const outputInstruction = [
  () => {
    activeComponentStyle(".acc", "focus");
    alert(`OUTPUT => ${toDecimal(acc)}`);

    description = descriptions.decodeOutput;
  },
  () => {
    instructionExecute(search);

    description = descriptions.checkForInterruptions;
  },
];

const endInstruction = [
  () => {
    description = descriptions.execEnd;
    executeIsValid = false;
  },
];

const jmpInstruction = [
  () => {
    count = toDecimal(operand.padStart(8, "0"));
    pc = operand.padStart(8, "0");

    activeComponentStyle(".pc", "focus");

    description = descriptions.execJmp;
  },
  () => {
    instructionExecute(search);

    description = descriptions.checkForInterruptions;
  },
];

const jmpZeroInstruction = [
  () => {
    const aluElement = document.getElementById("alu");
    aluElement.classList.add("focus-alu");
    setTimeout(() => aluElement.classList.remove("focus-alu"), 600);

    if (acc == "00000000") {
      count = toDecimal(operand.padStart(8, "0"));
      pc = operand.padStart(8, "0");

      activeComponentStyle(".pc", "focus");
    }

    description = descriptions.execJmpZ;
  },
  () => {
    instructionExecute(search);

    description = descriptions.checkForInterruptions;
  },
];

const jmpNegativeInstruction = [
  () => {
    const aluElement = document.getElementById("alu");
    aluElement.classList.add("focus-alu");
    setTimeout(() => aluElement.classList.remove("focus-alu"), 600);

    if (toDecimal(acc) < 0) {
      count = toDecimal(operand.padStart(8, "0"));
      pc = operand.padStart(8, "0");

      activeComponentStyle(".pc", "focus");
    }

    description = descriptions.execJmpN;
  },
  () => {
    instructionExecute(search);

    description = descriptions.checkForInterruptions;
  },
];

const decode = (cir) => {
  opcode = cir.substring(0, 4);
  operand = cir.substring(4, 8);

  let getElementID = {
    "0000": "#end",
    "0001": "#add",
    "0010": "#sub",
    "0011": "#str",
    "0101": "#lod",
    "0110": "#jmp",
    "0111": "#jpz",
    1000: "#jpn",
    1001: operand == "0001" ? "#ipt" : "#opt",
  };

  activeComponentStyle(getElementID[opcode], "focus");

  switch (opcode) {
    case "0000":
      instructionExecute(endInstruction);
      description = descriptions.decodeEnd
      break;
    case "0001":
      instructionExecute(addInstruction);
      description = descriptions.decodeAdd
      break;
    case "0010":
      instructionExecute(subInstruction);
      description = descriptions.decodeSub
      break;
    case "0011":
      instructionExecute(storeInstruction);
      description = descriptions.decodeStore
      break;
    case "0101":
      instructionExecute(loadInstruction);
      description = descriptions.decodeLoad
      break;
    case "0110":
      instructionExecute(jmpInstruction);
      description = descriptions.decodeJmp
      break;
    case "0111":
      instructionExecute(jmpZeroInstruction);
      description = descriptions.decodeJmpZ
      break;
    case "1000":
      instructionExecute(jmpNegativeInstruction);
      description = descriptions.decodeJmpN
      break;
    case "1001":
      description = descriptions.decodeInOut
      operand === "0001" ? instructionExecute(inputInstruction) : false;
      operand === "0010" ? instructionExecute(outputInstruction) : false;
    default:
      return false;
  }
};

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

function activeComponentStyle(element, styleName) {
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
