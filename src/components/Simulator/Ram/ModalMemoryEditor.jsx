import { useState } from "react";

const ModalMemoryEditor = ({ isOpen, handleCloseModal, handleWriteMemory, address }) => {
  const [inputValue, setInputValue] = useState();


  const handleInput = (newValue) => {
    newValue = newValue.replace(/[^0-1]/g, "");
    setInputValue(newValue);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault()
    handleWriteMemory(address, inputValue)
    handleCloseModal()
    handleInput("")
  }

  return (
    <>
      {isOpen && (
        <div className="modal-backdrop">
          <dialog className="modal" open>
            <form onSubmit={handleFormSubmit}>
              <h2>Insira um instrução</h2>
              <input
                maxLength={8}
                value={inputValue}
                onChange={({ target }) => handleInput(target.value)}
              />
              <button >
                Gravar na Memória
              </button>
            </form>
          </dialog>
        </div>
      )}
    </>
  );
};

export default ModalMemoryEditor;
