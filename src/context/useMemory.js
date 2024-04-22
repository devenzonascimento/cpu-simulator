import { useState } from "react";

const useMemory = () => {
  
  const programs = {
    blank: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    add: [-111, 63, -111, 31, -110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    sub: [-111, 63, -111, 47, -110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    biggest: [
      -111, 62, -111, 63, 46, -119, 95, -110, 0, 94, -110, 0, 0, 0, 0, 0,
    ],
  };

  const [memoryValue, setMemoryValue] = useState(programs.add);

  const updateMemory = (newMemory) => {
    setMemoryValue([...newMemory]);
  };

  return {
    memoryValue,
    updateMemory,
  };
};

export default useMemory;
