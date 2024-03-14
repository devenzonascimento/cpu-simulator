import React, { useState } from "react";

import Settings from "./components/Settings/Settings";
import DebugWindow from "./components/DebugWindow/DebugWindow";
import Simulator from "./components/Simulator/Simulator";


import * as Cpu from "./script/cpuScript"

const App = () => {
  
  const [memoryValue, setMemoryValue] = useState(Cpu.memory);
  const [pcValue, setPcValue] = useState("00000000");
  const [marValue, setMarValue] = useState("00000000");
  const [mdrValue, setMdrValue] = useState("00000000");
  const [accValue, setAccValue] = useState("00000000");
  const [cirValue, setCirValue] = useState("00000000");

  const handleUpdateMemory = (newMemory) => {
    setMemoryValue({ ...newMemory });
    Cpu.memory = newMemory
  };

  const updateValues = () => {
    setPcValue(Cpu.pc);
    setMarValue(Cpu.mar);
    setMdrValue(Cpu.mdr);
    setAccValue(Cpu.acc);
    setCirValue(Cpu.cir);
    setMemoryValue(Cpu.memory);
  } 

  return (
      <div className="container">
        <Settings />
        <DebugWindow updateValues={updateValues} executeNextStep={Cpu.executeNextStep} />
        <Simulator
        memoryValue = {memoryValue}
        pcValue = {pcValue}
        marValue = {marValue}
        mdrValue = {mdrValue}
        accValue = {accValue}
        cirValue = {cirValue}
        UpdateMemory  = {handleUpdateMemory}
        />
      </div>
  );
};

export default App;