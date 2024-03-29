import React from "react";

const MemoryRow = ({ memory, handleEditMemory }) => {
  
  return (
    <>
      {Object.entries(memory).map(([address, value]) => (
          <tr key={address}>
            <td>{address}</td>
            <td className="memory-cell-value">
              <input
                id={`address-${address}`}
                className="memory-input"
                type="text"
                maxLength={8}
                value={value}
                onChange={(e) => handleEditMemory(address, e.target.value)}
              />
            </td>
          </tr>
        ))}
    </>
  );
}

export default MemoryRow;
