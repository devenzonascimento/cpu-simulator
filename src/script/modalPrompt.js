
export const openModalPrompt = async () => {
    console.log("start")
    const value = await requestInputPromptValue()
    console.log(value)
    console.log("fim")
    return value
}

export const requestInputPromptValue = () => {
  return new Promise((resolve) => {
    const modal = modalBuilder();
    document.body.appendChild(modal);

    const confirmValue = () => {
      const value = document.querySelector(".prompt-input").value;
      resolve(value);
      modal.remove();
    };

    document
      .querySelector(".prompt-button")
      .addEventListener("click", confirmValue);
  });
};

const modalBuilder = () => {
  const backdrop = createBackdrop();
  const container = createContainer();
  const title = createTitle();
  const input = createInput();
  const button = createButton();

  container.appendChild(title);
  container.appendChild(input);
  container.appendChild(button);
  backdrop.appendChild(container);

  return backdrop;
};

const createBackdrop = () => {
  const backdrop = document.createElement("div");
  backdrop.classList.add("modal-backdrop");

  return backdrop;
};
const createContainer = () => {
  const container = document.createElement("div");
  container.classList.add("prompt-container");

  return container;
};
const createTitle = () => {
  const title = document.createElement("span");
  title.classList.add("prompt-title");
  title.textContent = "Digite um Numero:";

  return title;
};
const createInput = () => {
  const input = document.createElement("input");
  input.classList.add("prompt-input");

  return input;
};
const createButton = () => {
  const button = document.createElement("button");
  button.classList.add("prompt-button");
  button.textContent = "Confirmar";

  return button;
};
