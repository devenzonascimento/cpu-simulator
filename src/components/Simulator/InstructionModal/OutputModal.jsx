import { MdOutlineClose } from "react-icons/md";

const OutputModal = ({ onClose, data }) => {
  return (
    <div className="output-modal-container">
      <MdOutlineClose className="close-icon" onClick={onClose} />
      <h2>Dispositivo de Saída</h2>
      <span className="output-value">{data}</span>
    </div>
  );
};

export default OutputModal;
