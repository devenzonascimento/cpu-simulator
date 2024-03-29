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

    activeComponentStyle("#mar", "focus");
    description = {
      phase: "Busca",
      text: "A Unidade de Controle copia o valor do registrador PC para o registrador MAR que envia o valor para o Barramento de Endereço, que funciona como uma interface entre a CPU e a Memória.",
    };
  },
  () => {
    activeComponentStyle(`#adress-${mar}`, "focus");
    description = {
      phase: "Busca",
      text: "A Unidade de Controle sinaliza a Memória para fazer a leitura no endereço que está no Barramento de Endereço, carregar e armazenar esse valor no Barramento de Dados.",
    };
  },
  () => {
    mdr = memory[mar].padStart(8, "0");

    activeComponentStyle("#mdr", "focus");
    description = {
      phase: "Busca",
      text: "A Unidade de Controle copia o valor do Barramento de Dados para o registrador MDR. Ele atua como um intermediário em qualquer transferência de dados que envolva a Memória.",
    };
  },
  () => {
    cir = mdr;

    activeComponentStyle("#cir", "focus");
    description = {
      phase: "Busca",
      text: "A Unidade de Controle copia o valor do registrador MDR para o registrador de instrução CIR. O CIR armazena temporariamente a instrução que será decodificada e executada posteriormente.",
    };
  },
  () => {
    pc = count <= 15 ? toBinary((count = count + 1)) : toBinary((count = 0));

    activeComponentStyle("#pc", "focus");
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

export const search = [
  () => {
    mar = pc;

    activeComponentStyle("#mar", "focus");
    description = {
      phase: "Busca",
      text: "A Unidade de Controle copia o valor do registrador PC para o registrador MAR que envia o valor para o Barramento de Endereço, que funciona como uma interface entre a CPU e a Memória.",
    };
  },
  () => {
    activeComponentStyle(`#adress-${mar}`, "focus");
    description = {
      phase: "Busca",
      text: "A Unidade de Controle sinaliza a Memória para fazer a leitura no endereço que está no Barramento de Endereço, carregar e armazenar esse valor no Barramento de Dados.",
    };
  },
  () => {
    mdr = memory[mar].padStart(8, "0");

    activeComponentStyle("#mdr", "focus");
    description = {
      phase: "Busca",
      text: "A Unidade de Controle copia o valor do Barramento de Dados para o registrador MDR. Ele atua como um intermediário em qualquer transferência de dados que envolva a Memória.",
    };
  },
  () => {
    cir = mdr;

    activeComponentStyle("#cir", "focus");
    description = {
      phase: "Busca",
      text: "A Unidade de Controle copia o valor do registrador MDR para o registrador de instrução CIR. O CIR armazena temporariamente a instrução que será decodificada e executada posteriormente.",
    };
  },
  () => {
    pc = count <= 15 ? toBinary((count = count + 1)) : toBinary((count = 0));

    activeComponentStyle("#pc", "focus");
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

export const addInstruction = [
  () => {
    mar = operand.padStart(8, "0");

    activeComponentStyle("#mar", "focus");

    description = {
      phase: "Decodificação",
      text: `O DECODIFICADOR envia o valor do OPERANDO para o registrador MAR que vai copiar o valor para o Barramento de Endereço.`,
    };
  },
  () => {
    activeComponentStyle(`#adress-${mar}`, "focus");

    description = {
      phase: "Execução",
      text: `A Unidade de Controle sinaliza a Memória para pegar o valor que está no endereço específico pelo Barramento de Endereço e copiar para o Barramento de Dados.`,
    };
  },
  () => {
    mdr = memory[mar];

    activeComponentStyle("#mdr", "focus");

    description = {
      phase: "Execução",
      text: "A Unidade de Controle copia o valor do Barramento de Dados para o registrador MDR.",
    };
  },
  () => {
    acc = toBinary(toDecimal(acc) + toDecimal(mdr));

    const aluElement = document.getElementById("alu");
    aluElement.classList.add("focus-alu");

    activeComponentStyle("#acc", "focus");

    description = {
      phase: "Execução",
      text: "A Unidade de Controle sinaliza a (ULA) Unidade Lógica Aritmética para somar o valor do registrador ACC com o valor do registrador MDR. O resultado é armazenado de volta no registrador ACC.",
    };

    instructionExecute(search);
    setTimeout(() => aluElement.classList.remove("focus-alu"), 600);
  },
];

export const subInstruction = [
  () => {
    mar = operand.padStart(8, "0");

    activeComponentStyle("#mar", "focus");

    description = {
      phase: "Decodificação",
      text: `O DECODIFICADOR envia o valor do OPERANDO para o registrador MAR que vai copiar o valor para o Barramento de Endereço.`,
    };
  },
  () => {
    activeComponentStyle(`#adress-${mar}`, "focus");

    description = {
      phase: "Execução",
      text: `A Unidade de Controle sinaliza a Memória para pegar o valor que está no endereço específico pelo Barramento de Endereço e copiar para o Barramento de Dados.`,
    };
  },
  () => {
    mdr = memory[mar];

    activeComponentStyle("#mdr", "focus");

    description = {
      phase: "Execução",
      text: "A Unidade de Controle copia o valor do Barramento de Dados para o registrador MDR.",
    };
  },
  () => {
    acc = toBinary(toDecimal(acc) - toDecimal(mdr));

    const aluElement = document.getElementById("alu");
    aluElement.classList.add("focus-alu");

    activeComponentStyle("#acc", "focus");

    description = {
      phase: "Execução",
      text: "A Unidade de Controle sinaliza a (ULA) Unidade Lógica Aritmética para subtrair o valor do registrador ACC pelo valor do registrador MDR. O resultado é armazenado de volta no registrador ACC.",
    };

    instructionExecute(search);
    setTimeout(() => aluElement.classList.remove("focus-alu"), 600);
  },
];

export const storeInstruction = [
  () => {
    mar = operand.padStart(8, "0");

    activeComponentStyle("#mar", "focus");

    description = {
      phase: "Decodificação",
      text: `O DECODIFICADOR envia o valor do OPERANDO para o registrador MAR que vai copiar o valor para o Barramento de Endereço.`,
    };
  },
  () => {
    mdr = acc;

    activeComponentStyle("#mdr", "focus");

    description = {
      phase: "Execução",
      text: `A Unidade de Controle envia o valor do registrador ACC para o registrador MDR que vai copiar o valor para o Barramento de Dados.`,
    };
  },
  () => {
    memory[mar] = mdr;

    activeComponentStyle(`#adress-${mar}`, "focus");

    description = {
      phase: "Execução",
      text: `A Unidade de Controle manda um sinal para que o valor que está no Barramento de Dados seja armazenado no endereço de Memória especificado pelo Barramento de Endereço.`,
    };
  },
  () => {
    instructionExecute(search);

    description = {
      phase: "Execução",
      text: `a Unidade de Controle verifica se há interrupções para desviar a rotina de instruções, caso contrário, inicia o ciclo de busca novamente`,
    };
  },
];

export const loadInstruction = [
  () => {
    mar = operand.padStart(8, "0");

    activeComponentStyle("#mar", "focus");

    description = {
      phase: "Decodificação",
      text: `O DECODIFICADOR envia o valor do OPERANDO para o registrador MAR que vai copiar o valor para o Barramento de Endereço.`,
    };
  },
  () => {
    activeComponentStyle(`#adress-${mar}`, "focus");

    description = {
      phase: "Execução",
      text: "A Unidade de Controle sinaliza a Memória para fazer a leitura no endereço que está no Barramento de Endereço, carregar e armazenar esse valor no Barramento de Dados.",
    };
  },
  () => {
    mdr = memory[mar];

    activeComponentStyle("#mdr", "focus");

    description = {
      phase: "Execução",
      text: "A Unidade de Controle copia o valor do Barramento de Dados para o registrador MDR.",
    };
  },
  () => {
    acc = mdr;

    activeComponentStyle("#acc", "focus");

    description = {
      phase: "Execução",
      text: "A Unidade de Controle envia o valor do registrador MDR para o registrador ACC.",
    };
  },
  () => {
    instructionExecute(search);

    description = {
      phase: "Execução",
      text: `a Unidade de Controle verifica se há interrupções para desviar a rotina de instruções, caso contrário, inicia o ciclo de busca novamente`,
    };
  },
];

export const inputInstruction = [
  () => {
    acc = toBinary(prompt("Informe um numero: (-127 a 127)"));

    activeComponentStyle("#acc", "focus");

    description = {
      phase: "Execução",
      text: `O OPERANDO ${operand} define que se trata de uma ENTRADA. O Barramento de Controle lê o dispositivo de entrada e envia o valor lido para o registrador ACC.`,
    };
  },
  () => {
    instructionExecute(search);

    description = {
      phase: "Execução",
      text: `a Unidade de Controle verifica se há interrupções para desviar a rotina de instruções, caso contrário, inicia o ciclo de busca novamente.`,
    };
  },
];

export const outputInstruction = [
  () => {
    activeComponentStyle("#acc", "focus");
    alert(`OUTPUT => ${toDecimal(acc)}`);

    description = {
      phase: "Execução",
      text: `O OPERANDO ${operand} define que se trata de uma SAÍDA. O Barramento de Controle envia o valor do registrador ACC para o dispositivo de saída onde ele será exibido.`,
    };
  },
  () => {
    instructionExecute(search);

    description = {
      phase: "Execução",
      text: `a Unidade de Controle verifica se há interrupções para desviar a rotina de instruções, caso contrário, inicia o ciclo de busca novamente.`,
    };
  },
];

export const endInstruction = [
  () => {
    description = {
      phase: "Execução",
      text: `a CPU foi interrompida. A Unidade de Controle não busca mais instruções.`,
    };
    executeIsValid = false;
  },
];

export const jmpInstruction = [
  () => {
    count = toDecimal(operand.padStart(8, "0"));
    pc = operand.padStart(8, "0");

    activeComponentStyle("#pc", "focus");

    description = {
      phase: "Execução",
      text: `O valor do OPERANDO é enviado para o registrador PC.`,
    };
  },
  () => {
    instructionExecute(search);

    description = {
      phase: "Execução",
      text: `a Unidade de Controle verifica se há interrupções para desviar a rotina de instruções, caso contrário, inicia o ciclo de busca novamente.`,
    };
  },
];

export const jmpZeroInstruction = [
  () => {
    const aluElement = document.getElementById("alu");
    aluElement.classList.add("focus-alu");
    setTimeout(() => aluElement.classList.remove("focus-alu"), 600);

    if (acc == "00000000") {
      count = toDecimal(operand.padStart(8, "0"));
      pc = operand.padStart(8, "0");

      activeComponentStyle("#pc", "focus");
    }

    description = {
      phase: "Execução",
      text: `A Unidade de Controle faz a (ULA) Unidade Logica Aritmética verificar se o valor do registrador ACC é igual a zero, se ele for, o valor do OPERANDO é armazenado no registrador PC.`,
    };
  },
  () => {
    instructionExecute(search);

    description = {
      phase: "Execução",
      text: `a Unidade de Controle verifica se há interrupções para desviar a rotina de instruções, caso contrário, inicia o ciclo de busca novamente.`,
    };
  },
];

export const jmpNegativeInstruction = [
  () => {
    const aluElement = document.getElementById("alu");
    aluElement.classList.add("focus-alu");
    setTimeout(() => aluElement.classList.remove("focus-alu"), 600);

    if (toDecimal(acc) < 0) {
      count = toDecimal(operand.padStart(8, "0"));
      pc = operand.padStart(8, "0");

      activeComponentStyle("#pc", "focus");
    }

    description = {
      phase: "Execução",
      text: `A Unidade de Controle faz a (ULA) Unidade Logica Aritmética verificar se o valor do registrador ACC é menor que zero, se ele for, o valor do OPERANDO é armazenado no registrador PC.`,
    };
  },
  () => {
    instructionExecute(search);

    description = {
      phase: "Execução",
      text: `a Unidade de Controle verifica se há interrupções para desviar a rotina de instruções, caso contrário, inicia o ciclo de busca novamente.`,
    };
  },
];

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
