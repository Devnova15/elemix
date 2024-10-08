import {getAllProducts} from './requests.js';

export const createCartProduct = (product) => {
    const productElement = document.createElement('div');
    const productImage = document.createElement('img');
    const productName = document.createElement('p')
    const productTitle = document.createElement('p');
    const productPrice = document.createElement('p');


    productImage.src = product.imageUrls[0]
    productName.textContent = product.name
    productPrice.textContent = product.currentPrice

    productElement.append(productImage,productName,productPrice);
    return productElement
}