import { store } from "../constants.js";

export const saveCartToLocalStorage = () => {
    // Сохраняем актуальное состояние корзины в localStorage
    localStorage.setItem('cart', JSON.stringify(store.cart));
};
