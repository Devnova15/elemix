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
        productPrice.appendChild(document.createElement('span')).textContent = `x${product.cartQuantity}`;



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
        productItem.appendChild(removeProductButton);

        return productItem;
};

