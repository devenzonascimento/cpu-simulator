export let blank = {
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
}
export let add = {
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
export let sub = {
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
}
export let biggest = {
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
}
export let programs = [blank, add, sub, biggest]

export let memory = blank

export const updateMemory = (newMemory) => {
    memory = newMemory
}

export const chooseProgram = (index) => {
    memory = programs[index]
    clearCPU()
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



export let main = [() => instructionExecute(search)];

export const executeNextStep = () => {
    if (currentStep < main.length) {
        console.log(main[currentStep])
        console.log(currentStep, main)
        main[currentStep]();
        currentStep++
    }
};

// Preciso trabalhar na logica dessa função, esta com muitos problemas!
// Função para rodar o script inteiro de uma vez ( RUN ) 
export const executeComplete = () => {
    endInstruction.pop()
    endInstruction.push(() => {return false})
    setTimeout(() => {
        for (let i = 0; i < main.length; i++) {
            //console.log(main[i])
            //console.log(main)
            main[i]()
        }
    }, 1000)
}

export function instructionExecute(array) {
    main = main.concat(array);
}

export const search = [
    () => {
        pc = count <= 15 ? toBinary(count) : toBinary(count = 0);
        const pcElement = document.getElementById("pc");
        activeComponentStyle(pcElement);
    },
    () => {
        mar = pc;
        const marElement = document.getElementById("mar");
        activeComponentStyle(marElement);
    },
    () => {
        const memoryCellElement = document.getElementById(mar)
        activeComponentStyle(memoryCellElement)
    },
    () => {
        mdr = memory[mar].padStart(8, "0");
        const mdrElement = document.getElementById("mdr");
        activeComponentStyle(mdrElement);
    },
    () => {
        cir = mdr;
        const cirElement = document.getElementById("cir");
        activeComponentStyle(cirElement);
    },
    () => {
        pc = toBinary(count += 1);
        const pcElement = document.getElementById("pc");
        activeComponentStyle(pcElement);
    },
    () => decode(cir),
];

export const addInstruction = [
    () => {
        mar = operand.padStart(8, "0")
        const marElement = document.getElementById("mar");
        activeComponentStyle(marElement);
    },
    () => {
        mdr = memory[mar]
        const mdrElement = document.getElementById("mdr");
        activeComponentStyle(mdrElement);
    },
    () => {
        acc = toBinary(toDecimal(acc) + toDecimal(mdr))
        const accElement = document.getElementById("acc");
        activeComponentStyle(accElement);
        const aluElement = document.getElementById("alu");
        aluElement.classList.add("focus-alu")
    },
    () => instructionExecute(search),
];

export const subInstruction = [
    () => {
        mar = operand.padStart(8, "0")
        const marElement = document.getElementById("mar");
        activeComponentStyle(marElement);
    },
    () => {
        mdr = memory[mar]
        const mdrElement = document.getElementById("mdr");
        activeComponentStyle(mdrElement);
    },
    () => {
        acc = toBinary(toDecimal(acc) - toDecimal(mdr))
        const accElement = document.getElementById("acc");
        activeComponentStyle(accElement);
    },
    () => instructionExecute(search),
];

export const storeInstruction = [
    () => {
        mar = operand.padStart(8, "0")
        const marElement = document.getElementById("mar");
        activeComponentStyle(marElement);
    },
    () => (memory[mar] = acc),
    () => instructionExecute(search),
];

export const loadInstruction = [
    () => {
        mar = operand.padStart(8, "0")
        const marElement = document.getElementById("mar");
        activeComponentStyle(marElement);
    },
    () => {
        mdr = memory[mar]
        const mdrElement = document.getElementById("mdr");
        activeComponentStyle(mdrElement);
    },
    () => {
        acc = mdr
        const accElement = document.getElementById("acc");
        activeComponentStyle(accElement);
    },
    () => instructionExecute(search),
];

export const inputInstruction = [
    () => {
        acc = toBinary(prompt("Informe um valor"))
        const accElement = document.getElementById("acc");
        activeComponentStyle(accElement);
    },
    () => instructionExecute(search),
];

export const outputInstruction = [
    () => alert(`OUTPUT => ${toDecimal(acc)}`),
    () => instructionExecute(search),
];

export const endInstruction = [
    () => alert("FIM DO PROGRAMA"),
    () => clearCPU(),
    () => instructionExecute(search),
];

export const jmpInstruction = () => {
    count = toDecimal(operand.padStart(8, "0"))
    instructionExecute(search)
}

function decode(cir) {
    
    opcode = cir.substring(0, 4);
    operand = cir.substring(4, 8);


    let getElementID = {
        "0000": ".end",
        "0001": ".add",
        "0010": ".sub",
        "0011": ".str",
        "0101": ".lod",
        "0110": ".jmp",
        "0111": ".jpz",
        "1000": ".jpn",
        "1001": operand == "0001" ? ".ipt" : ".opt"
    }
    console.log(getElementID[opcode])
    const instructionElement = document.querySelector(getElementID[opcode])
    activeComponentStyle(instructionElement)

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
            if (toDecimal(acc) < "00000000") jmpInstruction()
            else instructionExecute(search)
            break;
        case "1001":
            operand === "0001" ? instructionExecute(inputInstruction) : false;
            operand === "0010" ? instructionExecute(outputInstruction) : false;

        default:
            return true;
    }
}

export function clearCPU() {
    currentStep = 0
    main = [() => instructionExecute(search)]
    pc = "00000000"
    mar = "00000000"
    mdr = "00000000"
    acc = "00000000"
    cir = "00000000"
    count = 0;
    opcode = "";
    operand = "";
    removeAllActiveComponentStyles()
}

export function toBinary(num) {

    const isNegative = num < 0;

    if (isNegative) {

        const binaryUnsigned = Number(Math.abs(num)).toString(2).padStart(8, "0");

        const complement = binaryUnsigned.split('').map(bit => bit === '0' ? '1' : '0').join('');
        num = parseInt(complement, 2) + 1;
    }

    return Number(num).toString(2).padStart(8, "0");
}

export function toDecimal(num) {

    const decimal = parseInt(num, 2);

    if (num.charAt(0) === '1') {
        return decimal - 256;
    }

    return decimal;
}

let previousElement

function activeComponentStyle(focusElement) {
    previousElement && previousElement.classList.remove("focus")

    if (focusElement) {
        focusElement.classList.add("focus");
        previousElement = focusElement
    } else {
        console.error('O elemento não foi encontrado.');
    }
}

function removeAllActiveComponentStyles() {

    const arrayElementClass = [".register-container", ".ram-input"]

    for (let i = 0; i < arrayElementClass.length; i++) {
        document.querySelectorAll(arrayElementClass[i]).forEach(element => {
            console.log(element)
            element.classList.remove("focus");
        })
    }
}



