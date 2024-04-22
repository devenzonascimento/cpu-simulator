import { createContext, useContext, useState } from "react";

import { descriptions } from "../script/phaseDescriptions";
import {
  makeAnimation,
  removeAllActiveComponentStyles,
} from "../script/animationCpuComponents";

import useRegister from "./useRegister copy";

export const CpuContext = createContext();
let main = []

export const CpuProvider = ({ children }) => {
  const {
    pcValue,
    marValue,
    mdrValue,
    accValue,
    cirValue,
    updatePc,
    updateMar,
    updateMdr,
    updateAcc,
    updateCir,
  } = useRegister();
  const [currentStep, setCurrentStep] = useState(0)

  
  let executeIsValid;
  const executeStepByStep = () => {

    if (currentStep == 0) {
      instructionExecute(searchInstruction)
    }

    if (executeIsValid !== undefined) {
      executeIsValid = undefined;
      resetCPU();
      alert("O PROGRAMA FOI ENCERRADO");
      return false;
    }

    if (currentStep < main.length) {
      executeIsValid = main[currentStep]();
      setCurrentStep(prev => prev + 1)
    }

    return true;
  };

  const resetCPU = () => {
    currentStep = 0;
    main = searchInstruction;
    updatePc(0);
    updateMar(0);
    updateMdr(0);
    updateAcc(0);
    updateCir(0);
    operand = 0;
    description = {};
    removeAllActiveComponentStyles();
  };

  const blank = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const add = [-111, 63, -111, 31, -110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const sub = [-111, 63, -111, 47, -110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const biggest = [
    -111, 62, -111, 63, 46, -119, 95, -110, 0, 94, -110, 0, 0, 0, 0, 0,
  ];

  let memory = add;
  let description = {};

  let operand = 0;

  const decode = (instruction) => {
    console.log("entro")
    if (instruction === 0) {
      instructionExecute(endInstruction);
      description = descriptions.decodeEnd;
    } else if (instruction >= 16 && instruction <= 31) {
      instructionExecute(addInstruction);
      description = descriptions.decodeAdd;
      const add = 16;
      return instruction - add;
    } else if (instruction >= 32 && instruction <= 47) {
      instructionExecute(subInstruction);
      description = descriptions.decodeSub;
      const sub = 32;
      return instruction - sub;
    } else if (instruction >= 48 && instruction <= 63) {
      instructionExecute(storeInstruction);
      description = descriptions.decodeStore;
      const store = 48;
      return instruction - store;
    } else if (instruction >= 80 && instruction <= 95) {
      instructionExecute(loadInstruction);
      description = descriptions.decodeLoad;
      const load = 80;
      return instruction - load;
    } else if (instruction >= 96 && instruction <= 111) {
      instructionExecute(jmpInstruction);
      description = descriptions.decodeJmp;
      const jmp = 96;
      return instruction - jmp;
    } else if (instruction >= 112 && instruction <= 127) {
      instructionExecute(jmpZeroInstruction);
      description = descriptions.decodeJmpZ;
      const jmpZ = 112;
      return instruction - jmpZ;
    } else if (instruction >= -128 && instruction <= -113) {
      instructionExecute(jmpNegativeInstruction);
      description = descriptions.decodeJmpN;
      const jmpN = 128;
      return instruction - jmpN;
    } else if (instruction === -111 || instruction === -110) {
      description = descriptions.decodeInOut;
      instruction + 110
        ? instructionExecute(inputInstruction)
        : instructionExecute(outputInstruction);
    } else {
      return false;
    }
  };

  const searchInstruction = [
    () => {
      console.log("passo1")
      updateMar(pcValue);
      makeAnimation("mar");
      description = descriptions.fetchPcToMar;
    },
    () => {
      console.log("passo2")
      //makeAnimation(`#address-${mar}`, "focus");
      description = descriptions.fetchReadMemoryCell;
    },
    () => {
      console.log("passo3")
      updateMdr(memory[marValue]);
      makeAnimation("mdr");
      description = descriptions.fetchMemoryDataToMdr;
    },
    () => {
      console.log("passo4")
      updateCir(mdrValue);
      makeAnimation("cir");
      description = descriptions.fetchMdrToCir;
    },
    () => {
      console.log("passo5")
      if (pcValue <= 15) updatePc((prev) => prev + 1);
      makeAnimation("pc");
      description = descriptions.fetchPcIncrement;
    },
    () => {
      console.log("passo6")
      makeAnimation("decode-container");
      description = descriptions.decodeCirToDecode;
    },
    () => {
      operand = decode(cirValue);
    },
  ];

  const addInstruction = [
    () => {
      updateMar(operand);
      makeAnimation("mar");
      description = descriptions.decodeOperandToMar;
    },
    () => {
      //makeAnimation(`#address-${marValue}`, "focus");
      description = descriptions.execMemoryCellToBus;
    },
    () => {
      updateMdr(memory[marValue]);
      makeAnimation("mdr");
      description = descriptions.execMemoryDataToMdr;
    },
    () => {
      updateAcc(accValue + mdrValue);
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
      updateMar(operand);
      makeAnimation("mar");
      description = descriptions.decodeOperandToMar;
    },
    () => {
      //makeAnimation(`#address-${marValue}`, "focus");
      description = descriptions.execMemoryCellToBus;
    },
    () => {
      updateMdr(memory[marValue]);
      makeAnimation("mdr");
      description = descriptions.execMemoryDataToMdr;
    },
    () => {
      updateAcc(accValue - mdrValue);
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
      updateMar(operand);
      makeAnimation("mar");
      description = descriptions.decodeOperandToMar;
    },
    () => {
      updateMdr(accValue);
      makeAnimation("mdr");
      description = descriptions.execAccToMdr;
    },
    () => {
      memory[marValue] = mdrValue;
      //makeAnimation(`#address-${marValue}`, "focus");
      description = descriptions.execMdrToMemoryCell;
    },
    () => {
      instructionExecute(searchInstruction);
      description = descriptions.checkForInterruptions;
    },
  ];

  const loadInstruction = [
    () => {
      updateMar(operand);
      makeAnimation("mar");
      description = descriptions.decodeOperandToMar;
    },
    () => {
      //makeAnimation(`#address-${marValue}`, "focus");
      description = descriptions.execReadMemoryCell;
    },
    () => {
      updateMdr(memory[marValue]);
      makeAnimation("mdr");
      description = descriptions.execMemoryDataToMdr;
    },
    () => {
      updateAcc(mdrValue);
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
      const value = prompt("Informe um numero: (-127 a 127)");
      updateAcc(value);
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
      alert(`OUTPUT: ${accValue}`);
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
      updatePc(operand);
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

      if (accValue === 0) {
        updatePc(operand);
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

      if (accValue < 0) {
        updatePc(operand);
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
    console.log("antes", main)
    main = main.concat(array);
    console.log("depois", main)
  };

  //console.log(pcValue);
  //console.log(marValue);
  //console.log(mdrValue);
  //console.log(accValue);
  //console.log(cirValue);
  //prompt("Oi")
  console.log(currentStep);













  return (
    <CpuContext.Provider
      value={{
        executeStepByStep,
        pcValue,
        marValue,
        mdrValue,
        accValue,
        cirValue,
      }}
    >
      {children}
    </CpuContext.Provider>
  );
};

export const useCpu = () => {
  const context = useContext(CpuContext);
  return context;
};

/*

END 0 => 00000000

ADD 16 => 00010000
ADD 17 => 00010001
ADD 18 => 00010010
ADD 19 => 00010011
ADD 20 => 00010100
ADD 21 => 00010101
ADD 22 => 00010110
ADD 23 => 00010111
ADD 24 => 00011000
ADD 25 => 00011001
ADD 26 => 00011010
ADD 27 => 00011011
ADD 28 => 00011100
ADD 29 => 00011101
ADD 30 => 00011110
ADD 31 => 00011111

SUB 32 => 00100000
SUB 33 => 00100001
SUB 34 => 00100010
SUB 35 => 00100011
SUB 36 => 00100100
SUB 37 => 00100101
SUB 38 => 00100110
SUB 39 => 00100111
SUB 40 => 00101000
SUB 41 => 00101001
SUB 42 => 00101010
SUB 43 => 00101011
SUB 44 => 00101100
SUB 45 => 00101101
SUB 46 => 00101110
SUB 47 => 00101111

STORE 48 => 00110000
STORE 49 => 00110001
STORE 50 => 00110010
STORE 51 => 00110011
STORE 52 => 00110100
STORE 53 => 00110101
STORE 54 => 00110110
STORE 55 => 00110111
STORE 56 => 00111000
STORE 57 => 00111001
STORE 58 => 00111010
STORE 59 => 00111011
STORE 60 => 00111100
STORE 61 => 00111101
STORE 62 => 00111110
STORE 63 => 00111111

LOAD 80 => 01010000
LOAD 81 => 01010001
LOAD 82 => 01010010
LOAD 83 => 01010011
LOAD 84 => 01010100
LOAD 85 => 01010101
LOAD 86 => 01010110
LOAD 87 => 01010111
LOAD 88 => 01011000
LOAD 89 => 01011001
LOAD 90 => 01011010
LOAD 91 => 01011011
LOAD 92 => 01011100
LOAD 93 => 01011101
LOAD 94 => 01011110
LOAD 95 => 01011111

JUMP 96 => 01100000
JUMP 97 => 01100001
JUMP 98 => 01100010
JUMP 99 => 01100011
JUMP 100 => 01100100
JUMP 101 => 01100101
JUMP 102 => 01100110
JUMP 103 => 01100111
JUMP 104 => 01101000
JUMP 105 => 01101001
JUMP 106 => 01101010
JUMP 107 => 01101011
JUMP 108 => 01101100
JUMP 109 => 01101101
JUMP 110 => 01101110
JUMP 111 => 01101111

JUMP Z 112 => 01110000
JUMP Z 113 => 01110001
JUMP Z 114 => 01110010
JUMP Z 115 => 01110011
JUMP Z 116 => 01110100
JUMP Z 117 => 01110101
JUMP Z 118 => 01110110
JUMP Z 119 => 01110111
JUMP Z 120 => 01111000
JUMP Z 121 => 01111001
JUMP Z 122 => 01111010
JUMP Z 123 => 01111011
JUMP Z 124 => 01111100
JUMP Z 125 => 01111101
JUMP Z 126 => 01111110
JUMP Z 127 => 01111111

JUMP N -128 => 10000000
JUMP N -127 => 10000001
JUMP N -126 => 10000010
JUMP N -125 => 10000011
JUMP N -124 => 10000100
JUMP N -123 => 10000101
JUMP N -122 => 10000110
JUMP N -121 => 10000111
JUMP N -120 => 10001000
JUMP N -119 => 10001001
JUMP N -118 => 10001010
JUMP N -117 => 10001011
JUMP N -116 => 10001100
JUMP N -115 => 10001101
JUMP N -114 => 10001110
JUMP N -113 => 10001111

INPUT -111 => 10010001

OUTPUT -110 => 10010010
*/
