export const descriptions = {
  fetchPcToMar: {
    phase: "Busca",
    text: "A Unidade de Controle copia o valor do registrador PC para o registrador MAR que envia o valor para o Barramento de Endereço, que funciona como uma interface entre a CPU e a Memória.",
  },
  fetchReadMemoryCell: {
    phase: "Busca",
    text: "A Unidade de Controle sinaliza a Memória para fazer a leitura no endereço que está no Barramento de Endereço, carregar e armazenar esse valor no Barramento de Dados.",
  },
  fetchMemoryDataToMdr: {
    phase: "Busca",
    text: "A Unidade de Controle copia o valor do Barramento de Dados para o registrador MDR. Ele atua como um intermediário em qualquer transferência de dados que envolva a Memória.",
  },
  fetchMdrToCir: {
    phase: "Busca",
    text: "A Unidade de Controle copia o valor do registrador MDR para o registrador de instrução CIR. O CIR armazena temporariamente a instrução que será decodificada e executada posteriormente.",
  },
  fetchPcIncrement: {
    phase: "Busca",
    text: "A Unidade de Controle incrementa o registrador PC para apontar para o próximo endereço de instrução na sequência, preparando-se para o ciclo de busca da próxima instrução.",
  },
  decodeCirToDecode: {
    phase: "Decodificação",
    text: "O Decodificador recebe o valor do registrador de instrução CIR, esse valor é quebrado ao meio e transformado em OPCODE e OPERANDO.",
  },
  decodeEnd: {
    phase: "Decodificação",
    text: "A instrução 00000000 encerra o programa.",
  },
  decodeAdd: {
    phase: "Decodificação",
    text: "O OPCODE 0001 significa SOMAR, ele vai somar o valor do registrador ACC com o valor que está armazenado no endereço de Memória especificado pelo OPERANDO.",
  },
  decodeSub: {
    phase: "Decodificação",
    text: "O OPCODE 0010 significa SUBTRAIR, ele vai subtrair o valor do registrador ACC pelo valor que está armazenado no endereço de Memória especificado pelo OPERANDO.",
  },
  decodeStore: {
    phase: "Decodificação",
    text: "O OPCODE 0011 significa ARMAZENAR, ele vai armazenar o valor do registrador ACC no endereço de Memória especificado pelo OPERANDO.",
  },
  decodeLoad: {
    phase: "Decodificação",
    text: "O OPCODE 0101 significa CARREGAR, ele vai carregar o valor da Memória que está no endereço especificado pelo OPERANDO e copiá-lo para o registrador ACC.",
  },
  decodeJmp: {
    phase: "Decodificação",
    text: "O OPCODE 0110 significa PULAR, ele vai definir um novo endereço para o registrador PC. Desta forma, mudando a ordem das instruções.",
  },
  decodeJmpZ: {
    phase: "Decodificação",
    text: "O OPCODE 0111 significa PULAR SE (zero). Se o valor do registrador ACC for igual a zero, então será definido um novo endereço para o registrador PC.",
  },
  decodeJmpN: {
    phase: "Decodificação",
    text: "O OPCODE 1000 significa PULAR SE (negativo). Se o valor do registrador ACC for menor que zero, então será definido um novo endereço para o registrador PC.",
  },
  decodeInOut: {
    phase: "Decodificação",
    text: "O OPCODE 1001 pode significar ENTRADA ou SAÍDA, tudo vai depender do OPERANDO.",
  },
  decodeInput: {
    phase: "Execução",
    text: "O OPERANDO 0001 define que se trata de uma ENTRADA. O Barramento de Controle lê o dispositivo de entrada e envia o valor lido para o registrador ACC.",
  },
  decodeOutput: {
    phase: "Execução",
    text: "O OPERANDO 0010 define que se trata de uma SAÍDA. O Barramento de Controle envia o valor do registrador ACC para o dispositivo de saída onde ele será exibido.",
  },
  decodeOperandToMar: {
    phase: "Decodificação",
    text: "O DECODIFICADOR envia o valor do OPERANDO para o registrador MAR que vai copiar o valor para o Barramento de Endereço.",
  },
  execMemoryCellToBus: {
    phase: "Execução",
    text: "A Unidade de Controle sinaliza a Memória para pegar o valor que está no endereço específico pelo Barramento de Endereço e copiar para o Barramento de Dados.",
  },
  execMemoryDataToMdr: {
    phase: "Execução",
    text: "A Unidade de Controle copia o valor do Barramento de Dados para o registrador MDR.",
  },
  execAddResultToAcc: {
    phase: "Execução",
    text: "A Unidade de Controle sinaliza a (ULA) Unidade Lógica Aritmética para somar o valor do registrador ACC com o valor do registrador MDR. O resultado é armazenado de volta no registrador ACC.",
  },
  execSubResultToAcc: {
    phase: "Execução",
    text: "A Unidade de Controle sinaliza a (ULA) Unidade Lógica Aritmética para subtrair o valor do registrador ACC pelo valor do registrador MDR. O resultado é armazenado de volta no registrador ACC.",
  },
  execAccToMdr: {
    phase: "Execução",
    text: "A Unidade de Controle envia o valor do registrador ACC para o registrador MDR que vai copiar o valor para o Barramento de Dados.",
  },
  execMdrToMemoryCell: {
    phase: "Execução",
    text: "A Unidade de Controle manda um sinal para que o valor que está no Barramento de Dados seja armazenado no endereço de Memória especificado pelo Barramento de Endereço.",
  },
  execReadMemoryCell: {
    phase: "Busca",
    text: "A Unidade de Controle sinaliza a Memória para fazer a leitura no endereço que está no Barramento de Endereço, carregar e armazenar esse valor no Barramento de Dados.",
  },
  execMdrToAcc: {
    phase: "Execução",
    text: "A Unidade de Controle envia o valor do registrador MDR para o registrador ACC.",
  },
  execEnd: {
    phase: "Execução",
    text: "a CPU foi interrompida. A Unidade de Controle não busca mais instruções.",
  },
  execJmp: {
    phase: "Execução",
    text: "O valor do OPERANDO é enviado para o registrador PC.",
  },
  execJmpZ: {
    phase: "Execução",
    text: "A Unidade de Controle faz a (ULA) Unidade Logica Aritmética verificar se o valor do registrador ACC é igual a zero, se ele for, o valor do OPERANDO é armazenado no registrador PC.",
  },
  execJmpN: {
    phase: "Execução",
    text: "A Unidade de Controle faz a (ULA) Unidade Logica Aritmética verificar se o valor do registrador ACC é menor que zero, se ele for, o valor do OPERANDO é armazenado no registrador PC.",
  },
  checkForInterruptions: {
    phase: "Execução",
    text: "A Unidade de Controle verifica se há interrupções para desviar a rotina de instruções, caso contrário, inicia o ciclo de busca novamente.",
  },
};

