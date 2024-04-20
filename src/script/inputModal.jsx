import { useState } from "react";

const InputModal = () => {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [response, setResponse] = useState("");

  const handleOpenModal = () => {setIsOpen(!isOpen);}

  const handleInput = (value) => {
    setValue(value);
  };

  const openInputModal = () => {
    return new Promise((resolve, reject) => {
      handleOpenModal()
      document.querySelector(".open-button").style.display = "none";
      setResponse(resolve)

      const getInputValue = () => {
        console.log("chamou")
        handleOpenModal()
        resolve(value); // Retorna o valor inserido pelo usuário
      };

      //document.querySelector(".ok-button").addEventListener("click", getInputValue)
    });
  };
  
  // Chamada da função exemplo
  async function test() {
    console.log(
      "A execução da função exemplo será interrompida até que o valor seja inserido."
    );
    const valor = await openInputModal();
    console.log("O valor inserido pelo usuário é:", valor);
    console.log(
      "A execução da função exemplo foi retomada após o usuário inserir o valor."
    );
  }
  

  return (
    <div
      className="modal-backdrop"
      style={{
        position: "fixed",
        height: "100vh",
        width: "100vw",
        background:
          "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.7))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "99",
      }}
    >
      <button className="open-button" onClick={test}>
        Abrir Modal
      </button>
      {isOpen && (
        <div
          className="modal-form"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2em",
          }}
        >
          <h1 style={{ color: "white" }}>Insira um Valor:</h1>
          <input
            type="text"
            className="modal-input"
            value={value}
            onChange={({ target }) => handleInput(target.value)}
          />
          <button className="ok-button" onClick={get}>Confirmar</button>
        </div>
      )}
    </div>
  );
};

export default InputModal;

/*
let isOpen = false;

const openInputModal = () => {
  return new Promise((resolve, reject) => {
    isOpen = true;
    document.querySelector(".open-button").style.display = "none";
    return resolve;
  });
};

const getInputValue = (resolve) => {
  const valor = document.querySelector(".modal-input").value;
  modal.remove();
  resolve(valor); // Retorna o valor inserido pelo usuário
};

function solicitarValor() {
  return new Promise((resolve, reject) => {
    const modal = document.querySelector(".modal-form");
    modal.style.display = "flex";
    document.querySelector(".open-button").style.display = "none";

    // Função para confirmar o valor
    const confirmarValor = () => {
      console.log("nem chamou");
      const valor = document.querySelector(".modal-input").value;
      modal.remove();
      resolve(valor); // Retorna o valor inserido pelo usuário
    };

    document
      .querySelector(".ok-button")
      .addEventListener("click", confirmarValor);
  });
}

async function exemplo() {
  const valor = await solicitarValor();
  console.log("O valor inserido pelo usuário é:", valor);
}

// Chamada da função exemplo
async function test() {
  console.log(
    "A execução da função exemplo será interrompida até que o valor seja inserido."
  );
  await exemplo();
  console.log(
    "A execução da função exemplo foi retomada após o usuário inserir o valor."
  );
}
*/

// Exemplo de uso com async/await
