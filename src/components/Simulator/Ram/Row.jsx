import React from "react";

const Row = ({ memory, handleEditar }) => {
  
  return (
  <>
      {Object.entries(memory).map(([endereco, valor]) => (
          <tr key={endereco}>
            <td>{endereco}</td>
            <td className="ram-cell-value">
              <input
                id={`adress-${endereco}`}
                className="ram-input"
                type="text"
                maxLength={8}
                value={valor}
                onChange={(e) => handleEditar(endereco, e.target.value)}
              />
            </td>
          </tr>
        ))}
  </>
  );
}

export default Row;