const searchInstruction = [
  () => {
    mar = pc;

    activeComponentStyle(".mar", "focus");
    description = descriptions.fetchPcToMar;
  },
  () => {
    activeComponentStyle(`#address-${mar}`, "focus");
    description = descriptions.fetchReadMemoryCell;
  },
  () => {
    mdr = memory[mar].padStart(8, "0");

    activeComponentStyle(".mdr", "focus");
    description = descriptions.fetchMemoryDataToMdr;
  },
  () => {
    cir = mdr;

    activeComponentStyle(".cir", "focus");
    description = descriptions.fetchMdrToCir;
  },
  () => {
    pc = count <= 15 ? toBinary((count = count + 1)) : toBinary((count = 0));

    activeComponentStyle(".pc", "focus");
    description = descriptions.fetchPcIncrement;
  },
  () => {
    activeComponentStyle(".decode-container", "focus");
    description = descriptions.decodeCirToDecode;
  },
  () => decode(cir),
];

const addInstruction = [
  () => {
    mar = operand.padStart(8, "0");

    activeComponentStyle(".mar", "focus");

    description = descriptions.decodeOperandToMar;
  },
  () => {
    activeComponentStyle(`#address-${mar}`, "focus");

    description = descriptions.execMemoryCellToBus;
  },
  () => {
    mdr = memory[mar];

    activeComponentStyle(".mdr", "focus");

    description = descriptions.execMemoryDataToMdr;
  },
  () => {
    acc = toBinary(toDecimal(acc) + toDecimal(mdr));

    const aluElement = document.getElementById("alu");
    aluElement.classList.add("focus-alu");

    activeComponentStyle(".acc", "focus");

    description = descriptions.execAddResultToAcc;

    setTimeout(() => aluElement.classList.remove("focus-alu"), 600);
  },
  () => {
    instructionExecute(search);

    description = descriptions.checkForInterruptions;
  },
];

const subInstruction = [
  () => {
    mar = operand.padStart(8, "0");

    activeComponentStyle(".mar", "focus");

    description = descriptions.decodeOperandToMar;
  },
  () => {
    activeComponentStyle(`#address-${mar}`, "focus");

    description = descriptions.execMemoryCellToBus;
  },
  () => {
    mdr = memory[mar];

    activeComponentStyle(".mdr", "focus");

    description = descriptions.execMemoryDataToMdr;
  },
  () => {
    acc = toBinary(toDecimal(acc) - toDecimal(mdr));

    const aluElement = document.getElementById("alu");
    aluElement.classList.add("focus-alu");

    activeComponentStyle(".acc", "focus");

    description = descriptions.execSubResultToAcc;

    setTimeout(() => aluElement.classList.remove("focus-alu"), 600);
  },
  () => {
    instructionExecute(search);

    description = descriptions.checkForInterruptions;
  },
];

