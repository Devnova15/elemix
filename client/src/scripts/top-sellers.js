import { modalWindowPosition } from './constants.js';
import { extractImgUrls } from "./helper/extractImgUrls.js";
import { createModal } from "./helper/createModalFunction.js";
import { getAllProducts } from './requests.js';
import { modalProductWindow } from './modalProductWindow.js'


export const createCartProduct = (product) => {
    const productElement = document.createElement('div');
    const productImageContainer = document.createElement('div');
    const productImage1 = document.createElement('img');
    const productImage2 = document.createElement('img');
    const productName = document.createElement('p');
    const productRating = document.createElement('div');
    const productPriceContainer = document.createElement('div');
    const productPrice = document.createElement('p');
    const productPreviousPrice = document.createElement('p');

    const moreButton = document.createElement('button');
    productImageContainer.addEventListener('click', () => {
        modalProductWindow(product);
    });



    const defineProductStatus = (product) => {
        const productLabelContainer = document.createElement('div');
        productLabelContainer.className = 'product-label-container';

        if (product.previousPrice) {
            const productLabelSale = document.createElement('label');
            productLabelSale.textContent = 'SALE!';
            productLabelSale.className = 'product-sale-label';
            productLabelContainer.appendChild(productLabelSale);
        }
        // array.reduce((accumulator, currentValue, index, array) => {
        // }, initialValue);
        
        const totalQuantity = product.variations.reduce((total, variation) => total + variation.quantity, 0);
        if (totalQuantity < 11) {
            const productLabelHot = document.createElement('label');
            productLabelHot.textContent = 'HOT';
            productLabelHot.className = 'product-hot-label';
            productLabelContainer.appendChild(productLabelHot);
        }

        return productLabelContainer;
    };
    const productStatusLabels = defineProductStatus(product);


    productImage1.className = 'product-img';
    productImage2.className = 'product-img hover-img';

    productImage1.src = product.imageUrls[0] || product.variations[0].imageUrls[0];
    productImage2.src = product.imageUrls[1] || product.variations[0].imageUrls[1];

    productName.className = 'product-name';
    productName.textContent = product.name;

    if (product.variations && product.variations.length > 0) {
        const currentVariation = product.variations[0];

        productPrice.textContent = currentVariation.currentPrice
            ? `$${currentVariation.currentPrice.toFixed(2)}`
            : `$${product.currentPrice.toFixed(2)}`;

        if (currentVariation.previousPrice) {
            productPreviousPrice.textContent = `$${currentVariation.previousPrice.toFixed(2)}`;
            productPrice.style.color = '#ca2728';
            productPreviousPrice.style.textDecoration = 'line-through';
        } else if (product.previousPrice) {
            productPreviousPrice.textContent = `$${product.previousPrice.toFixed(2)}`;
            productPrice.style.color = '#ca2728';
            productPreviousPrice.style.textDecoration = 'line-through';
        } else {
            productPreviousPrice.textContent = '';
            productPrice.style.color = '';
        }

        productPriceContainer.className = 'product-price-container';
        productPrice.className = 'product-price';
        productPreviousPrice.className = 'product-previous-price';
        productRating.className = 'product-rating';

        productPriceContainer.append(productPrice);
        if (productPreviousPrice.textContent) {
            productPriceContainer.append(productPreviousPrice);
        }
    }

    const stars = product.rank
        ? product.rank
        : product.variations && product.variations[0].rank
            ? product.variations[0].rank
            : 0;
    productRating.innerHTML = getStarsHTML(stars);

    addRatingEventListeners(productRating, product);

    productImageContainer.append(productImage1, productImage2);
    productElement.append(productStatusLabels, productImageContainer, productName, productRating, productPriceContainer,);

    productImageContainer.addEventListener('mouseover', () => {
        productImage1.style.display = 'none';
        productImage2.style.display = 'block';
    });

    productImageContainer.addEventListener('mouseout', () => {
        productImage1.style.display = 'block';
        productImage2.style.display = 'none';
    });

    productImage2.style.display = 'none';

    return productElement;
}

const getStarsHTML = (rating) => {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        starsHTML += `
            <span class="star ${i <= Math.floor(rating) ? 'filled' : ''} 
            ${i - 0.5 <= rating && i > Math.floor(rating) ? 'half-filled' : ''}" 
            data-rating="${i}">★</span>`;
    }
    return starsHTML;
}

const addRatingEventListeners = (productRating, product) => {
    const stars = productRating.querySelectorAll('.star');

    stars.forEach(star => {
        star.addEventListener('mousemove', (event) => {
            const starIndex = parseFloat(star.getAttribute('data-rating'));
            const rect = star.getBoundingClientRect();
            const offsetX = event.clientX - rect.left;
            const width = rect.width;


            const hoverRating = offsetX < width / 2 ? starIndex - 0.5 : starIndex;
            updateStarsDisplay(productRating, hoverRating);
        });

        star.addEventListener('mouseout', () => {

            const currentRank = product.variations && product.variations.length > 0
                ? product.variations[0].rank || 0
                : product.rank || 0;

            updateStarsDisplay(productRating, currentRank);
        });

        star.addEventListener('click', (event) => {
            const starIndex = parseFloat(star.getAttribute('data-rating'));
            const rect = star.getBoundingClientRect();
            const offsetX = event.clientX - rect.left;
            const width = rect.width;
            const newRating = offsetX < width / 2 ? starIndex - 0.5 : starIndex;

            product.rank = newRating;
            if (product.variations && product.variations.length > 0) {
                product.variations.forEach(variation => {
                    variation.rank = newRating;
                });
            }

            updateStarsDisplay(productRating, newRating);
        });
    });
};

const updateStarsDisplay = (productRating, rating) => {
    const stars = productRating.querySelectorAll('.star');
    stars.forEach((star, index) => {
        const starValue = index + 1;
        star.classList.remove('filled', 'half-filled');

        if (starValue <= rating) {
            star.classList.add('filled');
        } else if (starValue - 0.5 <= rating) {
            star.classList.add('half-filled');
        }
    });
}