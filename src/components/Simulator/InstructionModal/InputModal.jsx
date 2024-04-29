import { useState } from "react";

const InputModal = ({ onClose }) => {
  const [value, setValue] = useState("");

  const confirmValue = () => {
    onClose(value);
  };

  return (
    <div className="prompt-container">
      <span className="prompt-title">Digite um Numero:</span>
      <input
        className="prompt-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="prompt-button" onClick={confirmValue}>
        Confirmar
      </button>
    </div>
  );
};

export default InputModal