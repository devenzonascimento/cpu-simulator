import { useState } from "react";

const useMemory = () => {
  const [memoryValue, setMemoryValue] = useState([programs.blank]);

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

  const updateMemory = (newMemory) => {
    setMemoryValue(...newMemory);
  };

  const chooseProgram = (name) => {
    memoryValue = { ...programs[name] };
    //clearCPU();
  };
  const memory = {
    value: memoryValue,
    update: updateMemory,
  };
  return {
    memory,
  };
};

export default useMemory;
