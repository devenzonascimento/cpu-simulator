import React, { useState } from "react";
import Row from "./Row";

import "./styles.scss";

const Ram = ({ memory, onAtualizarMemory }) => {

  const [memoryEditavel, setMemoryEditavel] = useState(memory);

  const handleEditar = (endereco, novoValor) => {
    const novaMemory = memoryEditavel;
    novaMemory[endereco] = novoValor;

    setMemoryEditavel(novaMemory);
    onAtualizarMemory(memoryEditavel);
  };

  return (
      <div className="ram-container">
        <table className="ram-table">
        <caption className="ram-caption">MEMÓRIA RAM</caption>
          <thead>
            <tr>
              <th>Endereço</th>
              <th>Dado</th>
            </tr>
          </thead>
          <tbody>
              <Row memoryEditavel={memoryEditavel} handleEditar={handleEditar}/>
          </tbody>
        </table>
      </div>
  );
};

export default Ram;
