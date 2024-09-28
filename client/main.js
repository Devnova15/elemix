import { initializeProductImageSwitcher } from './src/scripts/header-main-module.js';
import {
    createModalWindowMenu,
    createModalWindowCart,
    createModalForSignUpForm
} from './src/scripts/navigation-header.js';
import {modalWindowPosition} from "./src/scripts/constants.js";
import {loginInit, registrateInit} from "./src/scripts/requests.js";
import {addProduct} from "./src/scripts/requests.js";

document.addEventListener("DOMContentLoaded", () => {
    const hamburgerIcon = document.querySelector(".header-icon__menu");

    if (hamburgerIcon) {
        hamburgerIcon.addEventListener("click", () => {
            createModalWindowMenu(false, modalWindowPosition.right);
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const cartIcon = document.querySelector(".header-icon__cart");

    if (cartIcon) {
        cartIcon.addEventListener("click", () => {
            createModalWindowCart(false, modalWindowPosition.right)
        });
    }
});
initializeProductImageSwitcher();

document.querySelector(".product-button").addEventListener('click', async ()=> {
    console.log('clicked')
    await loginInit()
})
document.querySelector(".header-search__button").addEventListener('click', async ()=> {
    console.log('clicked')
    await addProduct()
})


document.addEventListener("DOMContentLoaded", () => {
    const userIcon = document.querySelector(".header-icon__user");

    if (userIcon) {
        userIcon.addEventListener("click", () => {
            createModalForSignUpForm(false, modalWindowPosition.center);
        });
    }
});