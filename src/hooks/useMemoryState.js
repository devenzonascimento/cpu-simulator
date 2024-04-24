import { useState } from "react";

const useMemory = () => {
  
  const [memoryValue, setMemoryValue] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const updateMemory = (newMemory) => {
    setMemoryValue([...newMemory]);
  };

  return {
    memoryValue,
    updateMemory,
  };
};

export default useMemory;
