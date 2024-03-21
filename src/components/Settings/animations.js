export const buttonAnimation = () => {
    const menuButton = document.querySelector("nav")
    menuButton.classList.toggle("active")

    if (menuButton.classList.contains("active")) {
        const button = menuButton.querySelector("span")
        const list = document.querySelector(".programs-list")

        menuButton.style.width = "100%"
        button.style.display = "none"
        list.style.display = "flex"
    }
}

document.addEventListener('click', (event) => {
    const menuButton = document.querySelector("nav");
    const button = menuButton.querySelector("span")
    const list = document.querySelector(".programs-list");

    if (event.target !== menuButton && event.target !== button && event.target !== list) {
        menuButton.style.width = ""
        button.style.display = "flex"
        list.style.display = "none"
    }
})