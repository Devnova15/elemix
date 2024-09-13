import {getAllProducts} from '../../../scripts/requests.js';

let currentPage = 0;
const limit = 12;

const displayProducts = (data) => {
    const productList = document.querySelector('.product-list');

    productList.innerHTML = '';

    if (Array.isArray(data.products)) {
        data.products.forEach(product => {
            const productElement = document.createElement('div');
            const productImage = document.createElement('img');
            const productTitle = document.createElement('p');
            const productPrice = document.createElement('p');

            productImage.src = product.thumbnail;
            productTitle.textContent = product.title;
            productPrice.textContent = `$${product.price}`;

            productElement.className = 'product-list__item';
            productImage.className = 'product-list__image';
            productTitle.className = 'product-list__title';
            productPrice.className = 'product-list__price';

            productElement.appendChild(productImage);
            productElement.appendChild(productTitle);
            productElement.appendChild(productPrice);

            productList.appendChild(productElement);
        });
    } else {
        console.error('Ошибка: данные не содержат массив продуктов.');
    }
};

const loadProducts = async (page = 0) => {
    try {
        const response = await getAllProducts();
        const start = page * limit;
        const products = response.products.slice(start, start + limit);
        displayProducts({products});
    } catch (error) {
        console.error('Ошибка при получении продуктов:', error);
    }
};

loadProducts(currentPage);

const loadMoreButton = document.querySelector('.button--load-more');
loadMoreButton.addEventListener('click', () => {
    currentPage++;
    loadProducts(currentPage);
});