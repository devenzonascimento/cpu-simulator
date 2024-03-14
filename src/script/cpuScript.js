export let memory = {
    "00000000": "01111110",
    "00000001": "10010001",
    "00000010": "00111111",
    "00000011": "10010001",
    "00000100": "00011111",
    "00000101": "10010010",
    "00000110": "00000000",
    "00000111": "00000000",
    "00001000": "00000000",
    "00001001": "00000000",
    "00001010": "00000000",
    "00001011": "00000000",
    "00001100": "00000000",
    "00001101": "00000000",
    "00001110": "10010001",
    "00001111": "10010010",
}
export let pc = "00000000"
export let mar = "00000000"
export let mdr = "00000000"
export let acc = "00000000"
export let cir = "00000000"
export let count = 0;
export let currentStep = 0;
export let opcode = "";
export let operand = "";

export const executeNextStep = () => {
    if (currentStep < main.length) {
        console.log(main[currentStep])
        main[currentStep]();
        currentStep++
    }
};

export const search = [
    () => (pc = count <= 15 ? toBinary(count): toBinary(count = 0)),
    () => (mar = pc),
    () => (mdr = memory[mar]),
    () => (cir = mdr),
    () => (pc = toBinary((count += 1))),
    () => decode(cir),
];
export function instructionExecute(array) {
    main = main.concat(array);
}
export let main = [() => instructionExecute(search)];

export function decode(cir) {
    opcode = cir.substring(0, 4);
    operand = cir.substring(4, 8);

    switch (opcode) {
        case "0000":
            instructionExecute(endInstruction);
            break;
        case "0001":
            instructionExecute(addInstruction);
            break;
        case "0010":
            instructionExecute(subInstruction);
            break;
        case "0011":
            instructionExecute(storeInstruction);
            break;
        case "0101":
            instructionExecute(loadInstruction);
            break;
        case "0110":
            jmpInstruction()
            break;
        case "0111":
            if (acc == "00000000") jmpInstruction()
            else instructionExecute(search)
            break;
        case "1000":
            if (acc != "00000000") jmpInstruction()
            else instructionExecute(search)
            break;
        case "1001":
            operand === "0001" ? instructionExecute(inputInstruction) : false;
            operand === "0010" ? instructionExecute(outputInstruction) : false;

        default:
            return true;
    }
}

export const addInstruction = [
    () => (mar = operand.padStart(8, "0")),
    () => (mdr = memory[mar]),
    () => (acc = toBinary(toDecimal(acc) + toDecimal(mdr))),
    () => instructionExecute(search),
];

export const subInstruction = [
    () => (mar = operand.padStart(8, "0")),
    () => (mdr = memory[mar]),
    () => (acc = toBinary(toDecimal(acc) - toDecimal(mdr))),
    () => instructionExecute(search),
];

export const storeInstruction = [
    () => (mar = operand.padStart(8, "0")),
    () => (memory[mar] = acc),
    () => instructionExecute(search),
];

export const loadInstruction = [
    () => (mar = operand.padStart(8, "0")),
    () => (mdr = memory[mar]),
    () => (acc = mdr),
    () => instructionExecute(search),
];

export const inputInstruction = [
    () => (acc = toBinary(prompt("Informe um valor"))),
    () => instructionExecute(search),
];

export const outputInstruction = [
    () => alert(toDecimal(acc)),
    () => instructionExecute(search),
];

export const endInstruction = [
    () => alert("Fim do Programa"),
    () => clearCPU(),
    () => instructionExecute(search),
];

export const jmpInstruction = () => {
    count = toDecimal(operand.padStart(8, "0"))
    instructionExecute(search)
}

export function clearCPU() {
pc = "00000000"
mar = "00000000"
mdr = "00000000"
acc = "00000000"
cir = "00000000"
count = 0;
currentStep = 0;
opcode = "";
operand = "";
}

export function toBinary(num) {
    return Number(num).toString(2).padStart(8, "0");
}
export function toDecimal(num) {
    return parseInt(num, 2);
}