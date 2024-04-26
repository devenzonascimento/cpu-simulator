import { useCpu } from "../../context/CpuContext";

import { buttonAnimation } from "./animations"; // Remover isso e refazer o botão

import { IoPlaySkipForward, IoPlay } from "react-icons/io5";

import "./styles.scss";

const Settings = () => {
  const {
    programInProgress,
    handleRunProgram,
    handleRunProgramOnSteps,
    handleClearCPU,
    handleClearMemory,
    handleSwitchProgram,
  } = useCpu();

  return (
    <header className="settings-container">
      <nav onClick={buttonAnimation}>
        <span onClick={buttonAnimation}>Programas</span>

        <ul className="programs-list">
          <li onClick={() => handleSwitchProgram(1)}>Soma</li>
          <li onClick={() => handleSwitchProgram(2)}>Subtração</li>
          <li onClick={() => handleSwitchProgram(3)}>Maior Numero</li>
        </ul>
      </nav>

      <button className="clear-cpu-button" onClick={handleClearMemory}>
        Limpar Memória
      </button>

      <button className="clear-ram-button" onClick={handleClearCPU}>
        Limpar CPU
      </button>

      <button
        className="run-button"
        onClick={handleRunProgram}
        disabled={programInProgress}
      >
        <span>Rodar</span>
        <IoPlay />
      </button>

      <button className="step-button" onClick={handleRunProgramOnSteps}>
        <span>Proximo Passo</span>
        <IoPlaySkipForward />
      </button>
    </header>
  );
};

export default Settings;
