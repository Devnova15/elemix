import {getAllProducts} from './requests.js';
import {modalProductWindow} from "./modalProductWindow.js";


export const createCartProduct = (product) => {
    const productElement = document.createElement('div');
    const productImage = document.createElement('img');
    const productName = document.createElement('p');
    const productPrice = document.createElement('p');
    const productButton = document.createElement('button');

    productImage.src = product.imageUrls[0];
    productName.textContent = product.name;
    productPrice.textContent = product.currentPrice
    productButton.textContent = 'More';

    productElement.append(productImage, productName, productPrice, productButton);

    productButton.addEventListener('click', () => {
        modalProductWindow(product);
    });

    return productElement;
};

