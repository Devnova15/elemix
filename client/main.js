import './src/scripts/top-sellers.js'
import {initializeProductImageSwitcher} from './src/scripts/header-main-module.js';
import {
    createModalWindowMenu,
    createModalWindowCart, createModalForSingUpForm,

} from './src/scripts/navigation-header.js';
import {modalWindowPosition} from "./src/scripts/constants.js";
import {loginInit, registrateInit} from "./src/scripts/requests.js";
import {addProduct} from "./src/scripts/requests.js";
import {addProductsMensCategory, addProductsWomensCategory} from "./src/scripts/addProductsToDB.js";

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

// В файле с обработчиком события
document.addEventListener('click', async (event) => {
    // Проверяем, был ли клик по кнопке с классом form-button
    if (event.target.classList.contains('form-button')) {
        console.log('clicked');
        await loginInit();
    }
});



//тут продукты

document.querySelector(".header-search__button").addEventListener('click', async () => {
    await addProductsMensCategory();
    await addProductsWomensCategory()
    console.log('Men products added');
});



// Обработчик события для открытия модального окна при нажатии на иконку корзины
document.addEventListener("DOMContentLoaded", () => {
    const cartIcon = document.querySelector(".header-icon__user");

    if (cartIcon) {
        cartIcon.addEventListener("click", () => {
            // Вызов функции для создания модального окна
            createModalForSingUpForm(false, modalWindowPosition.center); // Передайте ошибку, если она есть
        });
    }
});