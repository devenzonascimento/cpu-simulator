import { useEffect, useRef, useState } from "react";
import { toBinary } from "../script/convertsDecimalBinary.js";

const useInputDecimal = () => {
  const [decimalValue, setDecimalValue] = useState("");
  const [binaryValue, setBinaryValue] = useState("--------");

  const updateValidateInput = (value) => {
    setDecimalValue(value);

    if (value >= -127 && value <= 127) {
      setBinaryValue(toBinary(value));
    } else {
      setBinaryValue("--------");
    }
  };

  const inputFocusRef = useRef(null);

  useEffect(() => {
    inputFocusRef.current.focus();
  }, []);

  return {
    decimalValue,
    binaryValue,
    updateValidateInput,
    inputFocusRef,
  };
};

export default useInputDecimal;
