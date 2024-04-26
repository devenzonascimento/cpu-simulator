import { MdInfoOutline } from "react-icons/md";

import "./styles.scss"

const Register = ({ id, value, handleOpenInfoModal }) => {

  return (
    <div className={`register-container ${id}`}>
      <span className="register-name">{id}</span>
      <span className="register-value">{value}</span>
      <MdInfoOutline className="info-icon" onClick={() => handleOpenInfoModal(id)}/>
    </div>
  );
};

export default Register;
