import React from "react";

import DecodeUnit from "./DecodeUnit/DecodeUnit";
import Ram from "./Ram/Ram";
import Alu from "./Registers/Alu";
import Register from "./Registers/Register";

import "./styles.scss"

const Simulator = ({
  memoryValue,
  pcValue,
  marValue,
  mdrValue,
  accValue,
  cirValue,
  UpdateMemory,
}) => {

  return (
    <div className="simulator-container">
      <Ram memory={memoryValue} onAtualizarMemory={UpdateMemory} />
      <div className="registers-container">
        <Register name={"pc"} value={pcValue} />
        <Register name={"mar"} value={marValue} />
        <Register name={"mdr"} value={mdrValue} />
        <Alu />
        <Register name={"acc"} value={accValue} />
      </div>
      <div className="decode-cir-container">
        <Register name={"cir"} value={cirValue} />
        <DecodeUnit />
      </div>
    </div>
  );
};

export default Simulator;
