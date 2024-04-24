import { useState } from "react";

const useInfoModal = () => {
  const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);

  const [information, setInformations] = useState({});

  const modalInformation = {
    pc: {
      title: "Program Counter - PC",
      body: "Também conhecido como (CI) Contador de Instruções, é um registrador que contém o endereço da próxima instrução a ser executada na memória principal. Durante o ciclo de busca, a CPU utiliza o valor armazenado no PC para obter o endereço da próxima instrução.",
    },
    mar: {
      title: "Memory Address Register - MAR",
      body: "Também conhecido como (REM) Registrador de Endereço de Memória, é um registrador utilizado para armazenar o endereço de memória para leitura ou escrita. Durante a fase de busca, o PC transfere o endereço da próxima instrução para o MAR, que então é utilizado para acessar a memória principal.",
    },
    mdr: {
      title: "Memory Data Register - MDR",
      body: "Também conhecido como (RDM) Registrador de Dados da Memória, é um registrador utilizado para armazenar temporariamente dados que são lidos ou escritos na memória principal. Durante a fase de busca, o conteúdo da memória no endereço especificado pelo MAR é transferido para o MDR, onde a instrução é temporariamente armazenada antes de ser transferida para (CIR) Registrador de Instruções.",
    },
    acc: {
      title: "Accumulator - ACC",
      body: "Também conhecido como (ACM) Acumulador ou (RR) Registro de Resultado, é um registrador especial utilizado para armazenar temporariamente dados durante operações aritméticas e lógicas realizadas pela CPU. Ele é frequentemente usado como um registro para armazenar resultados intermediários ou finais de operações.",
    },
    cir: {
      title: "Current Instruction Register - CIR",
      body: "Também conhecido como (RI) Registrador de Instruções, é um registrador utilizado para armazenar temporariamente a instrução atual que está sendo executada pela CPU. Durante a fase de busca, a instrução lida da memória é transferida para o CIR, onde será decodificada e posteriormente executada.",
    },
    alu: {
      title: "Arithmetic Logic Unit - ALU",
      body: "Também conhecida como Unidade Lógica Aritmética (ULA) é um componente crucial em uma CPU responsável por realizar operações aritméticas (como adição, subtração, multiplicação e divisão) e operações lógicas (como AND, OR, NOT) em dados. Ela executa as instruções aritméticas e lógicas determinadas pela Unidade de Controle da CPU.",
    },
    decode: {
      title: "Decode",
      body: "Também conhecido como Decodificador é um componente da CPU responsável por interpretar as instruções recebidas da memória ou cache. Ele decodifica o código da instrução para determinar a operação a ser realizada, os operandos envolvidos e os registradores que serão utilizados. O decodificador prepara os sinais de controle necessários para executar a instrução.",
    },
    memory: {
      title: "Memory",
      body: "A Memória é um componente essencial de um sistema de computador que armazena dados e instruções temporariamente durante a execução de um programa e fornece acesso rápido aos dados para a CPU. Ela é acessada pela CPU durante a fase de busca e execução de instruções.",
    },
  };

  const handleOpenInfoModal = (cpuComponentName) => {
    setInformations(modalInformation[cpuComponentName]);
    setIsOpenInfoModal(true);
  };

  const handleCloseInfoModal = () => {
    setIsOpenInfoModal(!isOpenInfoModal);
  };

  const handleInfoModalToggle = () => {
    setIsOpenInfoModal(!isOpenInfoModal);
  };

  return {
    isOpenInfoModal,
    handleOpenInfoModal,
    handleCloseInfoModal,
    information,
  };
};

export default useInfoModal;
