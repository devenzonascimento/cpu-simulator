import { useCpu } from "../../context/CpuContext";
import { useState } from "react";

import { IoPlaySkipForward, IoPlay } from "react-icons/io5";
import ProgramsList from "./ProgramsList";

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

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="settings-container">
      <ProgramsList isOpen={isOpen} OnClose={() => {setIsOpen(false)}} switchProgram={handleSwitchProgram}/>
      <button className="programs-button" onClick={() => setIsOpen(!isOpen)}>
        Programas
      </button>

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
