const OutputModal = ({ onClose }) => {

  const confirmValue = () => {
    onClose("");
  };

  return (
    <div className="prompt-container">
      <span className="prompt-title">Output:</span>
    
      <button className="prompt-button" onClick={confirmValue}>
        Confirmar
      </button>
    </div>
  );
};

export default OutputModal