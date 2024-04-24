import { useState } from "react";

const useRegister = () => {
  const [pcValue, setPcValue] = useState("00000000");
  const [marValue, setMarValue] = useState("00000000");
  const [mdrValue, setMdrValue] = useState("00000000");
  const [accValue, setAccValue] = useState("00000000");
  const [cirValue, setCirValue] = useState("00000000");

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

  return {
    pcValue,
    marValue,
    mdrValue,
    accValue,
    cirValue,
    updatePc,
    updateMar,
    updateMdr,
    updateAcc,
    updateCir,
  };
};

export default useRegister;
