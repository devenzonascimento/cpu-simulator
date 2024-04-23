const InstructionTable = ({ handleOpcodeClick, handleAdressClick }) => {
  return (
    <div className="instructions-container">
      <OpcodeButtons handleOpcodeClick={handleOpcodeClick}/>
      <AdressButtons handleAdressClick={handleAdressClick}/>
    </div>
  );
};

export default InstructionTable;

const AdressButtons = ({handleAdressClick}) => {
  return (
    <>
      <button
        className="address-button"
        value="00000000"
        onClick={({ target }) => handleAdressClick(target.value)}
      >
        0
      </button>
      <button
        className="address-button"
        value="0001"
        onClick={({ target }) => handleAdressClick(target.value)}
      >
        1
      </button>
      <button
        className="address-button"
        value="0010"
        onClick={({ target }) => handleAdressClick(target.value)}
      >
        2
      </button>
      <button
        className="address-button"
        value="0011"
        onClick={({ target }) => handleAdressClick(target.value)}
      >
        3
      </button>
      <button
        className="address-button"
        value="0100"
        onClick={({ target }) => handleAdressClick(target.value)}
      >
        4
      </button>
      <button
        className="address-button"
        value="0101"
        onClick={({ target }) => handleAdressClick(target.value)}
      >
        5
      </button>
      <button
        className="address-button"
        value="0110"
        onClick={({ target }) => handleAdressClick(target.value)}
      >
        6
      </button>
      <button
        className="address-button"
        value="0111"
        onClick={({ target }) => handleAdressClick(target.value)}
      >
        7
      </button>
      <button
        className="address-button"
        value="1000"
        onClick={({ target }) => handleAdressClick(target.value)}
      >
        8
      </button>
      <button
        className="address-button"
        value="1001"
        onClick={({ target }) => handleAdressClick(target.value)}
      >
        9
      </button>
      <button
        className="address-button"
        value="1010"
        onClick={({ target }) => handleAdressClick(target.value)}
      >
        10
      </button>
      <button
        className="address-button"
        value="1011"
        onClick={({ target }) => handleAdressClick(target.value)}
      >
        11
      </button>
      <button
        className="address-button"
        value="1100"
        onClick={({ target }) => handleAdressClick(target.value)}
      >
        12
      </button>
      <button
        className="address-button"
        value="1101"
        onClick={({ target }) => handleAdressClick(target.value)}
      >
        13
      </button>
      <button
        className="address-button"
        value="1110"
        onClick={({ target }) => handleAdressClick(target.value)}
      >
        14
      </button>
      <button
        className="address-button"
        value="1111"
        onClick={({ target }) => handleAdressClick(target.value)}
      >
        15
      </button>
    </>
  );
};

const OpcodeButtons = ({handleOpcodeClick}) => {
  return (
    <>
      <button
        className="opcode-button"
        value={"00000000"}
        onClick={({ target }) => handleOpcodeClick(target.value)}
      >
        end
      </button>
      <button
        className="opcode-button"
        value={"0001"}
        onClick={({ target }) => handleOpcodeClick(target.value)}
      >
        add
      </button>
      <button
        className="opcode-button"
        value={"0010"}
        onClick={({ target }) => handleOpcodeClick(target.value)}
      >
        sub
      </button>
      <button
        className="opcode-button"
        value={"0011"}
        onClick={({ target }) => handleOpcodeClick(target.value)}
      >
        store
      </button>
      <button
        className="opcode-button"
        value={"0101"}
        onClick={({ target }) => handleOpcodeClick(target.value)}
      >
        load
      </button>
      <button
        className="opcode-button"
        value={"0110"}
        onClick={({ target }) => handleOpcodeClick(target.value)}
      >
        jmp
      </button>
      <button
        className="opcode-button"
        value={"0111"}
        onClick={({ target }) => handleOpcodeClick(target.value)}
      >
        jmpZ
      </button>
      <button
        className="opcode-button"
        value={"1000"}
        onClick={({ target }) => handleOpcodeClick(target.value)}
      >
        jmpN
      </button>
      <button
        className="opcode-button"
        value={"10010001"}
        onClick={({ target }) => handleOpcodeClick(target.value)}
      >
        input
      </button>
      <button
        className="opcode-button"
        value={"10010010"}
        onClick={({ target }) => handleOpcodeClick(target.value)}
      >
        output
      </button>
    </>
  );
};
