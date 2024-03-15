export const buttonAnimation = () => {
    const menuButton = document.querySelector("nav")
    menuButton.classList.toggle("active")

    if (menuButton.classList.contains("active")) {
        const button = document.querySelector(".program-button")
        const list = document.querySelector(".program-list")

        menuButton.style.width = "250px"
        button.style.display = "none"
        list.style.display = "flex"
    }
}

document.addEventListener('click', (event) => {
    const menuButton = document.querySelector("nav");
    const button = document.querySelector(".program-button");
    const list = document.querySelector(".program-list");

    if (event.target !== menuButton && event.target !== button && event.target !== list) {
        menuButton.style.width = ""
        button.style.display = "flex"
        list.style.display = "none"
    }
})