const storeInstruction = [
  () => {
    mar = operand.padStart(8, "0");

    activeComponentStyle(".mar", "focus");

    description = descriptions.decodeOperandToMar;
  },
  () => {
    mdr = acc;

    activeComponentStyle(".mdr", "focus");

    description = descriptions.execAccToMdr;
  },
  () => {
    memory[mar] = mdr;

    activeComponentStyle(`#address-${mar}`, "focus");

    description = descriptions.execMdrToMemoryCell;
  },
  () => {
    instructionExecute(search);

    description = descriptions.checkForInterruptions;
  },
];

const loadInstruction = [
  () => {
    mar = operand.padStart(8, "0");

    activeComponentStyle(".mar", "focus");

    description = descriptions.decodeOperandToMar;
  },
  () => {
    activeComponentStyle(`#address-${mar}`, "focus");

    description = descriptions.execReadMemoryCell;
  },
  () => {
    mdr = memory[mar];

    activeComponentStyle(".mdr", "focus");

    description = descriptions.execMemoryDataToMdr;
  },
  () => {
    acc = mdr;

    activeComponentStyle(".acc", "focus");

    description = descriptions.execMdrToAcc;
  },
  () => {
    instructionExecute(search);

    description = descriptions.checkForInterruptions;
  },
];

const inputInstruction = [
  () => {
    acc = toBinary(prompt("Informe um numero: (-127 a 127)"));

    activeComponentStyle(".acc", "focus");

    description = descriptions.decodeInput;
  },
  () => {
    instructionExecute(search);

    description = descriptions.checkForInterruptions;
  },
];

const outputInstruction = [
  () => {
    activeComponentStyle(".acc", "focus");
    alert(`OUTPUT => ${toDecimal(acc)}`);

    description = descriptions.decodeOutput;
  },
  () => {
    instructionExecute(search);

    description = descriptions.checkForInterruptions;
  },
];

const endInstruction = [
  () => {
    description = descriptions.execEnd;
    executeIsValid = false;
  },
];

const jmpInstruction = [
  () => {
    count = toDecimal(operand.padStart(8, "0"));
    pc = operand.padStart(8, "0");

    activeComponentStyle(".pc", "focus");

    description = descriptions.execJmp;
  },
  () => {
    instructionExecute(search);

    description = descriptions.checkForInterruptions;
  },
];

const jmpZeroInstruction = [
  () => {
    const aluElement = document.getElementById("alu");
    aluElement.classList.add("focus-alu");
    setTimeout(() => aluElement.classList.remove("focus-alu"), 600);

    if (acc == "00000000") {
      count = toDecimal(operand.padStart(8, "0"));
      pc = operand.padStart(8, "0");

      activeComponentStyle(".pc", "focus");
    }

    description = descriptions.execJmpZ;
  },
  () => {
    instructionExecute(search);

    description = descriptions.checkForInterruptions;
  },
];

const jmpNegativeInstruction = [
  () => {
    const aluElement = document.getElementById("alu");
    aluElement.classList.add("focus-alu");
    setTimeout(() => aluElement.classList.remove("focus-alu"), 600);

    if (toDecimal(acc) < 0) {
      count = toDecimal(operand.padStart(8, "0"));
      pc = operand.padStart(8, "0");

      activeComponentStyle(".pc", "focus");
    }

    description = descriptions.execJmpN;
  },
  () => {
    instructionExecute(search);

    description = descriptions.checkForInterruptions;
  },
];

const decode = (cir) => {
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
      description = descriptions.decodeEnd
      break;
    case "0001":
      instructionExecute(addInstruction);
      description = descriptions.decodeAdd
      break;
    case "0010":
      instructionExecute(subInstruction);
      description = descriptions.decodeSub
      break;
    case "0011":
      instructionExecute(storeInstruction);
      description = descriptions.decodeStore
      break;
    case "0101":
      instructionExecute(loadInstruction);
      description = descriptions.decodeLoad
      break;
    case "0110":
      instructionExecute(jmpInstruction);
      description = descriptions.decodeJmp
      break;
    case "0111":
      instructionExecute(jmpZeroInstruction);
      description = descriptions.decodeJmpZ
      break;
    case "1000":
      instructionExecute(jmpNegativeInstruction);
      description = descriptions.decodeJmpN
      break;
    case "1001":
      description = descriptions.decodeInOut
      operand === "0001" ? instructionExecute(inputInstruction) : false;
      operand === "0010" ? instructionExecute(outputInstruction) : false;
    default:
      return false;
  }
};
