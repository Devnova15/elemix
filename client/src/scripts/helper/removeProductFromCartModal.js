import { store } from "../constants.js";
import { createModalWindowCart } from "../navigation-header.js";
import { saveCartToLocalStorage } from "./saveCartToLocalStorage.js";
import { deleteProductFromCart } from "../requests.js";


export const removeProductFromCartModal = async (productId) => {
    console.log("попытка удалить продукт с ID:", productId);
    const productIndex = store.cart.products.findIndex(p => p.product._id === productId);

    if (productIndex === -1) {
        console.log("продукт не найден в корзине:", productId);
        return;
    }

    store.cart.products.splice(productIndex, 1);
    store.cart.quantity = store.cart.products.reduce((total, item) => total + item.cartQuantity, 0);
    store.cart.totalPrice = store.cart.products.reduce(
        (total, item) => total + item.currentPrice * item.cartQuantity,
        0
    );

    saveCartToLocalStorage();
    createModalWindowCart();

    try {
        await deleteProductFromCart(productId);
        console.log("продукт удален с сервера");
    } catch (error) {
        console.error("не удалось удалить продукт с сервера", error);
    }
};
