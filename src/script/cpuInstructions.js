import { descriptions } from "./phaseDescriptions";
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

  description = {};

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
export let description = {};

let operand = 0;

const decode = (instruction) => {
  if (instruction === 0) {
    instructionExecute(endInstruction);
    makeAnimation("decode-end");
    description = descriptions.decodeEnd;
  } else if (instruction >= 16 && instruction <= 31) {
    instructionExecute(addInstruction);
    makeAnimation("decode-add");
    description = descriptions.decodeAdd;
    const add = 16;
    return instruction - add;
  } else if (instruction >= 32 && instruction <= 47) {
    instructionExecute(subInstruction);
    makeAnimation("decode-sub");
    description = descriptions.decodeSub;
    const sub = 32;
    return instruction - sub;
  } else if (instruction >= 48 && instruction <= 63) {
    instructionExecute(storeInstruction);
    makeAnimation("decode-str");
    description = descriptions.decodeStore;
    const store = 48;
    return instruction - store;
  } else if (instruction >= 80 && instruction <= 95) {
    instructionExecute(loadInstruction);
    makeAnimation("decode-lod");
    description = descriptions.decodeLoad;
    const load = 80;
    return instruction - load;
  } else if (instruction >= 96 && instruction <= 111) {
    instructionExecute(jmpInstruction);
    makeAnimation("decode-jmp");
    description = descriptions.decodeJmp;
    const jmp = 96;
    return instruction - jmp;
  } else if (instruction >= 112 && instruction <= 127) {
    instructionExecute(jmpZeroInstruction);
    makeAnimation("decode-jpz");
    description = descriptions.decodeJmpZ;
    const jmpZ = 112;
    return instruction - jmpZ;
  } else if (instruction >= -128 && instruction <= -113) {
    instructionExecute(jmpNegativeInstruction);
    makeAnimation("decode-jpn");
    description = descriptions.decodeJmpN;
    const jmpN = 128;
    return instruction - jmpN;
  } else if (instruction === -111 || instruction === -110) {
    description = descriptions.decodeInOut;
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
    description = descriptions.fetchPcToMar;
  },
  () => {
    if (pc > 15) {
      alert("ESTE ENDEREÇO DE MEMÓRIA É INVÁLIDO!")
      clearCPU()
      return false
    }
    makeAnimation(`address-${mar}`);
    description = descriptions.fetchReadMemoryCell;
  },
  () => {
    mdr = memory[mar];
    makeAnimation("mdr");
    description = descriptions.fetchMemoryDataToMdr;
  },
  () => {
    cir = mdr;
    makeAnimation("cir");
    description = descriptions.fetchMdrToCir;
  },
  () => {
    pc++;
    makeAnimation("pc");
    description = descriptions.fetchPcIncrement;
  },
  () => {
    makeAnimation("decode-container");
    description = descriptions.decodeCirToDecode;
  },
  () => {
    operand = decode(cir);
  },
];

const addInstruction = [
  () => {
    mar = operand;
    makeAnimation("mar");
    description = descriptions.decodeOperandToMar;
  },
  () => {
    makeAnimation(`address-${mar}`);
    description = descriptions.execMemoryCellToBus;
  },
  () => {
    mdr = memory[mar];
    makeAnimation("mdr");
    description = descriptions.execMemoryDataToMdr;
  },
  () => {
    acc += mdr;

    const aluElement = document.getElementById("alu");
    aluElement.classList.add("focus-alu");
    makeAnimation("acc");
    description = descriptions.execAddResultToAcc;

    setTimeout(() => aluElement.classList.remove("focus-alu"), 600);
  },
  () => {
    instructionExecute(searchInstruction);
    description = descriptions.checkForInterruptions;
  },
];

const subInstruction = [
  () => {
    mar = operand;

    makeAnimation("mar");

    description = descriptions.decodeOperandToMar;
  },
  () => {
    makeAnimation(`address-${mar}`);

    description = descriptions.execMemoryCellToBus;
  },
  () => {
    mdr = memory[mar];

    makeAnimation("mdr");

    description = descriptions.execMemoryDataToMdr;
  },
  () => {
    acc += mdr;

    const aluElement = document.getElementById("alu");
    aluElement.classList.add("focus-alu");

    makeAnimation("acc");

    description = descriptions.execSubResultToAcc;

    setTimeout(() => aluElement.classList.remove("focus-alu"), 600);
  },
  () => {
    instructionExecute(searchInstruction);

    description = descriptions.checkForInterruptions;
  },
];

const storeInstruction = [
  () => {
    mar = operand;

    makeAnimation("mar");

    description = descriptions.decodeOperandToMar;
  },
  () => {
    mdr = acc;

    makeAnimation("mdr");

    description = descriptions.execAccToMdr;
  },
  () => {
    memory[mar] = mdr;

    makeAnimation(`address-${mar}`);

    description = descriptions.execMdrToMemoryCell;
  },
  () => {
    instructionExecute(searchInstruction);

    description = descriptions.checkForInterruptions;
  },
];

const loadInstruction = [
  () => {
    mar = operand;

    makeAnimation("mar");

    description = descriptions.decodeOperandToMar;
  },
  () => {
    makeAnimation(`address-${mar}`);

    description = descriptions.execReadMemoryCell;
  },
  () => {
    mdr = memory[mar];

    makeAnimation("mdr");

    description = descriptions.execMemoryDataToMdr;
  },
  () => {
    acc = mdr;

    makeAnimation("acc");

    description = descriptions.execMdrToAcc;
  },
  () => {
    instructionExecute(searchInstruction);

    description = descriptions.checkForInterruptions;
  },
];

const inputInstruction = [
  () => {
    acc = Number(prompt("Informe um numero: (-127 a 127)"));

    makeAnimation("acc");

    description = descriptions.decodeInput;
  },
  () => {
    instructionExecute(searchInstruction);

    description = descriptions.checkForInterruptions;
  },
];

const outputInstruction = [
  () => {
    makeAnimation("acc");
    alert(`OUTPUT: ${acc}`);

    description = descriptions.decodeOutput;
  },
  () => {
    instructionExecute(searchInstruction);

    description = descriptions.checkForInterruptions;
  },
];

const endInstruction = [
  () => {
    description = descriptions.execEnd;
    const endProgram = false;
    return endProgram;
  },
];

const jmpInstruction = [
  () => {
    pc = operand;

    makeAnimation("pc");

    description = descriptions.execJmp;
  },
  () => {
    instructionExecute(searchInstruction);

    description = descriptions.checkForInterruptions;
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

    description = descriptions.execJmpZ;
  },
  () => {
    instructionExecute(searchInstruction);

    description = descriptions.checkForInterruptions;
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

    description = descriptions.execJmpN;
  },
  () => {
    instructionExecute(searchInstruction);

    description = descriptions.checkForInterruptions;
  },
];

const instructionExecute = (array) => {
  mainInstructionQueue = mainInstructionQueue.concat(array);
};

mainInstructionQueue = [...searchInstruction];
