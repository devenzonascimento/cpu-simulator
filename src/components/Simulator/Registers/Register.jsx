import React from "react";

import "./styles.scss"

const Register = ({ id, name, value }) => {
  return (
    <>
    <div className={`register-container ${id}`} id={id}>
      <h2 className="register-name">{name}</h2>
      <span className="register-value">{value}</span>
    </div>
    </>
  );
};

export default Register;
