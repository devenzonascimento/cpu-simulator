import useCloseOutsideClick from "../../../hooks/useCloseOutsideClick";

import { MdOutlineClose } from "react-icons/md";

import "./styles.scss";
import DecodeInstructions from "./instructions";

const InfoModal = ({ isOpenInfoModal, handleCloseInfoModal, information }) => {
  const backdropRef = useCloseOutsideClick(handleCloseInfoModal);

  return (
    <>
      {isOpenInfoModal && (
        <div className="modal-backdrop" ref={backdropRef}>
          <div className="info-modal-container">
            <h1 className="info-modal-title">{information?.title}</h1>
            <div className="info-modal-body">
              <p>{information?.body}</p>
              {information.title == "Decode" && <DecodeInstructions />}
            </div>
            <button className="close-button" onClick={handleCloseInfoModal}>
              <MdOutlineClose className="close-icon" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoModal;
