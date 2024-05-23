import { MdInfoOutline } from "react-icons/md";

const Alu = ({ handleOpenInfoModal }) => {
  return (
    <div className="alu-container" id="alu">
      <div className="alu-polygon">
        <span>ALU</span>
        <MdInfoOutline className="info-icon" onClick={() => handleOpenInfoModal("alu")}/>
      </div>
    </div>
  );
};

export default Alu;
