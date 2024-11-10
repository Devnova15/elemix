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


    productElement.className = 'product-element';

    const backgroundOverlay = document.createElement('div');
    backgroundOverlay.className = 'background-overlay';

    const quickViewBtn = document.createElement('div');
    quickViewBtn.className = 'product-quick-view-btn';
    quickViewBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"><path d="M16 0v2h-8v-2h8zm-16 16h2v-8h-2v8zm16 8v-2h-8v2h8zm2-22h1c1.654 0 3 1.346 3 3v1h2v-1c0-2.761-2.238-5-5-5h-1v2zm-12 20h-1c-1.654 0-3-1.346-3-3v-1h-2v1c0 2.761 2.238 5 5 5h1v-2zm16-4v1c0 1.654-1.346 3-3 3h-1v2h1c2.762 0 5-2.239 5-5v-1h-2zm2-10h-2v8h2v-8zm-22-2v-1c0-1.654 1.346-3 3-3h1v-2h-1c-2.762 0-5 2.239-5 5v1h2z"/></svg>`
    const favoriteBtn = document.createElement('div');
    favoriteBtn.className = 'favorite-btn'
    favoriteBtn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"/></svg>`



    // Add click event to the quick view button
    quickViewBtn.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent triggering parent click events
        modalProductWindow(product); // Open the product modal
    });

    const defineProductStatus = (product) => {
        const productLabelContainer = document.createElement('div');
        productLabelContainer.className = 'product-label-container';

        if (product.variations[0].previousPrice) {
            const productLabelSale = document.createElement('label');
            productLabelSale.textContent = 'SALE!';
            productLabelSale.className = 'product-sale-label';
            productLabelContainer.appendChild(productLabelSale);
        }

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

    productImageContainer.append(productImage1, productImage2, backgroundOverlay, quickViewBtn, favoriteBtn);
    productElement.append(productStatusLabels, productImageContainer, productName, productRating, productPriceContainer,);

    productImageContainer.addEventListener('mouseover', () => {

        productImage1.style.display = 'none';
        productImage2.style.display = 'block';
        backgroundOverlay.style.display = 'block';
        // backgroundOverlay.style.animation = 'slideUp 0.5s ease-out forwards';

        quickViewBtn.style.display = 'block';

        favoriteBtn.style.display = 'block';
        // quickViewBtn.style.animation = 'slideUp 0.5s ease-out forwards';


    });

    productImageContainer.addEventListener('mouseout', () => {
        productImage1.style.display = 'block';
        productImage2.style.display = 'none';

        backgroundOverlay.style.display = 'none';
        backgroundOverlay.style.animation = '';

        quickViewBtn.style.display = 'none';
        quickViewBtn.style.animation = '';

        favoriteBtn.style.display = 'none';
        favoriteBtn.style.animation = ''
    });

    productImage2.style.display = 'none';

    backgroundOverlay.style.display = 'none';

    quickViewBtn.style.display = 'none';

    favoriteBtn.style.display = 'none';


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