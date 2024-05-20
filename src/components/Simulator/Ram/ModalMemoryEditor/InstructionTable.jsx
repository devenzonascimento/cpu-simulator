import { useState } from "react";

const InstructionTable = ({ handleOpcodeClick, handleAdressClick }) => {
  const addressButtonData = [
    {
      decimalValue: 0,
      binaryValue: "0000",
    },
    {
      decimalValue: 1,
      binaryValue: "0001",
    },
    {
      decimalValue: 2,
      binaryValue: "0010",
    },
    {
      decimalValue: 3,
      binaryValue: "0011",
    },
    {
      decimalValue: 4,
      binaryValue: "0100",
    },
    {
      decimalValue: 5,
      binaryValue: "0101",
    },
    {
      decimalValue: 6,
      binaryValue: "0110",
    },
    {
      decimalValue: 7,
      binaryValue: "0111",
    },
    {
      decimalValue: 8,
      binaryValue: "1000",
    },
    {
      decimalValue: 9,
      binaryValue: "1001",
    },
    {
      decimalValue: 10,
      binaryValue: "1010",
    },
    {
      decimalValue: 11,
      binaryValue: "1011",
    },
    {
      decimalValue: 12,
      binaryValue: "1100",
    },
    {
      decimalValue: 13,
      binaryValue: "1101",
    },
    {
      decimalValue: 14,
      binaryValue: "1110",
    },
    {
      decimalValue: 15,
      binaryValue: "1111",
    },
  ];
  const opcodeButtonData = [
    {
      opcode: "end",
      binaryValue: "00000000",
    },
    {
      opcode: "add",
      binaryValue: "0001",
    },
    {
      opcode: "sub",
      binaryValue: "0010",
    },
    {
      opcode: "store",
      binaryValue: "0011",
    },
    {
      opcode: "load",
      binaryValue: "0101",
    },
    {
      opcode: "jump",
      binaryValue: "0110",
    },
    {
      opcode: "jumpZ",
      binaryValue: "0111",
    },
    {
      opcode: "jumpN",
      binaryValue: "1000",
    },
    {
      opcode: "input",
      binaryValue: "10010001",
    },
    {
      opcode: "output",
      binaryValue: "10010010",
    },
  ];

  const [isVisible, setIsVisible] = useState(false);

  const showAddressButtons = (value) => {
    value.length == 4 ? setIsVisible(true) : setIsVisible(false);
  };

  return (
    <div className="instructions-container">
      <h2>Escolha uma instrução</h2>
      {!isVisible && (
        <div className="opcode-container">
          {opcodeButtonData.map((button, index) => {
            return (
              <button
                type="button"
                key={index}
                className="opcode-button"
                value={button.binaryValue}
                onClick={({ target }) => {
                  handleOpcodeClick(target.value);
                  showAddressButtons(button.binaryValue);
                }}
              >
                {button.opcode}
              </button>
            );
          })}
        </div>
      )}
      {isVisible && (
        <div className="address-container">
          {addressButtonData.map((button, index) => {
            return (
              <button
                type="button"
                key={index}
                className="address-button"
                value={button.binaryValue}
                onClick={({ target }) => {
                  handleAdressClick(target.value);
                  setIsVisible(false);
                }}
              >
                {button.decimalValue}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InstructionTable;
