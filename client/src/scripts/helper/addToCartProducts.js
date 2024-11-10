import { store } from "../constants.js";

export const addToCartProducts = (product, quantity = 1) => {
    const cartCountElement = document.querySelector('.header-icon__cart-count');
    const existingProduct = store.cart.products.find(p => p._id === product._id);
console.log(product);
    if (!existingProduct) {
        const productImage = product.variations[0].imageUrls[0];

        store.cart.products.push({
            ...product,
            cartQuantity: quantity,  // Устанавливаем количество из модального окна
            image: productImage
        });

        store.cart.quantity = store.cart.products.length;
        store.cart.totalPrice = store.cart.products.reduce((total, item) => total + item.currentPrice * item.cartQuantity, 0);

        if (cartCountElement) {
            cartCountElement.textContent = store.cart.quantity;
        }
    } else {
        existingProduct.cartQuantity += 1;
    }
}
