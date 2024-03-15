import React, { useState } from "react";

import Settings from "./components/Settings/Settings";
import DebugWindow from "./components/DebugWindow/DebugWindow";
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
    Cpu.chooseProgram(programIndex)
    console.log(Cpu.memory)
    setMemoryValue(add);
  };

  const handleUpdateMemory = (newMemory) => {
    setMemoryValue({ ...newMemory });
    Cpu.updateMemory(newMemory)
  };

  const updateValues = () => {
    setPcValue(Cpu.pc);
    setMarValue(Cpu.mar);
    setMdrValue(Cpu.mdr);
    setAccValue(Cpu.acc);
    setCirValue(Cpu.cir);
    setMemoryValue(Cpu.memory);
  };

  return (
    <div className="container">
      <Settings />
      <DebugWindow
        executeNextStep={Cpu.executeNextStep}
        updateValues={updateValues}
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
  );
};

export default App;


let blank = {
  "00000000": "00000000",
  "00000001": "00000000",
  "00000010": "00000000",
  "00000011": "00000000",
  "00000100": "00000000",
  "00000101": "00000000",
  "00000110": "00000000",
  "00000111": "00000000",
  "00001000": "00000000",
  "00001001": "00000000",
  "00001010": "00000000",
  "00001011": "00000000",
  "00001100": "00000000",
  "00001101": "00000000",
  "00001110": "00000000",
  "00001111": "00000000",
}

let add = {
  "00000000": "10010001",
  "00000001": "00111111",
  "00000010": "10010001",
  "00000011": "00011111",
  "00000100": "10010010",
  "00000101": "00000000",
  "00000110": "00000000",
  "00000111": "00000000",
  "00001000": "00000000",
  "00001001": "00000000",
  "00001010": "00000000",
  "00001011": "00000000",
  "00001100": "00000000",
  "00001101": "00000000",
  "00001110": "00000000",
  "00001111": "00000000",
}
