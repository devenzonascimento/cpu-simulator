import React, { useState } from "react";

import { IoPlaySkipForward, IoPlay } from "react-icons/io5";

import { buttonAnimation } from "./animations";

import "./styles.scss";

const Settings = ({
  updateValues,
  clearCPU,
  clearMemory,
  executeNextStep,
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

  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);

    let executionInterval = setInterval(() => {
      if (executeNextStep()) {
        updateValues();
      } else {
        clearInterval(executionInterval);
        setIsRunning(false);
      }
    }, 1000);
  };

  return (
    <div className="settings-container">
      <nav onClick={buttonAnimation}>
        <span onClick={buttonAnimation}>Programas</span>

        <ul className="programs-list">
          <li onClick={() => chooseProgram(0)}>Soma</li>
          <li onClick={() => chooseProgram(1)}>Subtração</li>
          <li onClick={() => chooseProgram(2)}>Maior Numero</li>
        </ul>
      </nav>

      <button className="clear-cpu-button" onClick={handleClearMemory}>
        Limpar Memória
      </button>

      <button className="clear-ram-button" onClick={handleClearCPU}>
        Limpar CPU
      </button>

      <button className="run-button" onClick={handleRun} disabled={isRunning}>
        <span>Rodar</span>
        <IoPlay />
      </button>

      <button className="step-button" onClick={handleNextStep}>
        <span>Proximo Passo</span>
        <IoPlaySkipForward />
      </button>
    </div>
  );
};

export default Settings;
