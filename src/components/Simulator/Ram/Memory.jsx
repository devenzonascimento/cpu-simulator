import React from "react";

import MemoryRow from "./MemoryRow";

import { MdInfoOutline } from "react-icons/md";

import "./styles.scss";

const Memory = ({ memory, UpdateMemory, handleOpenModal }) => {

  const handleEditMemory = (address, newValue) => {
    newValue = newValue.replace(/[^0-1]/g, '')

    const newMemory = memory;
    newMemory[address] = newValue;

    UpdateMemory(newMemory);
  };

  return (
      <div className="memory-container">
        <table className="memory-table">
        <caption className="memory-caption">MEMORY</caption>
          <thead>
            <tr>
              <th>Endereço</th>
              <th>Dado</th>
            </tr>
          </thead>
          <tbody>
              <MemoryRow memory={memory} handleEditMemory={handleEditMemory}/>
          </tbody>
        </table>
        <MdInfoOutline className="info-icon" onClick={() => handleOpenModal("memory")}/>
      </div>
  );
};

export default Memory;
