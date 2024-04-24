import { useEffect, useState } from "react";

const useMemoryDataInput = (isModalOpen) => {
  const [inputValue, setInputValue] = useState("");

  const handleChangeInput = (newValue) => {
    newValue = newValue.replace(/[^0-1]/g, "");
    setInputValue(newValue);
  };

  const handleOpcodeClick = (value) => {
    setInputValue(value);
  };

  const handleAdressClick = (value) => {
    if (inputValue.length < 8) setInputValue((prev) => prev + value);
  };

  useEffect(() => {
    if (!isModalOpen) {
      setInputValue("");
    }
  }, [isModalOpen]);

  return {
    inputValue,
    handleChangeInput,
    handleOpcodeClick,
    handleAdressClick,
  };
};

export default useMemoryDataInput;
