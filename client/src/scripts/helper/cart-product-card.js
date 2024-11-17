import {removeProductFromCartModal} from "./removeProductFromCartModal.js";
import {store} from "../constants.js";

export const createCartProductCart = (product) => {
        const productItem = document.createElement('div');
        productItem.className = 'cart-product-item';

        const productImage = document.createElement('img');
        productImage.className = 'cart-product-image';
        productImage.src = product.image;

        const productName = document.createElement('p');
        productName.className = 'cart-product-name';
        productName.textContent = product.name;

        const productPrice = document.createElement('p');
        productPrice.className = 'cart-product-price';
        productPrice.textContent = `$${product.currentPrice}`;

        // Поле для изменения количества
        const quantityInput = document.createElement('input');
        quantityInput.className = 'cart-product-quantity';
        quantityInput.type = 'number';
        quantityInput.value = product.cartQuantity;
        quantityInput.min = 1;

        // Обработчик для изменения количества
        quantityInput.addEventListener('input', (event) => {
                const newQuantity = parseInt(event.target.value, 10);

                // Проверка, чтобы количество было больше 0
                if (newQuantity > 0) {
                        product.cartQuantity = newQuantity;

                        // Обновляем данные в store
                        const cartProduct = store.cart.products.find(p => p._id === product._id);
                        if (cartProduct) {
                                cartProduct.cartQuantity = newQuantity;
                        }

                        // Обновляем общую стоимость и UI
                        const cartFooter = document.querySelector('.cart-footer');
                        const cartSideBarContent = document.querySelector('.cart-side-bar__content');
                        updateCartContent(cartSideBarContent, cartFooter);
                } else {
                        event.target.value = 1;
                }
        });

        // Кнопка для удаления товара
        const removeProductButton = document.createElement('button');
        removeProductButton.className = 'remove-product-button';
        removeProductButton.textContent = '×';
        removeProductButton.addEventListener('click', () => {
                removeProductFromCartModal(product._id);
        });

        productItem.appendChild(productImage);
        productItem.appendChild(productName);
        productItem.appendChild(productPrice);
        productItem.appendChild(quantityInput);
        productItem.appendChild(removeProductButton);

        return productItem;
};

