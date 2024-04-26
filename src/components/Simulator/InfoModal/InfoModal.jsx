import useCloseOutsideClick from "../../../hooks/useCloseOutsideClick";

import { MdOutlineClose } from "react-icons/md";

import "./styles.scss";

const InfoModal = ({ isOpenInfoModal, handleCloseInfoModal, information }) => {
  const backdropRef = useCloseOutsideClick(handleCloseInfoModal);

  return (
    <>
      {isOpenInfoModal && (
        <div className="modal-backdrop" ref={backdropRef}>
          <div className="info-modal-container">
            <h1 className="info-modal-title">{information?.title}</h1>
            <p className="info-modal-body">{information?.body}</p>
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
