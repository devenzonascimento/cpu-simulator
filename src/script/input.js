export function solicitarValor() {
  return new Promise((resolve, reject) => {
    // Crie um modal com um input
    const modal = document.createElement("div");
    modal.classList.add("modal-backdrop")
    modal.innerHTML = `
        <div class="modal">
            <h1>Insira um valor</h1>
            <input type="text" id="inputValor">
            <button id="confirmarBtn">Confirmar</button>
        </div>
      `;
    document.body.appendChild(modal);

    // Função para confirmar o valor
    function confirmarValor() {
      const valor = document.getElementById("inputValor").value;
      modal.remove();
      resolve(valor); // Retorna o valor inserido pelo usuário
    }

    // Adicionar evento de clique ao botão de confirmar
    document
      .getElementById("confirmarBtn")
      .addEventListener("click", confirmarValor);
  });
}

// Exemplo de uso com async/await
export async function exemplo() {
  console.log("chamou");
  const valor = await solicitarValor();
  return valor;
}

// Chamada da função exemplo
async function iniciarExemplo() {
  console.log(
    "A execução da função exemplo será interrompida até que o valor seja inserido."
  );
  await exemplo();
  console.log(
    "A execução da função exemplo foi retomada após o usuário inserir o valor."
  );
}

//iniciarExemplo();
