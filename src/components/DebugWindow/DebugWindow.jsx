import React from "react";

import "./styles.scss";

const DubugWindow = ({ executeNextStep, updateValues }) => {
  const handleStepValues = () => {
    executeNextStep();
    updateValues();
  };

  return (
    <div className="debug-container">
      <button className="step-button" onClick={handleStepValues}>
        STEP
      </button>
    </div>
  );
};

export default DubugWindow;
