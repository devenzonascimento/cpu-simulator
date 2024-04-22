import { createContext, useContext } from "react";

import useRegister from "./useRegister copy";
import useMemory from "./useMemory";
import {
  executeStepByStep,
  pc,
  mar,
  mdr,
  acc,
  cir,
  memory,
} from "../script/cpuInstructions";

export const CpuContext = createContext();

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

  const { memoryValue, updateMemory } = useMemory();

  const handleExecution = () => {
    executeStepByStep();
    updatePc(pc);
    updateMar(mar);
    updateMdr(mdr);
    updateAcc(acc);
    updateCir(cir);
    updateMemory(memory);
  };

  function toBinary(num) {
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

  return (
    <CpuContext.Provider
      value={{
        handleExecution,
        memoryValue,
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
