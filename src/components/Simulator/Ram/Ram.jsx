import React from "react";
import Row from "./Row";

import "./styles.scss";

const Ram = ({ memory, UpdateMemory }) => {

  const handleEditar = (endereco, novoValor) => {
    novoValor = novoValor.replace(/[^0-1]/g, '')
    const novaMemory = memory;
    novaMemory[endereco] = novoValor;

    UpdateMemory(novaMemory);
  };

  return (
      <div className="ram-container">
        <table className="ram-table">
        <caption className="ram-caption">MEMÓRIA</caption>
          <thead>
            <tr>
              <th>Endereço</th>
              <th>Dado</th>
            </tr>
          </thead>
          <tbody>
              <Row memory={memory} handleEditar={handleEditar}/>
          </tbody>
        </table>
      </div>
  );
};

export default Ram;
