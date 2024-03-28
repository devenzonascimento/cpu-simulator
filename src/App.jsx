import React, { useState } from "react";

import Settings from "./components/Settings/Settings";
import Simulator from "./components/Simulator/Simulator";
import InfoModal from "./components/Simulator/InfoModal/InfoModal";

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

  const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);

  const [information, setInformations] = useState({
    title: "(MAR) - Memory Address Register",
    body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit distinctio nesciunt, maxime consequatur facere quis similique vero. Aspernatur hic, velit labore sint, iusto accusantium ab corporis sit sapiente, omnis excepturi?",
  });


  const handleOpenModal = (newInformation) => {
    setInformations(newInformation)
    setIsOpenInfoModal(true);
  };

  const handleCloseModal = (event) => {
    const background = document.querySelector(".backdrop");
    const closeIcon = document.querySelector(".close-icon");

    if (event.target === background || event.target === closeIcon) {
      setIsOpenInfoModal(false);
    }
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
          handleOpenModal={handleOpenModal}
          memoryValue={memoryValue}
          pcValue={pcValue}
          marValue={marValue}
          mdrValue={mdrValue}
          accValue={accValue}
          cirValue={cirValue}
          UpdateMemory={handleUpdateMemory}
        />
        <InfoModal
          isOpenInfoModal={isOpenInfoModal}
          handleCloseModal={handleCloseModal}
        />
      </div>
      <footer></footer>
    </>
  );
};

export default App;
