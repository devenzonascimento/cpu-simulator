import { pc } from "../../script/cpuScript";

let memory = {
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
}

let contador = 0
let opcode = "";
let operand = "";
let currentStep = 0;
function executarProximoPasso(operationStep) {
  if (currentStep < operationStep.length) {
      operationStep[currentStep]();
      currentStep++
  }
}
const search = [
  () => pcValue.textContent = toBinary(contador),
  () => marValue.textContent = pcValue.textContent,
  () => mdrValue.textContent = memory[marValue.textContent],
  () => cirValue.textContent = mdrValue.textContent,
  () => pcValue.textContent = toBinary(contador+=1),
  () => decode(cirValue.textContent),
];
function instructionExecute(array) {
  main = main.concat(array)
}
let main = [
  () => instructionExecute(search)
];


function decode(cirValue) {

  opcode = cirValue.substring(0, 4)
  operand = cirValue.substring(4, 8)

  switch (opcode) {
      case "0000":
          return false

      case "0001":
          instructionExecute(addInstruction)
          break;

      case "0010":
          instructionExecute(subInstruction)
          break;
      case "0011":
          instructionExecute(storeInstruction)
          break;
      case "0101":
          instructionExecute(loadInstruction)
          break;
      case "0110":
          instructionExecute(jmpInstruction)
          break;
      case "1001":
          operand === "0001" ? instructionExecute(inputInstruction) : false
          operand === "0010" ? instructionExecute(outputInstruction) : false

      default:
          return true;
  }
}

const addInstruction = [
  () => marValue.textContent = operand.padStart(8, '0'),
  () => mdrValue.textContent = memory[marValue.textContent],
  () => accValue.textContent = toBinary(toDecimal(accValue.textContent) + toDecimal(mdrValue.textContent)),
  () => instructionExecute(search)
];

const subInstruction = [
  () => marValue.textContent = operand.padStart(8, '0'),
  () => mdrValue.textContent = memory[marValue.textContent],
  () => accValue.textContent = toBinary(toDecimal(accValue.textContent) - toDecimal(mdrValue.textContent)),
  () => instructionExecute(search)
];

const storeInstruction = [
  () => marValue.textContent = operand.padStart(8, '0'),
  () => memory[marValue.textContent] = accValue.textContent,
  () => instructionExecute(search)
]

const loadInstruction = [
  () => marValue.textContent = operand.padStart(8, '0'),
  () => mdrValue.textContent = memory[marValue.textContent],
  () => accValue.textContent = mdrValue.textContent,
  () => instructionExecute(search)
]

const inputInstruction = [
  () => accValue.textContent = toBinary(prompt("Informe um valor")),
  () => instructionExecute(search)
]

const outputInstruction = [
  () => alert(accValue.textContent),
  () => instructionExecute(search)
]

const jmpInstruction = [
  () => pc = toBinary(prompt("Informe um valor")),
  () => instructionExecute(search)
]

function toBinary(num) {
  return Number(num).toString(2).padStart(8, '0')
}
function toDecimal(num) {
  return parseInt(num, 2)
}