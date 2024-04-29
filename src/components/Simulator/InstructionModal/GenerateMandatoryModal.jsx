import { createRoot } from "react-dom/client";

export const waitForModal = async (ReactComponent, data) => {
  return new Promise((resolve) => {
    const modal = getModalContainer();

    const onClose = (value) => {
      removeModalFromRoot();
      resolve(value);
    };

    createRoot(modal).render(<ReactComponent onClose={onClose} data={data}/>);
  });
};

const getModalContainer = () => {
  const modal = createModalContainer();

  appendChildInRoot(modal);

  return modal;
};

const createModalContainer = () => {
  const modal = document.createElement("div");
  modal.classList.add("modal-backdrop");

  return modal;
};

const appendChildInRoot = (containerElement) => {
  document.getElementById("root").appendChild(containerElement);
};

const removeModalFromRoot = () => {
  document
    .querySelector("#root")
    .removeChild(document.querySelector(".modal-backdrop"));
};