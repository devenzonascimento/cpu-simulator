import React from "react";

import DecodeRow from "./DecodeRow";

import "./styles.scss";

const DecodeUnit = () => {
  const decodeTableRow = [
    {
      id: "end",
      opcode: "0000",
      operand: "0000",
      instruction: "End",
    },
    {
      id: "add",
      opcode: "0001",
      operand: "adress",
      instruction: "Add",
    },
    {
      id: "sub",
      opcode: "0010",
      operand: "adress",
      instruction: "Subtract",
    },
    {
      id: "str",
      opcode: "0011",
      operand: "adress",
      instruction: "Store",
    },
    {
      id: "lod",
      opcode: "0101",
      operand: "adress",
      instruction: "Load",
    },
    {
      id: "jmp",
      opcode: "0110",
      operand: "adress",
      instruction: "Jump",
    },
    {
      id: "jpz",
      opcode: "0111",
      operand: "adress",
      instruction: "Jump on zero",
    },
    {
      id: "jpn",
      opcode: "1000",
      operand: "adress",
      instruction: "Jump on negative",
    },
    {
      id: "ipt",
      opcode: "1001",
      operand: "0001",
      instruction: "Input",
    },
    {
      id: "opt",
      opcode: "1001",
      operand: "0010",
      instruction: "Output",
    },
  ];

  return (
    <>
      <div className="decode-container">
        <table className="decode-table">
        <caption className="decode-caption">DECODIFICADOR</caption>
          <thead>
            <tr className="decode-table-header">
              <th>Codigo OP.</th>
              <th>Operando</th>
              <th>Instrução</th>
            </tr>
          </thead>
          <tbody>
            {decodeTableRow.map((row) => (
              <DecodeRow key={row.instruction} decodeTableRow={row} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DecodeUnit;
