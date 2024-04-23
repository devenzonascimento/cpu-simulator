import { useState } from "react";

const useMemoryEditor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [memoryAddress, setMemoryAddress] = useState(Number);

  const handleOpenMemoryEditor = (address) => {
    setMemoryAddress(address)
    setIsOpen(true)
  };

  const handleCloseMemoryEditor = () => {
    setIsOpen(!isOpen)
  }
  return {
    isOpen,
    handleOpenMemoryEditor,
    handleCloseMemoryEditor,
    memoryAddress,
  };
};

export default useMemoryEditor;
