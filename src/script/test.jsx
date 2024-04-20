import React, { useState } from 'react';

function Modal({ onClose, onConfirm }) {
  const [inputValue, setInputValue] = useState('');

  const handleConfirm = () => {
    onConfirm(inputValue);
    onClose();
  };

  return (
    <div className="modal">
      <input 
        type="text" 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
      />
      <button onClick={handleConfirm}>Confirmar</button>
    </div>
  );
}





























function ModalWrapper() {
  const [showModal, setShowModal] = useState(false);
  const [resolveFn, setResolveFn] = useState(null);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const solicitarValor = () => {
    return new Promise((resolve, reject) => {
      openModal();
      setResolveFn(() => resolve);
    });
  };

  const exemplo = async () => {
    return await solicitarValor();
  };

  const handleConfirm = (value) => {
    if (resolveFn) {
      resolveFn(value);
      setResolveFn(null);
    }
  };

  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <button onClick={() => {
        const value = exemplo()
        console.log(value)
      }}>Abrir Modal</button>
      {showModal && (
        <div className="modal">
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
        />
        <button onClick={() => {
            handleConfirm(inputValue)
            closeModal()
        }}>Confirmar</button>
      </div>
      )}
    </div>
  );
}

export default ModalWrapper;

