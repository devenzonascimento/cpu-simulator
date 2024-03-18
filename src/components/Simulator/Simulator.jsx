import React from "react";

import DecodeUnit from "./DecodeUnit/DecodeUnit";
import Ram from "./Ram/Ram";
import Alu from "./Registers/Alu";
import Register from "./Registers/Register";

import "./styles.scss";

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
      <Ram memory={memoryValue} UpdateMemory={UpdateMemory} />
      <div className="registers-container">
        <Register id={"pc"} name={"ci"}  value={pcValue} />
        <Register id={"mar"} name={"rem"} value={marValue} />
        <Register id={"mdr"} name={"mbr"} value={mdrValue} />
        <Alu />
        <Register id={"acc"} name={"acm"} value={accValue} />
        <Register id={"cir"} name={"ri"}  value={cirValue} />
      </div>
      <DecodeUnit />
    </div>
  );
};

export default Simulator;
