import { store } from "../constants.js";

const saveCartToLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(store.cart));
};

export const addToCartProducts = (product, quantity = 1, selectedColor = null, selectedImage = null, selectedPrice = null) => {
    const cartCountElement = document.querySelector('.header-icon__cart-count');
    const existingProduct = store.cart.products.find(p => p._id === product._id && p.selectedColor === selectedColor);

    if (!existingProduct) {
        store.cart.products.push({
            ...product,
            cartQuantity: quantity,
            selectedColor: selectedColor,
            image: selectedImage || product.variations[0].imageUrls[0],
        });

        store.cart.quantity = store.cart.products.length;
        store.cart.totalPrice = store.cart.products.reduce((total, item) => total + item.price * item.cartQuantity, 0);


        console.log(store.cart.products);
        if (cartCountElement) {
            cartCountElement.textContent = store.cart.quantity;
        }
    } else {
        existingProduct.cartQuantity += quantity;
    }

    saveCartToLocalStorage();
}



