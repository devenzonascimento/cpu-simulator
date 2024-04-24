export const phaseDescriptionsList = {
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
