import {getProductById} from "./src/scripts/requests.js";
import {extractImgUrls} from "./src/scripts/helper/extractImgUrls.js";
import {updateCartWithProduct} from "./src/scripts/helper/updateCartWithProduct.js";
import {modalWindowPosition} from "./src/scripts/constants.js";
import {addRatingEventListeners, getStarsHTML, updateStarsDisplay} from "./src/scripts/top-sellers.js";
import {createModalForSingUpForm, createModalWindowCart} from "./src/scripts/navigation-header.js";

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    console.log(productId);
    console.log(urlParams);
    try {
        const product = await getProductById(productId);
        console.log(product);
        if (product) {
            //paste data into store
            //createProductContent()
            createProductContent(product);
        } else {
            // redeirect 400 page...
        }
    } catch (e) {
// Редирект на страницу ошибки сервера
    }
})


export const createProductContent = (product) => {
    const imgUrls = extractImgUrls(product)

    const productSection = document.getElementById('product-section');
    productSection.className = 'product-section'

    let currentIndex = 0;
    let currentQuantity = 1;


    const productTextContainer = document.createElement('div');
    productTextContainer.className = 'product-text__container';

    const productImgContainer = document.createElement('div');
    productImgContainer.className = 'product-img__container';

    const productTitle = document.createElement('p');
    productTitle.textContent = product.name;
    productTitle.className = 'product-title';

    const productPrice = document.createElement('p');
    productPrice.textContent = `Price: $${product.currentPrice}`;
    productPrice.className = 'product-price';

    const productDescription = document.createElement('p');
    productDescription.textContent = product.description;
    productDescription.className = 'product-description'


    ////ТЕГИ ТОВАРОВ
    const stockKeepingUnit = document.createElement('p');
    stockKeepingUnit.className = 'stock-keeping-unit';
    stockKeepingUnit.textContent = `SKU: `;

    const stockKeepingUnitValue = document.createElement('p');
    stockKeepingUnitValue.className = 'stock-keeping-unit__value';
    stockKeepingUnitValue.textContent = 'N/A';

    const stockKeepingContainer = document.createElement('div');
    stockKeepingContainer.className = 'stock-keeping-container';

    stockKeepingContainer.appendChild(stockKeepingUnit);
    stockKeepingContainer.appendChild(stockKeepingUnitValue);

    const categoryLabel = document.createElement('p');
    categoryLabel.className = 'category-label';
    categoryLabel.textContent = 'Category:';

    const productCategory = document.createElement('p');
    productCategory.className = 'product-category';
    productCategory.textContent = `${product.categories}`;

    const categoryContainer = document.createElement('div');
    categoryContainer.className = 'category-container';
    categoryContainer.appendChild(categoryLabel);
    categoryContainer.appendChild(productCategory);

    const typeLabel = document.createElement('p');
    typeLabel.className = 'product-tag';
    typeLabel.textContent = 'Type:';

    const productType = document.createElement('p');
    productType.className = 'product-type';
    productType.textContent = `${product.type}`;


    const shareProductContainer = document.createElement('div');
    shareProductContainer.className = 'product-share';

    const shareProductText = document.createElement('p');
    shareProductText.className = 'product-share__text';
    shareProductText.textContent = 'Share: ';
    shareProductContainer.appendChild(shareProductText);

    function createSocialLink(href, imgSrc, altText) {
        const link = document.createElement('a');
        link.href = href;

        const icon = document.createElement('img');
        icon.src = imgSrc;
        icon.alt = altText;
        icon.className = 'social-icon';

        link.appendChild(icon);
        return link;
    }

    const facebookLink = createSocialLink(
        'https://www.facebook.com',
        '/src/img/svg-product-modal-window/facebook.png',
        'Facebook'
    );

    const twitterLink = createSocialLink(
        'https://www.twitter.com',
        '/src/img/svg-product-modal-window/twitter.png',
        'Twitter'
    );

    const pinterestLink = createSocialLink(
        'https://www.pinterest.com',
        '/src/img/svg-product-modal-window/pinterest.png',
        'Pinterest'
    );

    const linkedInLink = createSocialLink(
        'https://www.linkedin.com',
        '/src/img/svg-product-modal-window/linkedin.png',
        'LinkedIn'
    );

    shareProductContainer.append(facebookLink, twitterLink, pinterestLink, linkedInLink);


    const typeContainer = document.createElement('div');
    typeContainer.className = 'type-container';
    typeContainer.appendChild(typeLabel);
    typeContainer.appendChild(productType);
    ////ТЕГИ ТОВАРОВ


    const productImg = document.createElement('img');
    productImg.src = imgUrls[currentIndex]
    productImg.className = 'product-img';

    /////КНОПКИ ДЛЯ СВАЙПА ФОТО

    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'indicators-container';

    function updateIndicators() {
        indicatorsContainer.innerHTML = '';
        imgUrls.forEach((_, index) => {
            const indicator = document.createElement('span');
            indicator.className = 'indicator';
            if (index === currentIndex) {
                indicator.classList.add('active');
            }
            indicatorsContainer.appendChild(indicator);
        });
    }

    updateIndicators();

    const productImgButtonLeft = document.createElement('button');
    productImgButtonLeft.className = 'product-img__button';

    productImgButtonLeft.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + imgUrls.length) % imgUrls.length;
        productImg.src = imgUrls[currentIndex];
        updateIndicators();
    })

    const leftArrowImg = document.createElement('img');
    leftArrowImg.src = '/src/img/svg-product-modal-window/left-chevron.png';
    leftArrowImg.className = 'left-arrow__img';
    productImgButtonLeft.appendChild(leftArrowImg);

    const productImgButtonRight = document.createElement('button');
    productImgButtonRight.className = 'product-img__button';

    productImgButtonRight.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % imgUrls.length;
        productImg.src = imgUrls[currentIndex];
        updateIndicators();

    })

    const rightArrowImg = document.createElement('img');
    rightArrowImg.className = 'right-arrow__img'
    rightArrowImg.src = '/src/img/svg-product-modal-window/right-chevron.png';
    productImgButtonRight.appendChild(rightArrowImg);
    /////КНОПКИ ДЛЯ СВАЙПА ФОТО


    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'buttons-container';


    // ЛОГИКА С ПРОВЕРКОЙ НА НАЛИЧЕЕ ПРОДУКТА
    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'ADD TO CART';
    addToCartButton.className = 'add-to-cart-button';

    addToCartButton.addEventListener('click', () => {
        const quantity = currentQuantity;
        const selectedColor = colorSelect.value;
        const selectedSize = sizeSelect.value;

        if (!validateProductSelection(product, selectedColor, selectedSize, quantity)) return;

        const updatedProduct = {
            ...product,
            size: selectedSize,
            color: selectedColor,
        };

        updateCartWithProduct(updatedProduct, quantity);

    });

    function validateProductSelection(product, color, size, quantity) {
        if (!isProductAvailable(product, color, size, quantity)) {
            showOutOfStockMessage();
            return false;
        }

        if (quantity <= 0) {
            alert('Please select a valid quantity');
            return false;
        }

        return true;
    }

    function isProductAvailable(product, color, size, quantity) {
        const variation = product.variations?.find(v => v.color === color);
        const sizeInfo = variation?.sizes.find(s => s.size === size);
        return sizeInfo && sizeInfo.quantity >= quantity;
    }

    function showOutOfStockMessage() {
        const outOfStockMessage = document.createElement('div');
        outOfStockMessage.className = 'out-of-stock-message';
        outOfStockMessage.textContent = 'Sorry, this product is out of stock!';

        productTextContainer.prepend(outOfStockMessage);

        setTimeout(() => {
            outOfStockMessage.remove();
        }, 3000);
    }


    const addToWishListButton = document.createElement('button');
    addToWishListButton.className = 'add-to-wish-list__button';
    addToWishListButton.textContent = 'ADD TO WISHLIST';

    const addToWishListButtonImg = document.createElement('img');
    addToWishListButtonImg.className = 'add-to-wish-list-button__img';
    addToWishListButtonImg.src = '/src/img/svg-product-modal-window/heart.png';
    addToWishListButtonImg.alt = 'Heart Icon';

    addToWishListButton.prepend(addToWishListButtonImg);
    buttonsContainer.append(addToCartButton, addToWishListButton)


    //РЕЙТИНГ ЗВЕЗДЫ
    const productStarsContainer = document.createElement('div');
    productStarsContainer.className = 'product-stars__container';


    const productProductsRank = document.createElement('p');
    productStarsContainer.innerHTML = getStarsHTML(product.rank);

    productTextContainer.appendChild(productStarsContainer);


    // Блок для селекторов цветов и размеров
    let sizeSelect;
    let sizeText;
    if (product.variations && product.variations.length > 0) {
        const firstVariation = product.variations[0];

        sizeText = document.createElement('p');
        sizeText.className = 'product-size__label';
        sizeText.textContent = "Size:";

        sizeSelect = document.createElement('select');
        sizeSelect.className = 'product-sizes';

        firstVariation.sizes.forEach(sizeObj => {
            const sizeOption = document.createElement('option');
            sizeOption.value = sizeObj.size;
            sizeOption.text = sizeObj.size;
            sizeSelect.append(sizeOption);
        });


        productTextContainer.appendChild(sizeText);
        productTextContainer.appendChild(sizeSelect);
    }

    let colorSelect;
    let colorText;
    if (product.variations) {
        colorText = document.createElement('p');
        colorText.className = 'product-color__label';
        colorText.textContent = "Color:";

        colorSelect = document.createElement('select');
        colorSelect.className = 'product-colors';

        product.variations.forEach(variation => {
            const colorOption = document.createElement('option');
            colorOption.value = variation.color;
            colorOption.textContent = variation.color;
            colorSelect.append(colorOption);
        });

        productTextContainer.appendChild(colorText);
        productTextContainer.appendChild(colorSelect);

        colorSelect.addEventListener('change', (event) => {
            const selectedColor = event.target.value;
            const selectedVariation = product.variations.find(variation => variation.color === selectedColor);

            if (selectedVariation) {
                if (selectedVariation.imageUrls) {
                    productImg.src = selectedVariation.imageUrls[0];
                }

                const sizeSelect = document.querySelector('.modal-sizes');
                sizeSelect.innerHTML = '';
                selectedVariation.sizes.forEach(sizeObj => {
                    const sizeOption = document.createElement('option');
                    sizeOption.value = sizeObj.size;
                    sizeOption.text = sizeObj.size;
                    sizeSelect.append(sizeOption);
                });

                productPrice.textContent = `Price: $${selectedVariation.currentPrice.toFixed(2)}`;
            }
        });
    }

    const quantityInput = document.createElement('input');
    quantityInput.className = 'product-quantity__input';
    quantityInput.type = "number";
    quantityInput.value = currentQuantity;
    quantityInput.min = 1;

    const decreaseButton = document.createElement('button');
    decreaseButton.className = 'quantity-button';
    decreaseButton.textContent = '-';
    decreaseButton.addEventListener('click', () => {
        if (currentQuantity > 1) {
            currentQuantity--;
            quantityInput.value = currentQuantity;
        }
    });

    const increaseButton = document.createElement('button');
    increaseButton.className = 'quantity-counter';
    increaseButton.textContent = '+';
    increaseButton.addEventListener('click', () => {
        const selectedColor = document.querySelector('.product-colors')?.value;
        const selectedSize = document.querySelector('.product-sizes')?.value;

        if (selectedColor && selectedSize) {
            // Ищем нужную вариацию
            const selectedVariation = product.variations.find(variation => variation.color === selectedColor);

            if (selectedVariation) {
                const selectedSizeObj = selectedVariation.sizes.find(sizeObj => sizeObj.size === selectedSize);

                if (selectedSizeObj && currentQuantity < selectedSizeObj.quantity) {
                    currentQuantity++;
                    quantityInput.value = currentQuantity;
                } else {
                    console.log('Недостаточно товара для увеличения');
                }
            } else {
                console.log('Вариация с таким цветом не найдена');
            }
        } else {
            console.log('Не выбран цвет или размер');
        }
    });

    quantityInput.addEventListener('input', () => {
        const value = parseInt(quantityInput.value);
        const selectedColor = document.querySelector('.product-colors')?.value;
        const selectedSize = document.querySelector('.product-sizes')?.value;

        if (selectedColor && selectedSize) {
            const selectedVariation = product.variations.find(variation => variation.color === selectedColor);
            if (selectedVariation) {
                const selectedSizeObj = selectedVariation.sizes.find(sizeObj => sizeObj.size === selectedSize);

                if (selectedSizeObj) {
                    if (value < 1) {
                        quantityInput.value = 1;
                        currentQuantity = 1;
                    } else if (value > selectedSizeObj.quantity) {
                        quantityInput.value = selectedSizeObj.quantity;
                        currentQuantity = selectedSizeObj.quantity;
                    } else {
                        currentQuantity = value;
                    }
                } else {
                    console.log('Размер не найден');
                }
            } else {
                console.log('Вариация с таким цветом не найдена');
            }
        } else {
            console.log('Не выбран цвет или размер');
        }
    });

    const quantityContainer = document.createElement('div');
    quantityContainer.className = 'quantity-container';
    quantityContainer.append(decreaseButton);
    quantityContainer.append(quantityInput);
    quantityContainer.append(increaseButton);

    updateStarsDisplay(productStarsContainer, product.rank);
    addRatingEventListeners(productStarsContainer, product);

    productTextContainer.append(
        productTitle,
        productStarsContainer,
        productProductsRank,
        productPrice,
        productDescription,
        sizeText, sizeSelect,
        colorText, colorSelect,
        quantityContainer,
        buttonsContainer,
        stockKeepingContainer,
        categoryContainer,
        typeContainer,
        shareProductContainer
    );

    productImgContainer.append(productImg, productImgButtonLeft, productImgButtonRight, indicatorsContainer);

    productSection.append(productImgContainer, productTextContainer);

    productSection.document.body.append(productSection);
}

document.addEventListener("DOMContentLoaded", () => {
    const cartIcon = document.querySelector(".header-icon__cart");

    if (cartIcon) {
        cartIcon.addEventListener("click", (event) => {
            event.preventDefault();
            createModalWindowCart(false, modalWindowPosition.right)
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const cartIcon = document.querySelector(".header-icon__user");

    if (cartIcon) {
        cartIcon.addEventListener("click", (event) => {
            createModalForSingUpForm(false, modalWindowPosition.center);
            event.preventDefault()
        });
    }
});
