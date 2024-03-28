import React from "react";

import Ram from "./Ram/Ram";
import Register from "./Registers/Register";
import Alu from "./Registers/Alu";
import DecodeUnit from "./DecodeUnit/DecodeUnit";
import Description from "./Description/Description";

import { description } from "../../script/cpuScript"

import "./styles.scss";

const Simulator = ({
  handleOpenModal,
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
        <Register id={"pc"} name={"pc"} value={pcValue} handleOpenModal={handleOpenModal}/>
        <Register id={"mar"} name={"mar"} value={marValue} handleOpenModal={handleOpenModal}/>
        <Register id={"mdr"} name={"mdr"} value={mdrValue} handleOpenModal={handleOpenModal}/>
        <Alu />
        <Register id={"acc"} name={"acc"} value={accValue} handleOpenModal={handleOpenModal}/>
        <Register id={"cir"} name={"cir"} value={cirValue} handleOpenModal={handleOpenModal}/>
      </div>
      <DecodeUnit />
    </div>
    <Description description={description}/>
    </>
  );
};

export default Simulator;
