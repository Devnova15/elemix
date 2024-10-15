import { getAllProducts } from './requests.js';

// export const createCartProduct = (product) => {
//     const productElement = document.createElement('div');
//     const productImage = document.createElement('img');
//     const productName = document.createElement('p')
//     const productTitle = document.createElement('p');
//     const productPrice = document.createElement('p');
//     const productRank = document.createElement('p');

// const defineProductStatus = (product, statusLabel)=>{

//     if (product.previousPrice) {
//         productLabel = document.createElement('label')
//         productLabel.textContent = 'SALE!'
//         }
//         // if (product.)
// }
// const productLabel = [];

//     // const productLabelNew = document.createElement('label');
//     // const productLabelHot = document.createElement('label');


//     // productLabelSale.textContent = 'SALE!';
//     // productLabelNew.textContent = 'NEW';
//     // productLabelHot.textContent = 'HOT';


//     productImage.className = 'product-img';
//     productImage.src = product.imageUrls[0] ? product.imageUrls[0] : product.variations[0].imageUrls[0];

//     productName.className = 'product-name'
//     productName.textContent = product.name

//     productPrice.className ='product-price'
//     productPrice.textContent = `$${product.currentPrice.toFixed(2)}`;
//     // productRank.textContent = product.rank

//     productElement.append(productImage, productName, productPrice, ...productLabel);
//     // productRank, 
//     return productElement
// }




////



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

    productImage1.className = 'product-img';
    productImage2.className = 'product-img hover-img';

    productImage1.src = product.imageUrls[0] ? product.imageUrls[0] : product.variations[0].imageUrls[0];
    productImage2.src = product.imageUrls[1] ? product.imageUrls[1] : product.variations[0].imageUrls[1];

    productName.className = 'product-name';
    productName.textContent = product.name;

    if (product.variations && product.variations.length > 0) {
        const currentVariation = product.variations[0];

        productPrice.textContent = `$${currentVariation.currentPrice ? currentVariation.currentPrice.toFixed(2) : product.currentPrice.toFixed(2)}`;

        if (currentVariation.previousPrice) {
            productPreviousPrice.textContent = `$${currentVariation.previousPrice.toFixed(2)}`;
        }
    } else {
        productPrice.textContent = `$${product.currentPrice.toFixed(2)}`;
        if (product.previousPrice) {
            productPreviousPrice.textContent = `$${product.previousPrice.toFixed(2)}`;
        }
    }

    // Добавляем классы для контейнера цен
    productPriceContainer.className = 'product-price-container';
    productPrice.className = 'product-price';
    productPreviousPrice.className = 'product-previous-price';
    productRating.className = 'product-rating';


    // Добавляем цены в контейнер
    productPriceContainer.append(productPrice);
    if (productPreviousPrice.textContent) {
        productPriceContainer.append(productPreviousPrice); 
    }
    const stars = product.rank
        ? Math.round(product.rank)
        : product.variations && product.variations[0].rank
            ? Math.round(product.variations[0].rank)
            : 0;
    productRating.innerHTML = getStarsHTML(stars);

    productImageContainer.append(productImage1, productImage2);
    productElement.append(productImageContainer, productName, productRating, productPriceContainer); // Добавляем контейнер цен

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
        if (i <= rating) {
            starsHTML += '<span class="star">★</span>'; 
        } else {
            starsHTML += '<span class="star">☆</span>'; 
        }
    }
    return starsHTML;
}