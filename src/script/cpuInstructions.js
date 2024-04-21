  import { decode } from "./cpuDecode";
  import { memory } from "./memory";
  import { activeComponentStyle, toBinary, toDecimal } from "./cpuScript copy";
  

  /*export*/ let pc = "00000000";
  /*export*/ let mar = "00000000";
  /*export*/ let mdr = "00000000";
  /*export*/ let acc = "00000000";
  /*export*/ let cir = "00000000";
  /*export*/ let count = 0;
  /*export*/ let description = {};

  export let main
  
  const searchInstruction = [
    () => {
      mar = pc;
  
      activeComponentStyle(".mar", "focus");
      description = {
        phase: "Busca",
        text: "A Unidade de Controle copia o valor do registrador PC para o registrador MAR que envia o valor para o Barramento de Endereço, que funciona como uma interface entre a CPU e a Memória.",
      };
    },
    () => {
      activeComponentStyle(`#address-${mar}`, "focus");
      description = {
        phase: "Busca",
        text: "A Unidade de Controle sinaliza a Memória para fazer a leitura no endereço que está no Barramento de Endereço, carregar e armazenar esse valor no Barramento de Dados.",
      };
    },
    () => {
      mdr = memory[mar].padStart(8, "0");
  
      activeComponentStyle(".mdr", "focus");
      description = {
        phase: "Busca",
        text: "A Unidade de Controle copia o valor do Barramento de Dados para o registrador MDR. Ele atua como um intermediário em qualquer transferência de dados que envolva a Memória.",
      };
    },
    () => {
      cir = mdr;
  
      activeComponentStyle(".cir", "focus");
      description = {
        phase: "Busca",
        text: "A Unidade de Controle copia o valor do registrador MDR para o registrador de instrução CIR. O CIR armazena temporariamente a instrução que será decodificada e executada posteriormente.",
      };
    },
    () => {
      pc = count <= 15 ? toBinary((count = count + 1)) : toBinary((count = 0));
  
      activeComponentStyle(".pc", "focus");
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
  
  const addInstruction = [
    () => {
      mar = operand.padStart(8, "0");
  
      activeComponentStyle(".mar", "focus");
  
      description = {
        phase: "Decodificação",
        text: `O DECODIFICADOR envia o valor do OPERANDO para o registrador MAR que vai copiar o valor para o Barramento de Endereço.`,
      };
    },
    () => {
      activeComponentStyle(`#address-${mar}`, "focus");
  
      description = {
        phase: "Execução",
        text: `A Unidade de Controle sinaliza a Memória para pegar o valor que está no endereço específico pelo Barramento de Endereço e copiar para o Barramento de Dados.`,
      };
    },
    () => {
      mdr = memory[mar];
  
      activeComponentStyle(".mdr", "focus");
  
      description = {
        phase: "Execução",
        text: "A Unidade de Controle copia o valor do Barramento de Dados para o registrador MDR.",
      };
    },
    () => {
      acc = toBinary(toDecimal(acc) + toDecimal(mdr));
  
      const aluElement = document.getElementById("alu");
      aluElement.classList.add("focus-alu");
  
      activeComponentStyle(".acc", "focus");
  
      description = {
        phase: "Execução",
        text: "A Unidade de Controle sinaliza a (ULA) Unidade Lógica Aritmética para somar o valor do registrador ACC com o valor do registrador MDR. O resultado é armazenado de volta no registrador ACC.",
      };
  
      instructionExecute(search);
      setTimeout(() => aluElement.classList.remove("focus-alu"), 600);
    },
  ];
  
  const subInstruction = [
    () => {
      mar = operand.padStart(8, "0");
  
      activeComponentStyle(".mar", "focus");
  
      description = {
        phase: "Decodificação",
        text: `O DECODIFICADOR envia o valor do OPERANDO para o registrador MAR que vai copiar o valor para o Barramento de Endereço.`,
      };
    },
    () => {
      activeComponentStyle(`#address-${mar}`, "focus");
  
      description = {
        phase: "Execução",
        text: `A Unidade de Controle sinaliza a Memória para pegar o valor que está no endereço específico pelo Barramento de Endereço e copiar para o Barramento de Dados.`,
      };
    },
    () => {
      mdr = memory[mar];
  
      activeComponentStyle(".mdr", "focus");
  
      description = {
        phase: "Execução",
        text: "A Unidade de Controle copia o valor do Barramento de Dados para o registrador MDR.",
      };
    },
    () => {
      acc = toBinary(toDecimal(acc) - toDecimal(mdr));
  
      const aluElement = document.getElementById("alu");
      aluElement.classList.add("focus-alu");
  
      activeComponentStyle(".acc", "focus");
  
      description = {
        phase: "Execução",
        text: "A Unidade de Controle sinaliza a (ULA) Unidade Lógica Aritmética para subtrair o valor do registrador ACC pelo valor do registrador MDR. O resultado é armazenado de volta no registrador ACC.",
      };
  
      instructionExecute(search);
      setTimeout(() => aluElement.classList.remove("focus-alu"), 600);
    },
  ];
  
  const storeInstruction = [
    () => {
      mar = operand.padStart(8, "0");
  
      activeComponentStyle(".mar", "focus");
  
      description = {
        phase: "Decodificação",
        text: `O DECODIFICADOR envia o valor do OPERANDO para o registrador MAR que vai copiar o valor para o Barramento de Endereço.`,
      };
    },
    () => {
      mdr = acc;
  
      activeComponentStyle(".mdr", "focus");
  
      description = {
        phase: "Execução",
        text: `A Unidade de Controle envia o valor do registrador ACC para o registrador MDR que vai copiar o valor para o Barramento de Dados.`,
      };
    },
    () => {
      memory[mar] = mdr;
  
      activeComponentStyle(`#address-${mar}`, "focus");
  
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
  
  const loadInstruction = [
    () => {
      mar = operand.padStart(8, "0");
  
      activeComponentStyle(".mar", "focus");
  
      description = {
        phase: "Decodificação",
        text: `O DECODIFICADOR envia o valor do OPERANDO para o registrador MAR que vai copiar o valor para o Barramento de Endereço.`,
      };
    },
    () => {
      activeComponentStyle(`#address-${mar}`, "focus");
  
      description = {
        phase: "Execução",
        text: "A Unidade de Controle sinaliza a Memória para fazer a leitura no endereço que está no Barramento de Endereço, carregar e armazenar esse valor no Barramento de Dados.",
      };
    },
    () => {
      mdr = memory[mar];
  
      activeComponentStyle(".mdr", "focus");
  
      description = {
        phase: "Execução",
        text: "A Unidade de Controle copia o valor do Barramento de Dados para o registrador MDR.",
      };
    },
    () => {
      acc = mdr;
  
      activeComponentStyle(".acc", "focus");
  
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
  
  const inputInstruction = [
    () => {
      acc = toBinary(prompt("Informe um numero: (-127 a 127)"));
  
      activeComponentStyle(".acc", "focus");
  
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
  
  const outputInstruction = [
    () => {
      activeComponentStyle(".acc", "focus");
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
  
  const endInstruction = [
    () => {
      description = {
        phase: "Execução",
        text: `a CPU foi interrompida. A Unidade de Controle não busca mais instruções.`,
      };
      executeIsValid = false;
    },
  ];
  
  const jmpInstruction = [
    () => {
      count = toDecimal(operand.padStart(8, "0"));
      pc = operand.padStart(8, "0");
  
      activeComponentStyle(".pc", "focus");
  
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

  export const instructionExecute = (array) => {
    main = main.concat(array);
  }

  main = [...searchInstruction]
