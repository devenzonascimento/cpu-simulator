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
    const marElement = document.getElementById("mar");
    activeComponentStyle(marElement, "focus");
    description = {
      phase: "Busca",
      text: "A Unidade de Controle copia o valor do registrador PC para o registrador MAR que envia o valor para o Barramento de Endereço, que funciona como uma interface entre a CPU e a Memória.",
    };
  },
  () => {
    const memoryCellElement = document.getElementById(mar);
    activeComponentStyle(memoryCellElement, "focus");
    description = {
      phase: "Busca",
      text: "A Unidade de Controle sinaliza a Memória para fazer a leitura no endereço que está no Barramento de Endereço, carregar e armazenar esse valor no Barramento de Dados.",
    };
  },
  () => {
    mdr = memory[mar].padStart(8, "0");
    const mdrElement = document.getElementById("mdr");
    activeComponentStyle(mdrElement, "focus");
    description = {
      phase: "Busca",
      text: "A Unidade de Controle copia o valor do Barramento de Dados para o registrador MDR. Ele atua como um intermediário em qualquer transferência de dados que envolva a Memória.",
    };
  },
  () => {
    cir = mdr;
    const cirElement = document.getElementById("cir");
    activeComponentStyle(cirElement, "focus");
    description = {
      phase: "Busca",
      text: "A Unidade de Controle copia o valor do registrador MDR para o registrador de instrução CIR. O CIR armazena temporariamente a instrução que será decodificada e executada posteriormente.",
    };
  },
  () => {
    pc = count <= 15 ? toBinary((count = count + 1)) : toBinary((count = 0));
    const pcElement = document.getElementById("pc");
    activeComponentStyle(pcElement, "focus");
    description = {
      phase: "Busca",
      text: "A Unidade de Controle incrementa o registrador PC para apontar para o próximo endereço de instrução na sequência, preparando-se para o ciclo de busca da próxima instrução",
    };
  },
  () => {
    const decodeElement = document.querySelector(".decode-container");
    activeComponentStyle(decodeElement, "focus");
    description = {
      phase: "Decodificação",
      text: `O Decodificador recebe o valor do registrador de instrução CIR, esse valor é quebrado ao meio e transformado em OPCODE e OPERANDO.`
    };
  },
  () => decode(cir),
];

export const executeNextStep = () => {
  if (currentStep < main.length) {
    //console.log(main[currentStep]);
    main[currentStep]();
    currentStep++;
  }
};

// Preciso trabalhar na logica dessa função, esta com muitos problemas!
// Função para rodar o script inteiro de uma vez ( RUN )

export const executeComplete = () => {
  let i = 0;
  const intervalId = setInterval(() => {
    console.log(main[i]);
    main[i]();

    i++;

    if (i >= main.length) {
      clearInterval(intervalId);
    }
  }, 1000);
};

export function instructionExecute(array) {
  main = main.concat(array);
}

export const search = [
  () => {
    mar = pc;
    const marElement = document.getElementById("mar");
    activeComponentStyle(marElement, "focus");
    description = {
      phase: "Busca",
      text: "O endereço obtido pelo PC é transferido para o registrador MAR, que funciona como uma interface entre a CPU e a Memória. Ele contém o endereço para onde será realizada a leitura na memória.",
    };
  },
  () => {
    const memoryCellElement = document.getElementById(mar);
    activeComponentStyle(memoryCellElement, "focus");
    description = {
      phase: "Busca",
      text: "Efetua uma leitura na Memória para obter os dados que estão gravados no endereço de Memória especificado pelo registrador MAR.",
    };
  },
  () => {
    mdr = memory[mar].padStart(8, "0");
    const mdrElement = document.getElementById("mdr");
    activeComponentStyle(mdrElement, "focus");
    description = {
      phase: "Busca",
      text: "Os dados que foram lidos na Memória são transferidos para o registrador MDR. Ele atua como um Intermediário em qualquer operação que envolva a Memória.",
    };
  },
  () => {
    cir = mdr;
    const cirElement = document.getElementById("cir");
    activeComponentStyle(cirElement, "focus");
    description = {
      phase: "Busca",
      text: "Os dados do registrador MDR, que agora contém a instrução buscada, é transferido para o registrador de instrução CIR. O CIR armazena temporariamente a instrução que será decodificada e executada posteriormente.",
    };
  },
  () => {
    pc = count <= 15 ? toBinary((count = count + 1)) : toBinary((count = 0));
    const pcElement = document.getElementById("pc");
    activeComponentStyle(pcElement, "focus");
    description = {
      phase: "Busca",
      text: "o PC é incrementado para apontar para o próximo endereço de instrução na sequência, preparando-se para o ciclo de busca da próxima instrução",
    };
  },
  () => decode(cir),
];

export const addInstruction = [
  () => {
    mar = operand.padStart(8, "0");
    const marElement = document.getElementById("mar");
    activeComponentStyle(marElement, "focus");
  },
  () => {
    const memoryCellElement = document.getElementById(mar);
    activeComponentStyle(memoryCellElement, "focus");
  },
  () => {
    mdr = memory[mar];
    const mdrElement = document.getElementById("mdr");
    activeComponentStyle(mdrElement, "focus");
  },
  () => {
    acc = toBinary(toDecimal(acc) + toDecimal(mdr));

    const aluElement = document.getElementById("alu");
    aluElement.classList.add("focus-alu");

    const accElement = document.getElementById("acc");
    activeComponentStyle(accElement, "focus");

    instructionExecute(search);
    setTimeout(() => aluElement.classList.remove("focus-alu"), 600);
  },
];

