import React from "react";

import { MdOutlineClose } from "react-icons/md";

import "./styles.scss";

const InfoModal = ({ isOpenInfoModal, handleCloseModal, informations }) => {
  if (isOpenInfoModal) {
    return (
      <div className="backdrop" onClick={handleCloseModal}>
        <div className="info-modal-container">
          <h1 className="info-modal-title">{informations?.title}</h1>
          <p className="info-modal-body">{informations?.body}</p>
          <MdOutlineClose className="close-icon" onClick={handleCloseModal} />
        </div>
      </div>
    );
  }
};

export default InfoModal;
