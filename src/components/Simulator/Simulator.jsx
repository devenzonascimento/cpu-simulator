import React from "react";

import Ram from "./Ram/Ram";
import Register from "./Registers/Register";
import Alu from "./Registers/Alu";
import DecodeUnit from "./DecodeUnit/DecodeUnit";
import Description from "./Description/Description";

import { description } from "../../script/cpuScript"

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
    <>
    <div className="simulator-container">
      <Ram memory={memoryValue} UpdateMemory={UpdateMemory} />
      <div className="registers-container">
        <Register id={"pc"} name={"pc"} value={pcValue} />
        <Register id={"mar"} name={"mar"} value={marValue} />
        <Register id={"mdr"} name={"mdr"} value={mdrValue} />
        <Alu />
        <Register id={"acc"} name={"acc"} value={accValue} />
        <Register id={"cir"} name={"cir"} value={cirValue} />
      </div>
      <DecodeUnit />
    </div>
    <Description description={description}/>
    </>
  );
};

export default Simulator;
