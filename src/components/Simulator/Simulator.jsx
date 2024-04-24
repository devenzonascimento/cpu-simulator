import { useCpu } from "../../context/CpuContext";

import Memory from "./Ram/Memory";
import Register from "./Registers/Register";
import Alu from "./Registers/Alu";
import DecodeUnit from "./DecodeUnit/DecodeUnit";
import Description from "./Description/Description";
import InfoModal from "./InfoModal/InfoModal";

import "./styles.scss";
import useInfoModal from "../../hooks/useInfoModal";

const Simulator = () => {
  const {
    memoryValue,
    pcValue,
    marValue,
    mdrValue,
    accValue,
    cirValue,
    phaseDescription,
  } = useCpu();

  const {
    isOpenInfoModal,
    handleOpenInfoModal,
    handleCloseInfoModal,
    information,
  } = useInfoModal()

  return (
    <>
      <section className="simulator-container">
        <Memory
          memory={memoryValue}
          handleOpenInfoModal={handleOpenInfoModal}
        />
        <div className="registers-container">
          <Register
            id={"pc"}
            value={pcValue}
            handleOpenInfoModal={handleOpenInfoModal}
          />
          <Register
            id={"mar"}
            value={marValue}
            handleOpenInfoModal={handleOpenInfoModal}
          />
          <Register
            id={"mdr"}
            value={mdrValue}
            handleOpenInfoModal={handleOpenInfoModal}
          />
          <Alu handleOpenInfoModal={handleOpenInfoModal} />
          <Register
            id={"acc"}
            value={accValue}
            handleOpenInfoModal={handleOpenInfoModal}
          />
          <Register
            id={"cir"}
            value={cirValue}
            handleOpenInfoModal={handleOpenInfoModal}
          />
        </div>
        <DecodeUnit handleOpenInfoModal={handleOpenInfoModal} />
      </section>
      <InfoModal
        isOpenInfoModal={isOpenInfoModal}
        handleCloseInfoModal={handleCloseInfoModal}
        information={information}
      />
      <Description description={phaseDescription} />
    </>
  );
};

export default Simulator;
