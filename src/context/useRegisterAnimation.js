const useRegisterAnimation = () => {
  let previousElement = "";

  function activeComponentStyle(element, styleName) {
    previous.element && previous.element.classList.remove(previous.style);

    const focusElement = document.querySelector(element);

    if (focusElement) {
      focusElement.classList.add(styleName);
      previous.element = focusElement;
      previous.style = styleName;
    } else {
      console.error("O elemento não foi encontrado.");
    }
  }

  function makeAnimation(componentName) {
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

  function removeAllActiveComponentStyles() {
    const arrayElementClass = [
      ".register-container",
      ".ram-input",
      ".instruction-row",
      ".decode-container",
    ];

    for (let i = 0; i < arrayElementClass.length; i++) {
      document.querySelectorAll(arrayElementClass[i]).forEach((element) => {
        element.classList.remove("focus");
      });
    }

    document.querySelector("#alu").classList.remove("focus-alu");
  }

  return { makeAnimation };
};

export default useRegisterAnimation;
