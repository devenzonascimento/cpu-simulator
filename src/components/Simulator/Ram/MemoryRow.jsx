import React from "react";

import { toBinary } from "../../../script/cpuScript";

const MemoryRow = ({ address, value, handleEditMemory }) => {
  return (
    <tr key={address}>
      <td>{toBinary(address)}</td>
      <td className="memory-cell-value">
        <input
          id={`address-${address}`}
          className="memory-input"
          type="text"
          maxLength={8}
          value={toBinary(value)}
          onChange={({ target }) => handleEditMemory(address, target.value)}
        />
      </td>
    </tr>
  );
};

export default MemoryRow;
