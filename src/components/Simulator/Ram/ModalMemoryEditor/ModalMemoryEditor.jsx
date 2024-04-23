import { useState } from "react";
import InstructionTable from "./InstructionTable.jsx"
import "./styles.scss";

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

  const handleFormSubmit = () => {
    if (inputValue == "") return
    handleWriteMemory(address, inputValue);
    handleCloseModal();
    handleChangeInput("");
  };

  const handleOpcodeClick = (value) => {
    setInputValue(value)
  };

  const handleAdressClick = (value) => {
    setInputValue(prev => prev + value)
  };
  
  return (
    <>
      {isOpen && (
        <div className="modal-backdrop">
          <dialog className="modal-container" open>
            <h1>Controlador de Memória</h1>

            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="form-container"
            >
              <InstructionTable handleOpcodeClick={handleOpcodeClick} handleAdressClick={handleAdressClick}/>
              <div className="input-field">
                <span>Insira a instrução:</span>
                <input
                  maxLength={8}
                  value={inputValue}
                  placeholder="00001101"
                  onChange={({ target }) => handleChangeInput(target.value)}
                />
              </div>
              <button onClick={handleFormSubmit}>Gravar na Memória</button>
            </form>
          </dialog>
        </div>
      )}
    </>
  );
};

export default ModalMemoryEditor;
