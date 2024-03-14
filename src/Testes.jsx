


import React, { useState, useEffect } from "react";

const Simulator = () => {
  const [memory, setMemory] = useState({
    "00000000": "10010001",
    "00000001": "00111111",
    "00000010": "10010001",
    "00000011": "00011111",
    "00000100": "10010010",
    "00000101": "00000000",
    "00000110": "00000000",
    "00000111": "00000000",
    // ... outros dados de memória ...
  });

  const [pcValue, setPcValue] = useState("00000000");
  const [marValue, setMarValue] = useState("00000000");
  const [mdrValue, setMdrValue] = useState("00000000");
  const [accValue, setAccValue] = useState("00000000");
  const [cirValue, setCirValue] = useState("00000000");

  const [currentStep, setCurrentStep] = useState(0);

  const executarProximoPasso = () => {
    if (currentStep < main.length) {
      main[currentStep]();
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  useEffect(() => {
    executarProximoPasso();
  }, [currentStep, main]);

  const search = [
    () => setPcValue((prev) => toBinary(toDecimal(prev) + 1)),
    () => setMarValue(pcValue),
    () => setMdrValue(memory[marValue]),
    () => setCirValue(mdrValue),
    () => setPcValue((prev) => toBinary(toDecimal(prev) + 1)),
    () => decode(cirValue),
  ];

  useEffect(() => {
    if (currentStep < main.length) {
      main[currentStep]();
    }
  }, [currentStep, main]);

  const main = [() => instructionExecute(search)];

  function instructionExecute(array) {
    main = main.concat(array);
  }

  const decode = (cirValue) => {
    const opcode = cirValue.substring(0, 4);
    const operand = cirValue.substring(4, 8);

    switch (opcode) {
      case "0000":
        return false;

      case "0001":
        instructionExecute(addInstruction);
        break;

      case "0010":
        instructionExecute(subInstruction);
        break;

      case "0011":
        instructionExecute(storeInstruction);
        break;

      case "0101":
        instructionExecute(loadInstruction);
        break;

      case "1001":
        operand === "0001" ? instructionExecute(inputInstruction) : false;
        operand === "0010" ? instructionExecute(outputInstruction) : false;

      default:
        return true;
    }
  };

  const addInstruction = [
    () => setMarValue(operand.padStart(8, "0")),
    () => setMdrValue(memory[marValue]),
    () =>
      setAccValue((prevAcc) =>
        toBinary(toDecimal(prevAcc) + toDecimal(mdrValue))
      ),
    () => instructionExecute(search),
  ];

  const subInstruction = [
    () => setMarValue(operand.padStart(8, "0")),
    () => setMdrValue(memory[marValue]),
    () =>
      setAccValue((prevAcc) =>
        toBinary(toDecimal(prevAcc) - toDecimal(mdrValue))
      ),
    () => instructionExecute(search),
  ];

  const storeInstruction = [
    () => setMarValue(operand.padStart(8, "0")),
    () => setMemory((prevMemory) => ({ ...prevMemory, [marValue]: accValue })),
    () => instructionExecute(search),
  ];

  const loadInstruction = [
    () => setMarValue(operand.padStart(8, "0")),
    () => setMdrValue(memory[marValue]),
    () => setAccValue(mdrValue),
    () => instructionExecute(search),
  ];

  const inputInstruction = [
    () => setAccValue(toBinary(prompt("Informe um valor"))),
    () => instructionExecute(search),
  ];

  const outputInstruction = [
    () => alert(accValue),
    () => instructionExecute(search),
  ];

  const toBinary = (num) => Number(num).toString(2).padStart(8, "0");
  const toDecimal = (num) => parseInt(num, 2);

  return (
    <div>
      <div>PC: {pcValue}</div>
      <div>MAR: {marValue}</div>
      <div>MDR: {mdrValue}</div>
      <div>ACC: {accValue}</div>
      <div>CIR: {cirValue}</div>

      <button onClick={executarProximoPasso}>Próximo Passo</button>
    </div>
  );
};

export default Simulator;

