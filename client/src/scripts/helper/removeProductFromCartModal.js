import { store } from "../constants.js";
import { createModalWindowCart } from "../navigation-header.js";
import { saveCartToLocalStorage } from "./saveCartToLocalStorage.js";

export const removeProductFromCartModal = (productId) => {
    console.log("Удаление товара с ID:", productId); // Для проверки, что удаляется именно нужный товар

    const productExists = store.cart.products.some(product => product._id === productId);

    if (productExists) {
        // Удаляем только тот товар, который соответствует переданному productId
        store.cart.products = store.cart.products.filter(product => product._id !== productId);

        // Обновляем количество товаров и общую стоимость в корзине
        store.cart.quantity = store.cart.products.length;
        store.cart.totalPrice = store.cart.products.reduce(
            (total, item) => total + item.currentPrice * item.cartQuantity,
            0
        );

        // Обновляем данные в localStorage (если нужно)
        saveCartToLocalStorage();

        // Обновляем модальное окно корзины
        createModalWindowCart();

        // Обновляем счетчик товаров на интерфейсе (счётчик в шапке)
        const cartCountElement = document.querySelector('.header-icon__cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = store.cart.quantity;
        }

        // Обновляем счетчик в модальном окне
        const cartSideBarSpan = document.querySelector('.cart-side-bar__span');
        if (cartSideBarSpan) {
            cartSideBarSpan.textContent = store.cart.quantity;  // Обновляем отображаемое количество товаров в корзине
        }

        console.log("Обновленный массив товаров в корзине:", store.cart.products);
    }
};
