import { useState } from "react";

const useRegister = () => {
  const [pcValue, setPcValue] = useState(0);
  const [marValue, setMarValue] = useState(0);
  const [mdrValue, setMdrValue] = useState(0);
  const [accValue, setAccValue] = useState(0);
  const [cirValue, setCirValue] = useState(0);

  const updatePc = (newValue) => {
    setPcValue(newValue);
  };
  const updateMar = (newValue) => {
    setMarValue(newValue);
  };
  const updateMdr = (newValue) => {
    setMdrValue(newValue);
  };
  const updateAcc = (newValue) => {
    setAccValue(newValue);
  };
  const updateCir = (newValue) => {
    setCirValue(newValue);
  };

  

  const pc = {
    value: pcValue,
    update: updatePc,
  };
  const mar = {
    value: marValue,
    update: updateMar,
  };
  const mdr = {
    value: mdrValue,
    update: updateMdr,
  };
  const acc = {
    value: accValue,
    update: updateAcc,
  };
  const cir = {
    value: cirValue,
    update: updateCir,
  };
  return { pc, mar, mdr, acc, cir };
};

export default useRegister;
