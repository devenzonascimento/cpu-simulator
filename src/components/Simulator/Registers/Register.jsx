import React from "react";

import { MdInfoOutline } from "react-icons/md";

import "./styles.scss"

const Register = ({ id, name, value, handleOpenModal }) => {

  const registerInformation = {
    "pc": {
      "title": "Program Counter - PC",
      "body": "O Program Counter (PC) é um registrador que contém o endereço da próxima instrução a ser executada na memória principal. Durante o ciclo de busca, a CPU utiliza o valor armazenado no PC para obter o endereço da próxima instrução."
    },
    "mar": {
      "title": "Memory Address Register - MAR",
      "body": "O Memory Address Register (MAR) é um registrador utilizado para armazenar o endereço de memória para leitura ou escrita. Durante a fase de busca, o PC transfere o endereço da próxima instrução para o MAR, que então é utilizado para acessar a memória principal."
    },
    "mdr": {
      "title": "Memory Data Register - MDR",
      "body": "O Memory Data Register (MDR) é um registrador utilizado para armazenar temporariamente dados que são lidos ou escritos na memória principal. Durante a fase de busca, o conteúdo da memória no endereço especificado pelo MAR é transferido para o MDR, onde a instrução é temporariamente armazenada antes de ser transferida para o registrador de instrução (CIR)."
    },
    "acc": {
      "title": "Accumulator - ACC",
      "body": "O Accumulator (ACC) é um registrador especial utilizado para armazenar temporariamente dados durante operações aritméticas e lógicas realizadas pela CPU. Ele é frequentemente usado como um registro para armazenar resultados intermediários ou finais de operações."
    },
    "cir": {
      "title": "Current Instruction Register - CIR",
      "body": "O Current Instruction Register (CIR) é um registrador utilizado para armazenar temporariamente a instrução atual que está sendo executada pela CPU. Durante a fase de busca, a instrução lida da memória é transferida para o CIR, onde será decodificada e posteriormente executada."
    }
  }
  
  
  return (
    <div className={`register-container ${id}`} id={id}>
      <span className="register-name">{name}</span>
      <span className="register-value">{value}</span>
      <MdInfoOutline className="info-icon" onClick={() => handleOpenModal(registerInformation[id])}/>
    </div>
  );
};

export default Register;
