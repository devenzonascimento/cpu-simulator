import DecodeRow from "./DecodeRow";
import { MdInfoOutline } from "react-icons/md";

import "./styles.scss";

const DecodeUnit = ({ handleOpenInfoModal }) => {
  const decodeTableRow = [
    {
      id: "end",
      opcode: "0000",
      operand: "0000",
      //instruction: "Encerrar",
      instruction: "end"
    },
    {
      id: "add",
      opcode: "0001",
      operand: "endereço",
      //instruction: "Somar",
      instruction: "add"
    },
    {
      id: "sub",
      opcode: "0010",
      operand: "endereço",
      //instruction: "Subtrair",
      instruction: "sub"
    },
    {
      id: "str",
      opcode: "0011",
      operand: "endereço",
      //instruction: "Armazenar",
      instruction: "store"
    },
    {
      id: "lod",
      opcode: "0101",
      operand: "endereço",
      //instruction: "Carregar",
      instruction: "load"
    },
    {
      id: "jmp",
      opcode: "0110",
      operand: "endereço",
      //instruction: "Pular",
      instruction: "jump"
    },
    {
      id: "jpz",
      opcode: "0111",
      operand: "endereço",
      //instruction: "Pular Se (zero)",
      instruction: "jump if (zero)"
    },
    {
      id: "jpn",
      opcode: "1000",
      operand: "endereço",
      //instruction: "Pular Se (negativo)",
      instruction: "jump if (negative)"
    },
    {
      id: "ipt",
      opcode: "1001",
      operand: "0001",
      //instruction: "Entrada",
      instruction: "input"
    },
    {
      id: "opt",
      opcode: "1001",
      operand: "0010",
      //instruction: "Saída",
      instruction: "output"
    },
  ];

  return (
    <>
      <div className="decode-container">
        <table className="decode-table">
          <caption className="decode-caption">DECODE</caption>
          <thead>
            <tr className="decode-table-header">
              <th>Opcode</th>
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
        <MdInfoOutline className="info-icon" onClick={() => handleOpenInfoModal("decode")}/>
      </div>
    </>
  );
};

export default DecodeUnit;
