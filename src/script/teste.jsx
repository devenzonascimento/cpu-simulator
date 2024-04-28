import { useState } from "react";
import { createRoot } from "react-dom/client";

const PromptModal = ({ onClose }) => {
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

export const openModalPrompt = async () => {
  return new Promise((resolve) => {
    const modal = document.createElement("div");
    modal.classList.add("modal-backdrop");
    
    const modalRoot = document.getElementById("root");
    modalRoot.appendChild(modal);

    const onClose = (value) => {
      modalRoot.removeChild(modal);
      resolve(value);
    };

    createRoot(modal).render(<PromptModal onClose={onClose} />);
  });
};
