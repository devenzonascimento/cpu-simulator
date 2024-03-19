import React from "react";

import { MdInfoOutline } from "react-icons/md";

import "./styles.scss"

const Register = ({ id, name, value }) => {
  return (
    <>
    <div className={`register-container ${id}`} id={id}>
      <span className="register-name">{name}</span>
      <span className="register-value">{value}</span>
      <MdInfoOutline className="info-icon"/>
    </div>
    </>
  );
};

export default Register;
