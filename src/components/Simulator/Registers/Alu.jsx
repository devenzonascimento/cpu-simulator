import React from "react";

import { MdInfoOutline } from "react-icons/md";

const Alu = ({ handleOpenModal }) => {
  return (
    <div className="alu-container" id="alu">
      <div className="alu-polygon">
        <span>ULA</span>
        <MdInfoOutline className="info-icon" onClick={() => handleOpenModal("alu")}/>
      </div>
    </div>
  );
};

export default Alu;
