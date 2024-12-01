import { store } from "../constants.js";

export const saveCartToLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(store.cart));
};
