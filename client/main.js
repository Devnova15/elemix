import'./src/scripts/top-sellers.js'
import {initializeProductImageSwitcher} from './src/scripts/header-main-module.js';
import {createModalWindowMenu, createModalWindowCart} from './src/scripts/navigation-header.js';
import {modalWindowPosition} from "./src/scripts/constants.js";
import {loginInit, registrateInit} from "./src/scripts/requests.js";
import {addProductToMongoDb} from "./src/scripts/requests.js";

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

// document.querySelector('#button').addEventListener('click', async () => {
//     const newProduct = {
//         name: "new product for testing purposes",
//         currentPrice: 199.99,
//         previousPrice: 250,
//         categories: "men",
//         imageUrls: [
//             "img/products/men/001.png",
//             "img/products/men/002.png",
//             "img/products/men/003.png",
//             "img/products/men/004.png"
//         ],
//         quantity: 100,
//         color: "red",
//         productUrl: "/men",
//         brand: "braaaand",
//         myCustomParam: "some string or json for custom param"
//     };
//     try {
//         const responce = await addProductToMongoDb(newProduct)
//         console.log(responce)
//     } catch (error) {
//         console.log(error)
//     }
// });
//
// initializeProductImageSwitcher();

document.querySelector(".product-button").addEventListener('click', async ()=> {
    console.log('clicked')
    await loginInit()

})