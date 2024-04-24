import { phaseDescriptionsList } from "./phaseDescriptions";
import {
  makeAnimation,
  removeAllActiveComponentStyles,
} from "./animationCpuComponents";

let mainInstructionQueue = [];

let currentStep = 0;
let executeIsValid;

export const executeStepByStep = () => {
  if (executeIsValid !== undefined) {
    executeIsValid = undefined;
    clearCPU();
    alert("O PROGRAMA FOI ENCERRADO");
    return false;
  }

  if (currentStep < mainInstructionQueue.length) {
    executeIsValid = mainInstructionQueue[currentStep]();
    currentStep++;
  }

  return true;
};

export const clearCPU = () => {
  currentStep = 0;
  mainInstructionQueue = searchInstruction;

  pc = 0;
  mar = 0;
  mdr = 0;
  acc = 0;
  cir = 0;
  operand = 0;

  phaseDescription = {};

  removeAllActiveComponentStyles();
};

export const clearMemory = () => {
  memory = [...programs[0]];
};

export const switchProgram = (index) => {
  memory = [...programs[index]];
  clearCPU();
};

export const updateMemoryCell = (newValue) => {
  memory = [...newValue];
};

const programs = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [-111, 63, -111, 31, -110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [-111, 63, -111, 47, -110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [-111, 62, -111, 63, 46, -119, 95, -110, 0, 94, -110, 0, 0, 0, 0, 0],
];

export let memory = [...programs[0]];
export let pc = 0;
export let mar = 0;
export let mdr = 0;
export let acc = 0;
export let cir = 0;
export let phaseDescription = {};

let operand = 0;

const decode = (instruction) => {
  if (instruction === 0) {
    instructionExecute(endInstruction);
    makeAnimation("decode-end");
    phaseDescription = phaseDescriptionsList.decodeEnd;
  } else if (instruction >= 16 && instruction <= 31) {
    instructionExecute(addInstruction);
    makeAnimation("decode-add");
    phaseDescription = phaseDescriptionsList.decodeAdd;
    const add = 16;
    return instruction - add;
  } else if (instruction >= 32 && instruction <= 47) {
    instructionExecute(subInstruction);
    makeAnimation("decode-sub");
    phaseDescription = phaseDescriptionsList.decodeSub;
    const sub = 32;
    return instruction - sub;
  } else if (instruction >= 48 && instruction <= 63) {
    instructionExecute(storeInstruction);
    makeAnimation("decode-str");
    phaseDescription = phaseDescriptionsList.decodeStore;
    const store = 48;
    return instruction - store;
  } else if (instruction >= 80 && instruction <= 95) {
    instructionExecute(loadInstruction);
    makeAnimation("decode-lod");
    phaseDescription = phaseDescriptionsList.decodeLoad;
    const load = 80;
    return instruction - load;
  } else if (instruction >= 96 && instruction <= 111) {
    instructionExecute(jmpInstruction);
    makeAnimation("decode-jmp");
    phaseDescription = phaseDescriptionsList.decodeJmp;
    const jmp = 96;
    return instruction - jmp;
  } else if (instruction >= 112 && instruction <= 127) {
    instructionExecute(jmpZeroInstruction);
    makeAnimation("decode-jpz");
    phaseDescription = phaseDescriptionsList.decodeJmpZ;
    const jmpZ = 112;
    return instruction - jmpZ;
  } else if (instruction >= -128 && instruction <= -113) {
    instructionExecute(jmpNegativeInstruction);
    makeAnimation("decode-jpn");
    phaseDescription = phaseDescriptionsList.decodeJmpN;
    const jmpN = 128;
    return instruction - jmpN;
  } else if (instruction === -111 || instruction === -110) {
    phaseDescription = phaseDescriptionsList.decodeInOut;
    if (instruction + 111 === 0) {
      instructionExecute(inputInstruction);
      makeAnimation("decode-ipt");
    } else {
      instructionExecute(outputInstruction);
      makeAnimation("decode-opt");
    }
  } else {
    clearCPU();
    clearMemory();
    alert("ESTA INSTRUÇÃO É INVÁLIDA");
    return false;
  }
};

const searchInstruction = [
  () => {
    mar = pc;
    makeAnimation("mar");
    phaseDescription = phaseDescriptionsList.fetchPcToMar;
  },
  () => {
    if (pc > 15) {
      alert("ESTE ENDEREÇO DE MEMÓRIA É INVÁLIDO!")
      clearCPU()
      return false
    }
    makeAnimation(`address-${mar}`);
    phaseDescription = phaseDescriptionsList.fetchReadMemoryCell;
  },
  () => {
    mdr = memory[mar];
    makeAnimation("mdr");
    phaseDescription = phaseDescriptionsList.fetchMemoryDataToMdr;
  },
  () => {
    cir = mdr;
    makeAnimation("cir");
    phaseDescription = phaseDescriptionsList.fetchMdrToCir;
  },
  () => {
    pc++;
    makeAnimation("pc");
    phaseDescription = phaseDescriptionsList.fetchPcIncrement;
  },
  () => {
    makeAnimation("decode-container");
    phaseDescription = phaseDescriptionsList.decodeCirToDecode;
  },
  () => {
    operand = decode(cir);
  },
];

const addInstruction = [
  () => {
    mar = operand;
    makeAnimation("mar");
    phaseDescription = phaseDescriptionsList.decodeOperandToMar;
  },
  () => {
    makeAnimation(`address-${mar}`);
    phaseDescription = phaseDescriptionsList.execMemoryCellToBus;
  },
  () => {
    mdr = memory[mar];
    makeAnimation("mdr");
    phaseDescription = phaseDescriptionsList.execMemoryDataToMdr;
  },
  () => {
    acc += mdr;

    const aluElement = document.getElementById("alu");
    aluElement.classList.add("focus-alu");
    makeAnimation("acc");
    phaseDescription = phaseDescriptionsList.execAddResultToAcc;

    setTimeout(() => aluElement.classList.remove("focus-alu"), 600);
  },
  () => {
    instructionExecute(searchInstruction);
    phaseDescription = phaseDescriptionsList.checkForInterruptions;
  },
];

const subInstruction = [
  () => {
    mar = operand;

    makeAnimation("mar");

    phaseDescription = phaseDescriptionsList.decodeOperandToMar;
  },
  () => {
    makeAnimation(`address-${mar}`);

    phaseDescription = phaseDescriptionsList.execMemoryCellToBus;
  },
  () => {
    mdr = memory[mar];

    makeAnimation("mdr");

    phaseDescription = phaseDescriptionsList.execMemoryDataToMdr;
  },
  () => {
    acc += mdr;

    const aluElement = document.getElementById("alu");
    aluElement.classList.add("focus-alu");

    makeAnimation("acc");

    phaseDescription = phaseDescriptionsList.execSubResultToAcc;

    setTimeout(() => aluElement.classList.remove("focus-alu"), 600);
  },
  () => {
    instructionExecute(searchInstruction);

    phaseDescription = phaseDescriptionsList.checkForInterruptions;
  },
];

const storeInstruction = [
  () => {
    mar = operand;

    makeAnimation("mar");

    phaseDescription = phaseDescriptionsList.decodeOperandToMar;
  },
  () => {
    mdr = acc;

    makeAnimation("mdr");

    phaseDescription = phaseDescriptionsList.execAccToMdr;
  },
  () => {
    memory[mar] = mdr;

    makeAnimation(`address-${mar}`);

    phaseDescription = phaseDescriptionsList.execMdrToMemoryCell;
  },
  () => {
    instructionExecute(searchInstruction);

    phaseDescription = phaseDescriptionsList.checkForInterruptions;
  },
];

const loadInstruction = [
  () => {
    mar = operand;

    makeAnimation("mar");

    phaseDescription = phaseDescriptionsList.decodeOperandToMar;
  },
  () => {
    makeAnimation(`address-${mar}`);

    phaseDescription = phaseDescriptionsList.execReadMemoryCell;
  },
  () => {
    mdr = memory[mar];

    makeAnimation("mdr");

    phaseDescription = phaseDescriptionsList.execMemoryDataToMdr;
  },
  () => {
    acc = mdr;

    makeAnimation("acc");

    phaseDescription = phaseDescriptionsList.execMdrToAcc;
  },
  () => {
    instructionExecute(searchInstruction);

    phaseDescription = phaseDescriptionsList.checkForInterruptions;
  },
];

const inputInstruction = [
  () => {
    acc = Number(prompt("Informe um numero: (-127 a 127)"));

    makeAnimation("acc");

    phaseDescription = phaseDescriptionsList.decodeInput;
  },
  () => {
    instructionExecute(searchInstruction);

    phaseDescription = phaseDescriptionsList.checkForInterruptions;
  },
];

const outputInstruction = [
  () => {
    makeAnimation("acc");
    alert(`OUTPUT: ${acc}`);

    phaseDescription = phaseDescriptionsList.decodeOutput;
  },
  () => {
    instructionExecute(searchInstruction);

    phaseDescription = phaseDescriptionsList.checkForInterruptions;
  },
];

const endInstruction = [
  () => {
    phaseDescription = phaseDescriptionsList.execEnd;
    const endProgram = false;
    return endProgram;
  },
];

const jmpInstruction = [
  () => {
    pc = operand;

    makeAnimation("pc");

    phaseDescription = phaseDescriptionsList.execJmp;
  },
  () => {
    instructionExecute(searchInstruction);

    phaseDescription = phaseDescriptionsList.checkForInterruptions;
  },
];

const jmpZeroInstruction = [
  () => {
    const aluElement = document.getElementById("alu");
    aluElement.classList.add("focus-alu");
    setTimeout(() => aluElement.classList.remove("focus-alu"), 600);

    if (acc === 0) {
      pc = operand;

      makeAnimation("pc");
    }

    phaseDescription = phaseDescriptionsList.execJmpZ;
  },
  () => {
    instructionExecute(searchInstruction);

    phaseDescription = phaseDescriptionsList.checkForInterruptions;
  },
];

const jmpNegativeInstruction = [
  () => {
    const aluElement = document.getElementById("alu");
    aluElement.classList.add("focus-alu");
    setTimeout(() => aluElement.classList.remove("focus-alu"), 600);

    if (acc < 0) {
      pc = operand;

      makeAnimation("pc");
    }

    phaseDescription = phaseDescriptionsList.execJmpN;
  },
  () => {
    instructionExecute(searchInstruction);

    phaseDescription = phaseDescriptionsList.checkForInterruptions;
  },
];

const instructionExecute = (array) => {
  mainInstructionQueue = mainInstructionQueue.concat(array);
};

mainInstructionQueue = [...searchInstruction];
