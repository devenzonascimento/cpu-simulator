import React from "react";

import { MdInfoOutline } from "react-icons/md";

import "./styles.scss"

const Register = ({ id, value, handleOpenModal }) => {

  return (
    <div className={`register-container ${id}`}>
      <span className="register-name">{id}</span>
      <span className="register-value">{value}</span>
      <MdInfoOutline className="info-icon" onClick={() => handleOpenModal(id)}/>
    </div>
  );
};

export default Register;
