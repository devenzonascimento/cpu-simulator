export const phaseDescriptionsList = {
  fetchPcToMar: {
    phase: "Busca",
    text: "A Unidade de Controle transfere o valor do registrador PC para o registrador MAR, que por sua vez transfere o valor para o Barramento de Endereço, atuando como interface entre a CPU e a Memória.",
  },
  fetchReadMemoryCell: {
    phase: "Busca",
    text: "A Unidade de Controle solicita à Memória , uma leitura no endereço especificado no Barramento de Endereço, e transfere o valor para o Barramento de Dados."
  },
  fetchMemoryDataToMdr: {
    phase: "Busca",
    text: "A Unidade de Controle transfere o valor do Barramento de Dados para o registrador MDR, que funciona como intermediário em transferências de dados relacionadas à Memória.",
  },
  fetchMdrToCir: {
    phase: "Busca",
    text: "A Unidade de Controle transfere o valor do registrador MDR para o registrador de instrução CIR, onde a instrução é temporariamente armazenada para posterior decodificação e execução.",
  },
  fetchPcIncrement: {
    phase: "Busca",
    text: "A Unidade de Controle incrementa o valor do registrador PC, apontando para o próximo endereço de instrução na sequência, em preparação para o ciclo de busca da próxima instrução.",
  },
  decodeCirToDecode: {
    phase: "Decodificação",
    text: "O Decodificador recebe o valor do registrador de instrução CIR, o qual é dividido em OPCODE e OPERANDO.",
  },
  decodeEnd: {
    phase: "Decodificação",
    text: "A instrução 00000000 encerra a execução do programa.",
  },
  decodeAdd: {
    phase: "Decodificação",
    text: "O OPCODE 0001 significa SOMAR. A soma é efetuada entre o valor do registrador ACC, e o valor que está armazenado no endereço de Memória especificado pelo OPERANDO.",
  },
  decodeSub: {
    phase: "Decodificação",
    text: "O OPCODE 0010 significa SUBTRAIR. A subtração é efetuada entre o valor do registrador ACC, e o valor que está armazenado no endereço de Memória especificado pelo OPERANDO."
  },
  decodeStore: {
    phase: "Decodificação",
    text: "O OPCODE 0011 significa ARMAZENAR. Então armazena o valor do registrador ACC no endereço de Memória especificado pelo OPERANDO.",
  },
  decodeLoad: {
    phase: "Decodificação",
    text: "O OPCODE 0101 significa CARREGAR. Então acessa a Memória no endereço especificado pelo OPERANDO e transfere o valor para o registrador ACC."
  },
  decodeJmp: {
    phase: "Decodificação",
    text: "O OPCODE 0110 significa PULAR. Ele define um novo endereço para o registrador PC, alterando a ordem das instruções.",
  },
  decodeJmpZ: {
    phase: "Decodificação",
    text: "O OPCODE 0111 significa PULAR SE FOR IGUAL A ZERO. Se o valor do registrador ACC for igual a zero, então o valor do OPERANDO é transferido para o registrador PC.",
  },
  decodeJmpN: {
    phase: "Decodificação",
    text: "O OPCODE 1000 significa PULAR SE FOR NEGATIVO. Se o valor do registrador ACC for menor que zero, então o valor do OPERANDO é transferido para o registrador PC.",
  },
  decodeInOut: {
    phase: "Decodificação",
    text: "O OPCODE 1001 pode significar ENTRADA ou SAÍDA, dependendo do OPERANDO.",
  },
  decodeInput: {
    phase: "Execução",
    text: "O OPERANDO 0001 indica uma operação de ENTRADA. O Barramento de Controle lê o dispositivo de entrada e transfere o valor lido para o registrador ACC.",
  },
  decodeOutput: {
    phase: "Execução",
    text: "O OPERANDO 0010 indica uma operação de SAÍDA. O Barramento de Controle transfere o valor do registrador ACC para o dispositivo de saída, onde será exibido.",
  },
  decodeOperandToMar: {
    phase: "Decodificação",
    text: "O Decodificador transfere o valor do OPERANDO para o registrador MAR, que então é transferido para o Barramento de Endereço.",
  },
  execMemoryCellToBus: {
    phase: "Execução",
    text: "A Unidade de Controle solicita à Memória para buscar o valor no endereço especificado pelo Barramento de Endereço e transferir ele para o Barramento de Dados.",
  },
  execMemoryDataToMdr: {
    phase: "Execução",
    text: "A Unidade de Controle transfere o valor do Barramento de Dados para o registrador MDR.",
  },
  execAddResultToAcc: {
    phase: "Execução",
    text: "A Unidade de Controle solicita à Unidade Lógica Aritmética (ULA), uma soma entre o valor do registrador ACC, e o valor do registrador MDR. Após a soma o resultado é transferido para o registrador ACC."
  },
  execSubResultToAcc: {
    phase: "Execução",
    text: "A Unidade de Controle solicita à Unidade Lógica Aritmética (ULA), uma subtração entre o valor do registrador ACC, e o valor do registrador MDR. Após a subtração o resultado é transferido para o registrador ACC."
  },
  execAccToMdr: {
    phase: "Execução",
    text: "A Unidade de Controle transfere o valor do registrador ACC para o registrador MDR.",
  },
  execMdrToMemoryCell: {
    phase: "Execução",
    text: "A Unidade de Controle transfere o valor do Barramento de Dados para a Memória, que armazena o valor no endereço de Memória especificado pelo Barramento de Endereço.",
  },
  execReadMemoryCell: {
    phase: "Busca",
    text: "A Unidade de Controle solicita à Memória, uma leitura no endereço especificado no Barramento de Endereço, e transfere o valor para o Barramento de Dados."
  },
  execMdrToAcc: {
    phase: "Execução",
    text: "A Unidade de Controle transfere o valor do registrador MDR para o registrador ACC.",
  },
  execEnd: {
    phase: "Execução",
    text: "A CPU foi interrompida. A Unidade de Controle não busca mais instruções.",
  },
  execJmp: {
    phase: "Execução",
    text: "O valor do OPERANDO é transferido para o registrador PC.",
  },
  execJmpZ: {
    phase: "Execução",
    text: "A Unidade de Controle verifica se o valor do registrador ACC é igual a zero. Caso seja, o valor do OPERANDO é armazenado no registrador PC.",
  },
  execJmpN: {
    phase: "Execução",
    text: "A Unidade de Controle verifica se o valor do registrador ACC é menor que zero. Caso seja, o valor do OPERANDO é armazenado no registrador PC.",
  },
  checkForInterruptions: {
    phase: "Execução",
    text: "A Unidade de Controle verifica se há interrupções para desviar a rotina de instruções. Caso não haja interrupções, inicia o ciclo de busca novamente.",
  },
};
