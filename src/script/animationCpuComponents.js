let previousElement = "";

export const makeAnimation = (componentName) => {
  const focusElement = document.querySelector(`.${componentName}`);

  if (previousElement) {
    previousElement.classList.remove("focus");
  }

  if (focusElement) {
    focusElement.classList.add("focus");
    previousElement = focusElement;
  } else {
    console.error("O elemento não foi encontrado.");
  }
}

export const removeAllActiveComponentStyles = () => {
  const arrayElementClass = [
    ".register-container",
    ".memory-input",
    ".decode-row",
    ".decode-container",
  ];

  for (let i = 0; i < arrayElementClass.length; i++) {
    document.querySelectorAll(arrayElementClass[i]).forEach((element) => {
      element.classList.remove("focus");
    });
  }

  document.querySelector("#alu").classList.remove("focus-alu");
}
