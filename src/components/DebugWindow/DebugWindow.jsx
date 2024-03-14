import React from "react";

import { buttonAnimation } from "./animations"

import "./styles.scss";

const DebugWindow = ({ executeNextStep, updateValues, chooseProgram }) => {
  
  const handleStepValues = () => {
    executeNextStep();
    updateValues();
  };

  return (
    <div className="debug-container">
      <button className="step-button" onClick={handleStepValues}>
        STEPS
      </button>
      <nav onClick={buttonAnimation}>
      <span className="program-button" onClick={buttonAnimation}>
        PROGRAMAS
      </span>
        <ul className="program-list">
          <li onClick={() => chooseProgram(0)} >BLANK</li>
          <li onClick={() => chooseProgram(1)} >ADD</li>
          <li onClick={() => chooseProgram(2)} >SUB</li>
          <li onClick={() => chooseProgram(3)} >BIGGEST</li>
        </ul>
      </nav>
    </div>
  );
};

export default DebugWindow;
