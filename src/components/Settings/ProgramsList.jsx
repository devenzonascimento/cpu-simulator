const ProgramsList = ({ isOpen, OnClose, switchProgram }) => {

  const handleSwitchProgram = (programIndex) => {
    switchProgram(programIndex)
    OnClose();
  };

  return (
    <>
      {isOpen && (
        <nav>
          <ul className="programs-list">
            <li onClick={() => handleSwitchProgram(1)}>Soma</li>
            <li onClick={() => handleSwitchProgram(2)}>Subtração</li>
            <li onClick={() => handleSwitchProgram(3)}>Maior Numero</li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default ProgramsList;
