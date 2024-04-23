import React, { useState } from "react";

import Settings from "./components/Settings/Settings";
import Simulator from "./components/Simulator/Simulator";

import * as Cpu from "./script/cpuScript";
import { CpuProvider } from "./context/CpuContext";

const App = () => {
  const [memoryValue, setMemoryValue] = useState(Cpu.memory);

  const handleChooseProgram = (programIndex) => {
    Cpu.chooseProgram(programIndex);
    updateValues();
  };

  const handleUpdateMemory = (newMemory) => {
    setMemoryValue({ ...newMemory });
    Cpu.updateMemory(newMemory);
  };

  const updateValues = () => {
    handleUpdateMemory(Cpu.memory);
    setPcValue(Cpu.pc);
    setMarValue(Cpu.mar);
    setMdrValue(Cpu.mdr);
    setAccValue(Cpu.acc);
    setCirValue(Cpu.cir);
  };

  return (
    <>
      <header>
        <h1>CPU Simulator</h1>
      </header>
      <div className="container">
        <CpuProvider>
          <Settings />
          <Simulator UpdateMemory={handleUpdateMemory} />
        </CpuProvider>
      </div>
    </>
  );
};

export default App;
