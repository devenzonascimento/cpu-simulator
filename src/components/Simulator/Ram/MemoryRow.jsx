import React from "react";

import { toBinary } from "../../script/cpuScript";

const MemoryRow = ({ address, value, handleEditMemory }) => {

  console.log(value)

  const handle = (value) => {

  }

  return (
    <tr >
      <td>{toBinary(address)}</td>
      <td className="memory-cell-value">
        <input
          className={`memory-input address-${address}`}
          type="text"
          maxLength={8}
          value={value}
          onChange={({ target }) => handleEditMemory(address, target.value)}
        />
      </td>
    </tr>
  );
};


export default MemoryRow;
