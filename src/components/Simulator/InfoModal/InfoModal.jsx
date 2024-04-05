import React from "react";

import { MdOutlineClose } from "react-icons/md";

import "./styles.scss";

const InfoModal = ({ isOpenInfoModal, handleCloseModal, information }) => {
  if (isOpenInfoModal) {
    return (
      <div className="backdrop" onClick={handleCloseModal}>
        <div className="info-modal-container">
          <h1 className="info-modal-title">{information?.title}</h1>
          <p className="info-modal-body">{information?.body}</p>
          <button className="close-button" onClick={handleCloseModal}>
            <MdOutlineClose className="close-icon" />
          </button>
        </div>
      </div>
    );
  }
};

export default InfoModal;
