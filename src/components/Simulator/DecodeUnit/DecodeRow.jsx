import React from "react";

const DecodeRow = ({ decodeTableRow }) => {
  return (
    <>
      <tr
        className={decodeTableRow.id}
        key={decodeTableRow.instruction}
      >
        <td>{decodeTableRow.opcode}</td>
        <td>{decodeTableRow.operand}</td>
        <td>{decodeTableRow.instruction}</td>
      </tr>
    </>
  );
};

export default DecodeRow;
