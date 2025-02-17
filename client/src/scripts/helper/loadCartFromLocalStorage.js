import { store } from "../constants.js";

export const loadCartFromLocalStorage = () => {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
        store.cart = JSON.parse(cartData);

        const cartCountElement = document.querySelector('.header-icon__cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = store.cart.products.length;

        }
    }
};
