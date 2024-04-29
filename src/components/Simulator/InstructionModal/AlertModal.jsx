import { MdOutlineClose } from "react-icons/md";

const AlertModal = ({ onClose, data }) => {

  setTimeout(() => {
    onClose()
  }, 3000);

  return (
    <div className="alert-modal-container">
      <MdOutlineClose className="close-icon" onClick={onClose} />
        <h2>{data}</h2>
    </div>
  );
};

export default AlertModal;
