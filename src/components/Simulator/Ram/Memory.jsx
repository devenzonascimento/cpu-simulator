import { useCpu } from "../../../context/CpuContext";

import { MdInfoOutline } from "react-icons/md";

import { toBinary } from "../../../script/cpuScript";

import "./styles.scss";
import ModalMemoryEditor from "./ModalMemoryEditor";

import useMemoryEditor from "../../../hooks/useMemoryEditor";

const Memory = ({ memory, handleOpenModal }) => {
  const { handleWriteMemory } = useCpu();

  const {
    isOpen,
    handleOpenMemoryEditor,
    handleCloseMemoryEditor,
    memoryAddress,
  } = useMemoryEditor();

  return (
    <div className="memory-container">
      <MdInfoOutline
        className="info-icon"
        onClick={() => handleOpenModal("memory")}
      />
      <table className="memory-table">
        <caption className="memory-caption">MEMORY</caption>
        <thead>
          <tr>
            <th>Endereço</th>
            <th>Dado</th>
          </tr>
        </thead>
        <tbody>
          {memory.map((value, address) => {
            return (
              <tr key={address}>
                <td>{toBinary(address)}</td>
                <td
                  className={`memory-cell-value address-${address}`}
                  onClick={() => handleOpenMemoryEditor(address)}
                >
                  {toBinary(value)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ModalMemoryEditor
        isOpen={isOpen}
        handleCloseModal={handleCloseMemoryEditor}
        handleWriteMemory={handleWriteMemory}
        address={memoryAddress}
      />
    </div>
  );
};

export default Memory;
