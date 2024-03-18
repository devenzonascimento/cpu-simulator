import React from "react";

import { IoPlaySkipForward, IoPlay } from "react-icons/io5";

import { buttonAnimation } from "./animations";

import "./styles.scss";

const Settings = ({
  updateValues,
  clearCPU,
  clearMemory,
  executeNextStep,
  executeComplete,
  chooseProgram,
}) => {
  const handleClearMemory = () => {
    clearMemory();
    updateValues();
  };

  const handleClearCPU = () => {
    clearCPU();
    updateValues();
  };

  const handleNextStep = () => {
    executeNextStep();
    updateValues();
  };
  
  const handleRun = () => {
    // Não está pronta pra ser implementado
    executeComplete();
    updateValues();
  };

  return (
    <div className="settings-container">
      <div className="mini-container">
        <button className="button" onClick={handleClearMemory}>
          Limpar Memória
        </button>
        <button className="button" onClick={handleClearCPU}>
          Limpar CPU
        </button>
        <nav onClick={buttonAnimation}>
          <span className="program-button" onClick={buttonAnimation}>
            Programas
          </span>
          <ul className="program-list">
            <li onClick={() => chooseProgram(0)}>Soma</li>
            <li onClick={() => chooseProgram(1)}>Subtração</li>
            <li onClick={() => chooseProgram(2)}>Maior Numero</li>
          </ul>
        </nav>
      </div>

      <div className="mini-container">
        <button className="button">
          Rodar
          <IoPlay />
        </button>
        <button className="button" onClick={handleNextStep}>
          Proximo Passo
          <IoPlaySkipForward />
        </button>
      </div>
    </div>
  );
};

export default Settings;
