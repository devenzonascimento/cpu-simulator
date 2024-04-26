import useCloseOutsideClick from "../../../../hooks/useCloseOutsideClick.js";
import useMemoryDataInput from "../../../../hooks/useMemoryDataInput.js";

import InstructionTable from "./InstructionTable.jsx";

import "./styles.scss";

const ModalMemoryEditor = ({
  isOpen,
  handleCloseModal,
  handleWriteMemory,
  address,
}) => {
  const {
    inputValue,
    handleChangeInput,
    handleOpcodeClick,
    handleAdressClick,
  } = useMemoryDataInput(isOpen);

  const backdropRef = useCloseOutsideClick(handleCloseModal);

  const handleConfirm = () => {
    if (inputValue == "") return;
    handleWriteMemory(address, inputValue);
    handleCloseModal();
  };

  return (
    <>
      {isOpen && (
        <div className="modal-backdrop" ref={backdropRef}>
          <dialog className="modal-container" open>
            <h1>Controlador de Memória</h1>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleConfirm()
              }}
              className="form-container"
            >
              <InstructionTable
                handleOpcodeClick={handleOpcodeClick}
                handleAdressClick={handleAdressClick}
              />
              <div className="input-field">
                <div className="address-identifier">
                  <span>Célula</span>
                  <span>{address}</span>                   
                </div>
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
