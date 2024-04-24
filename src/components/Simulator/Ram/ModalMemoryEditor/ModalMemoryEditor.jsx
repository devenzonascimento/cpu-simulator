import { useState } from "react";
import InstructionTable from "./InstructionTable.jsx";
import "./styles.scss";
import useCloseOutsideClick from "../../../../hooks/useCloseOutsideClick.js";

const ModalMemoryEditor = ({
  isOpen,
  handleCloseModal,
  handleWriteMemory,
  address,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleChangeInput = (newValue) => {
    newValue = newValue.replace(/[^0-1]/g, "");
    setInputValue(newValue);
  };

  const handleConfirm = () => {
    if (inputValue == "") return;
    handleWriteMemory(address, inputValue);
    handleCloseModal();
    handleChangeInput("");
  };

  const handleOpcodeClick = (value) => {
    setInputValue(value);
  };

  const handleAdressClick = (value) => {
    if (inputValue.length < 8) setInputValue((prev) => prev + value);
  };

  const backdropRef = useCloseOutsideClick(handleCloseModal)

  return (
    <>
      {isOpen && (
        <div className="modal-backdrop" ref={backdropRef}>
          <dialog className="modal-container" open>
            <h1>Controlador de Memória</h1>

            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="form-container"
            >
              <InstructionTable
                handleOpcodeClick={handleOpcodeClick}
                handleAdressClick={handleAdressClick}
              />
              <div className="input-field">
                <span>Digite a instrução:</span>
                <input
                  maxLength={8}
                  value={inputValue}
                  placeholder="00001101"
                  onChange={({ target }) => handleChangeInput(target.value)}
                />
              </div>
              <button onClick={handleConfirm}>Gravar na Memória</button>
            </form>
          </dialog>
        </div>
      )}
    </>
  );
};

export default ModalMemoryEditor;
