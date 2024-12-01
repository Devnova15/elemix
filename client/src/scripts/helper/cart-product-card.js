import {removeProductFromCartModal} from "./removeProductFromCartModal.js";
import {store} from "../constants.js";
import {updateCartContent, updateCartFooter} from "../navigation-header.js";
import {saveCartToLocalStorage} from "./saveCartToLocalStorage.js";


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

    const quantityContainer = document.createElement('div');
    quantityContainer.className = 'cart-quantity__container';


    const decreaseButton = document.createElement('button');
    decreaseButton.className = 'quantity-decrease__button';
    decreaseButton.textContent = '-';
    decreaseButton.addEventListener('click', () => {
        if (product.cartQuantity > 1) {
            product.cartQuantity--;
            updateCartQuantityDisplay(product, quantityDisplay, productPrice);
            saveCartToLocalStorage();
            updateCartFooter();
        }
    });

    const quantityDisplay = document.createElement('span');
    quantityDisplay.className = 'quantity-display';
    quantityDisplay.textContent = product.cartQuantity;

    const increaseButton = document.createElement('button');
    increaseButton.className = 'quantity-increase__button';
    increaseButton.textContent = '+';
    increaseButton.addEventListener('click', () => {
        const maxQuantity = product.variations.find(variation => variation.color === product.selectedColor)
        if (product.cartQuantity < maxQuantity.quantity){
            product.cartQuantity++;
        }

        updateCartQuantityDisplay(product, quantityDisplay, productPrice);
        saveCartToLocalStorage();
        updateCartFooter();
    });
        quantityContainer.appendChild(decreaseButton);
        quantityContainer.appendChild(quantityDisplay);
        quantityContainer.appendChild(increaseButton);


        const removeProductButton = document.createElement('button');
        removeProductButton.className = 'remove-product-button';
        removeProductButton.textContent = '×';
        removeProductButton.addEventListener('click', () => {
            removeProductFromCartModal(product._id);
        });

        productItem.appendChild(productImage);
        productItem.appendChild(productName);
        productItem.appendChild(productPrice);
        productItem.appendChild(quantityContainer);
        productItem.appendChild(removeProductButton);

        return productItem;
    };


const updateCartQuantityDisplay = (product, quantityDisplay, productPrice) => {
    quantityDisplay.textContent = product.cartQuantity;
    productPrice.textContent = `$${(product.currentPrice * product.cartQuantity).toFixed(2)}`;
};