export const subInstruction = [
  () => {
    mar = operand.padStart(8, "0");
    const marElement = document.getElementById("mar");
    activeComponentStyle(marElement, "focus");
  },
  () => {
    const memoryCellElement = document.getElementById(mar);
    activeComponentStyle(memoryCellElement, "focus");
  },
  () => {
    mdr = memory[mar];
    const mdrElement = document.getElementById("mdr");
    activeComponentStyle(mdrElement, "focus");
  },
  () => {
    acc = toBinary(toDecimal(acc) - toDecimal(mdr));

    const aluElement = document.getElementById("alu");
    aluElement.classList.add("focus-alu");

    const accElement = document.getElementById("acc");
    activeComponentStyle(accElement, "focus");

    instructionExecute(search);
    setTimeout(() => aluElement.classList.remove("focus-alu"), 600);
  },
];

export const storeInstruction = [
  () => {
    mar = operand.padStart(8, "0");

    const marElement = document.getElementById("mar");
    activeComponentStyle(marElement, "focus");

    description = {
      phase: "Decodificação",
      text: `O DECODIFICADOR envia o valor do OPERANDO (${operand}) para o registrador MAR que vai copiar o valor para o barramento de endereço.`,
    };
  },
  () => {
    mdr = acc;

    const marElement = document.getElementById("mdr");
    activeComponentStyle(marElement, "focus");

    description = {
      phase: "Execução",
      text: `A unidade de controle envia o valor do registrador ACC para o registrador MDR que vai copiar o valor para o barramento de dados.`,
    };
  },
  () => {
    memory[mar] = mdr;

    const memoryCellElement = document.getElementById(mar);
    activeComponentStyle(memoryCellElement, "focus");

    description = {
      phase: "Execução",
      text: `A unidade de controle manda um sinal para que o valor que está no barramento de dados seja armazenado na Memória no endereço especificado pelo barramento de endereço.`,
    };

    instructionExecute(search);
  },
];

export const loadInstruction = [
  () => {
    mar = operand.padStart(8, "0");
    const marElement = document.getElementById("mar");
    activeComponentStyle(marElement, "focus");
  },
  () => {
    const memoryCellElement = document.getElementById(mar);
    activeComponentStyle(memoryCellElement, "focus");
  },
  () => {
    mdr = memory[mar];
    const mdrElement = document.getElementById("mdr");
    activeComponentStyle(mdrElement, "focus");
  },
  () => {
    acc = mdr;
    const accElement = document.getElementById("acc");
    activeComponentStyle(accElement, "focus");

    instructionExecute(search);
  },
];

export const inputInstruction = [
  () => {
    acc = toBinary(prompt("Informe um numero: (-127 a 127)"));

    const accElement = document.getElementById("acc");
    activeComponentStyle(accElement, "focus");

    description = {
      phase: "Execução",
      text: `O OPERANDO ${operand} define que se trata de uma ENTRADA. O barramento de controle lê o dispositivo de entrada e coloca o valor lido no registrador ACC.`,
    };

    instructionExecute(search);
  },
];

export const outputInstruction = [
  () => {
    const accElement = document.getElementById("acc");
    activeComponentStyle(accElement, "focus");
    alert(`OUTPUT => ${toDecimal(acc)}`);
    instructionExecute(search);
  },
];

export const endInstruction = [
  () => {
    alert("FIM DO PROGRAMA");
    clearCPU(), instructionExecute(search);
  },
];

export const jmpInstruction = () => {
  count = toDecimal(operand.padStart(8, "0"));
  instructionExecute(search);
};

function decode(cir) {
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

  const instructionElement = document.querySelector(getElementID[opcode]);
  activeComponentStyle(instructionElement, "focus");

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
        text: "",
      };
      break;
    case "0010":
      instructionExecute(subInstruction);
      description = {
        phase: "Decodificação",
        text: "",
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
        text: "",
      };
      break;
    case "0110":
      jmpInstruction();
      description = {
        phase: "Decodificação",
        text: "",
      };
      break;
    case "0111":
      if (acc == "00000000") jmpInstruction();
      else instructionExecute(search);
      description = {
        phase: "Decodificação",
        text: "",
      };
      break;
    case "1000":
      if (toDecimal(acc) < "00000000") jmpInstruction();
      else instructionExecute(search);
      description = {
        phase: "Decodificação",
        text: "",
      };
      break;
    case "1001":
      description = {
        phase: "Decodificação",
        text: `O OPCODE ${opcode} pode significar ENTRADA ou SAIDA, tudo vai depender do OPERANDO.`,
      };
      operand === "0001" ? instructionExecute(inputInstruction) : false;
      operand === "0010" ? instructionExecute(outputInstruction) : false;
    default:
      return false;
  }
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

function activeComponentStyle(focusElement, styleName) {
  previous.element && previous.element.classList.remove(previous.style);

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
