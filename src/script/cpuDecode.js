import { activeComponentStyle } from "./cpuScript copy";
import { instructionExecute } from "./cpuInstructions";

let opcode = "";
let operand = "";

export const decode = (cir) => {
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
        description = {
          phase: "Decodificação",
          text: `O OPCODE ${opcode} encerra o programa.`,
        };
        break;
      case "0001":
        instructionExecute(addInstruction);
        description = {
          phase: "Decodificação",
          text: `O OPCODE ${opcode} significa SOMAR, ele vai somar o valor do registrador ACC com o valor que está armazenado no endereço de Memória especificado pelo OPERANDO.`,
        };
        break;
      case "0010":
        instructionExecute(subInstruction);
        description = {
          phase: "Decodificação",
          text: `O OPCODE ${opcode} significa SUBTRAIR, ele vai subtrair o valor do registrador ACC pelo valor que está armazenado no endereço de Memória especificado pelo OPERANDO.`,
        };
        break;
      case "0011":
        instructionExecute(storeInstruction);
        description = {
          phase: "Decodificação",
          text: `O OPCODE ${opcode} significa ARMAZENAR, ele vai armazenar o valor do registrador ACC no endereço de Memória especificado pelo OPERANDO.`,
        };
        break;
      case "0101":
        instructionExecute(loadInstruction);
        description = {
          phase: "Decodificação",
          text: `O OPCODE ${opcode} significa CARREGAR, ele vai carregar o valor da Memória que está no endereço especificado pelo OPERANDO e copia-ló para o registrador ACC.`,
        };
        break;
      case "0110":
        instructionExecute(jmpInstruction);
        description = {
          phase: "Decodificação",
          text: `O OPCODE ${opcode} significa PULAR, ele vai definir um novo endereço para o registrador PC. Desta forma, mudando a ordem das instruções.`,
        };
        break;
      case "0111":
        instructionExecute(jmpZeroInstruction);
        description = {
          phase: "Decodificação",
          text: `O OPCODE ${opcode} significa PULAR SE (zero). Se o valor do registrador ACC for igual a zero, então será definido um novo endereço para o registrador PC.`,
        };
        break;
      case "1000":
        instructionExecute(jmpNegativeInstruction);
        description = {
          phase: "Decodificação",
          text: `O OPCODE ${opcode} significa PULAR SE (negativo). Se o valor do registrador ACC for menor que zero, então será definido um novo endereço para o registrador PC.`,
        };
        break;
      case "1001":
        description = {
          phase: "Decodificação",
          text: `O OPCODE ${opcode} pode significar ENTRADA ou SAÍDA, tudo vai depender do OPERANDO.`,
        };
        operand === "0001" ? instructionExecute(inputInstruction) : false;
        operand === "0010" ? instructionExecute(outputInstruction) : false;
      default:
        return false;
    }
}