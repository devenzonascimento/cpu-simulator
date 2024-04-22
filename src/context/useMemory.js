import { useState } from "react";

const useMemory = () => {
  
  const blank = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const add = [-111, 63, -111, 31, -110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const sub = [-111, 63, -111, 47, -110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const biggest = [
    -111, 62, -111, 63, 46, -119, 95, -110, 0, 94, -110, 0, 0, 0, 0, 0,
  ];
  
  let programs = {
    blank: blank,
    add: add,
    sub: sub,
    biggest: biggest,
  };

  const [memoryValue, setMemoryValue] = useState(programs.add);

  const updateMemory = (newMemory) => {
    setMemoryValue([...newMemory]);
  };

  const chooseProgram = (name) => {
    memoryValue = { ...programs[name] };
    //clearCPU();
  };


  return {
    memoryValue,
    updateMemory,
  };
};

export default useMemory;
