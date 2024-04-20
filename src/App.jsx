import React, { useState } from "react";

import Settings from "./components/Settings/Settings";
import Simulator from "./components/Simulator/Simulator";

import * as Cpu from "./script/cpuScript";

const App = () => {
  const [memoryValue, setMemoryValue] = useState(Cpu.memory);
  const [pcValue, setPcValue] = useState("00000000");
  const [marValue, setMarValue] = useState("00000000");
  const [mdrValue, setMdrValue] = useState("00000000");
  const [accValue, setAccValue] = useState("00000000");
  const [cirValue, setCirValue] = useState("00000000");

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
        <Settings
          updateValues={updateValues}
          clearCPU={Cpu.clearCPU}
          clearMemory={Cpu.clearMemory}
          executeNextStep={Cpu.executeNextStep}
          chooseProgram={handleChooseProgram}
        />
        <Simulator
          memoryValue={memoryValue}
          pcValue={pcValue}
          marValue={marValue}
          mdrValue={mdrValue}
          accValue={accValue}
          cirValue={cirValue}
          UpdateMemory={handleUpdateMemory}
        />
      </div>
    </>
  );
};

export default App;
