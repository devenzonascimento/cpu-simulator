import React from "react";

import "./styles.scss"

const Register = ({ name, value }) => {
  return (
    <>
    <div className={`register-container ${name}`}>
      <h2 className="register-name">{name}</h2>
      <span className="register-value">{value}</span>
    </div>
    </>
  );
};

export default Register;
