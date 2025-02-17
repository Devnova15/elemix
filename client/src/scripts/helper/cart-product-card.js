import {removeProductFromCartModal} from "./removeProductFromCartModal.js";
import {store} from "../constants.js";
import {updateCartFooter} from "../navigation-header.js";
import {saveCartToLocalStorage} from "./saveCartToLocalStorage.js";
import {updateCartOnServer} from "../requests.js";
import {calculateTotalAmount} from "./calculateTotalAmount.js";
import {updateTotalAmountElement} from "./updateTotalAmountElement.js";


export const createCartProductCart = (product) => {
    const productItem = document.createElement('div');
    productItem.className = 'cart-product-item';
    let currentIndex = 0;
    let currentQuantity = 1;


    const productImage = document.createElement('img');
    productImage.className = 'cart-product-image';
    productImage.src = product.image;

    const productName = document.createElement('p');
    productName.className = 'cart-product-name';
    productName.textContent = product.product.name;

    const productColor = document.createElement('p');
    productColor.className = 'cart-product-color';
    productColor.textContent = `Color: ${product.color}`;

    const productSize = document.createElement('p');
    productSize.className = 'cart-product-color';
    productSize.textContent = `Size: ${product.size}`

    const productPrice = document.createElement('p');
    productPrice.className = 'cart-product-price';
    productPrice.textContent = `$${product.product.currentPrice}`;
    // productPrice.appendChild(document.createElement('span')).textContent = `x${product.cartQuantity}`;

    const quantityContainer = document.createElement('div');
    quantityContainer.className = 'cart-quantity__container';

    const decreaseButton = document.createElement('button');
    decreaseButton.className = 'quantity-decrease__button';
    decreaseButton.textContent = '-';
    decreaseButton.addEventListener('click', async () => {
        const productToUpdate = store.cart.products.find((storeProduct) => {
            return storeProduct.product._id === product.product._id
        })
        let availableQuantity

        productToUpdate.product.variations.forEach(variation => {
            if (variation.color === productToUpdate.color) {
                variation.sizes.forEach(size => {
                    if (size.size === productToUpdate.size) {
                        availableQuantity = size.quantity
                    }
                })
            }
        })
        if (productToUpdate.cartQuantity > 1) {
            productToUpdate.cartQuantity--;

            try {
                await updateCartOnServer({
                    products: [...store.cart.products]
                })
                quantityDisplay.value = productToUpdate.cartQuantity;
                productPrice.textContent = `$${(productToUpdate.product.currentPrice * productToUpdate.cartQuantity).toFixed(2)}`;

                updateTotalAmountElement(store.cart.products)
            } catch (Error) {

            }

        }

    });

    const quantityDisplay = document.createElement('input');
    quantityDisplay.className = 'quantity-display';
    quantityDisplay.type = "number";
    quantityDisplay.value = product.cartQuantity;
    quantityDisplay.min = 1;

    const increaseButton = document.createElement('button');
    increaseButton.className = 'quantity-increase__button';
    increaseButton.textContent = '+';
    increaseButton.addEventListener('click', async () => {
        const productToUpdate = store.cart.products.find((p) => {
            return p.product._id === product.product._id
        })

        let availableQuantity

        productToUpdate.product.variations.forEach(variation => {
            if (variation.color === productToUpdate.color) {
                variation.sizes.forEach(size => {
                    if (size.size === productToUpdate.size) {
                        availableQuantity = size.quantity
                    }
                })
            }
        })

        if (productToUpdate.cartQuantity < availableQuantity) {
            productToUpdate.cartQuantity++

            try {
                await updateCartOnServer({
                    products: [...store.cart.products]
                })
                quantityDisplay.value = productToUpdate.cartQuantity
                productPrice.textContent = `$${(productToUpdate.product.currentPrice * productToUpdate.cartQuantity).toFixed(2)}`
                updateTotalAmountElement(store.cart.products)

            } catch (error) {}
        }
        saveCartToLocalStorage();
    });
    quantityDisplay.addEventListener('input', () => {
        const value = parseInt(quantityDisplay.value);
        let availableQuantity = 0;
        if (product.product.variations) {
            const selectedVariation = product.product.variations.find(variation => variation.color === product.color);
            if (selectedVariation) {
                const selectedSizeObj = selectedVariation.sizes.find(sizeObj => sizeObj.size === product.size);
                if (selectedSizeObj) {
                    availableQuantity = selectedSizeObj.quantity;
                }
            }
        }
        if (value < 1) {
            quantityDisplay.value = 1;
            product.cartQuantity = 1;
        } else if (value > availableQuantity) {
            quantityDisplay.value = availableQuantity;
            product.cartQuantity = availableQuantity;
        } else {
            product.cartQuantity = value;
        }
        productPrice.textContent = `$${(product.product.currentPrice * product.cartQuantity).toFixed(2)}`;


    })

    quantityContainer.appendChild(decreaseButton);
    quantityContainer.appendChild(quantityDisplay);
    quantityContainer.appendChild(increaseButton);


    const removeProductButton = document.createElement('button');
    removeProductButton.className = 'remove-product-button';
    removeProductButton.textContent = '×';
    removeProductButton.addEventListener('click', () => {
        removeProductFromCartModal(product.product._id);
    });

    productItem.appendChild(productImage);
    productItem.appendChild(productName);
    productItem.appendChild(productColor);
    productItem.appendChild(productSize);
    productItem.appendChild(productPrice);
    productItem.appendChild(quantityContainer);
    productItem.appendChild(removeProductButton);

    return productItem;
};

