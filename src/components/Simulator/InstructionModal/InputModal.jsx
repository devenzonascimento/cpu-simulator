import useInputDecimal from "../../../hooks/useInputDecimal";

import { LuBinary } from "react-icons/lu";

import "./styles.scss";

const InputModal = ({ onClose }) => {
  const { decimalValue, binaryValue, updateValidateInput, inputFocusRef } =
    useInputDecimal();

  const handleConfirmValue = () => {
    onClose(decimalValue);
  };

  return (
    <div className="input-modal-container">
      <h2>Dispositivo de Entrada</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleConfirmValue();
        }}
      >
        <div className="input-field">
          <label htmlFor="decimal-input">Digite um número:</label>
          <input
            ref={inputFocusRef}
            id="decimal-input"
            placeholder="13"
            maxLength={4}
            value={decimalValue}
            onChange={({ target }) => updateValidateInput(target.value)}
          />
          <span>Min: -127 | Max: 127</span>
        </div>

        <div className="binary-field">
          <LuBinary className="binary-icon" />
          <span className="binary-output">{binaryValue}</span>
        </div>

        <button>Enviar</button>
      </form>
    </div>
  );
};

export default InputModal;
