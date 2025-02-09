import './src/scripts/top-sellers.js'
import {initializeProductImageSwitcher} from './src/scripts/header-main-module.js';
import {
    createModalWindowMenu,
    createModalWindowCart, createModalForSingUpForm,

} from './src/scripts/navigation-header.js';
import {modalWindowPosition, store} from "./src/scripts/constants.js";
import {getAllProducts, getProduct, loginUser, registrateInit} from "./src/scripts/requests.js";
import {addProduct} from "./src/scripts/requests.js";
import {addProductsMensCategory, addProductsWomensCategory} from "./src/scripts/addProductsToDB.js";
import {createCartProduct} from "./src/scripts/top-sellers.js";
import {loadCartFromLocalStorage} from "./src/scripts/helper/loadCartFromLocalStorage.js";
import {initCart} from "./src/scripts/helper/initCart.js";
import {decodeJwt} from "./src/scripts/helper/decodeJwt.js";
import {checkTokenHealth} from "./src/scripts/helper/checkTokenHealth.js";




//implement logout function
const logout = () => {
    localStorage.removeItem('token');
    store.token = null
}
//1. remove token from localStorage
//2. remove token from store
//3. set isLogin to false

const loginInit =  () => {
    const localStorageToken = localStorage.getItem('token')
    if (!localStorageToken) return
    console.log(checkTokenHealth(localStorageToken))
    if (checkTokenHealth(localStorageToken)) {
        store.token = localStorageToken;
        store.user.isLogin = true;
        return;
    } else {
        logout();
    }
};

document.addEventListener("DOMContentLoaded", async () => {
    store.topSellers = await getAllProducts()
    const productList = document.querySelector('.product-list')

    const productCarts = store.topSellers.map(product => createCartProduct(product))
    productList.append(...productCarts)


loginInit()
})

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
        cartIcon.addEventListener("click", (event) => {
            event.preventDefault();
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
        await loginUser();
    }
});


//тут продукты

document.querySelector(".header-search__button").addEventListener('click', async () => {
    await addProductsMensCategory();
    await addProductsWomensCategory()
    console.log('Men products added');
});


document.addEventListener("DOMContentLoaded", () => {
    const cartIcon = document.querySelector(".header-icon__user");

    if (cartIcon) {
        cartIcon.addEventListener("click", (event) => {
            createModalForSingUpForm(false, modalWindowPosition.center);
            event.preventDefault()
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    loadCartFromLocalStorage();
});


