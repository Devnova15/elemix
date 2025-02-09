import {modalWindowPosition, store} from "./constants.js";
import {addRatingEventListeners, createCartProduct, getStarsHTML, updateStarsDisplay} from "./top-sellers.js";
import {extractImgUrls} from "./helper/extractImgUrls.js";
import {createModal} from "./helper/createModalFunction.js";
import {updateCartWithProduct} from "./helper/updateCartWithProduct.js";

export const modalProductWindow = (product, position = modalWindowPosition.center) => {
    const imgUrls = extractImgUrls(product)
    const {modalDiv, modalContent, overlay} = createModal(position);

    let currentIndex = 0;
    let currentQuantity = 1;


    const modalTextContainer = document.createElement('div');
    modalTextContainer.className = 'modal-text__container';

    const modalImgContainer = document.createElement('div');
    modalImgContainer.className = 'modal-img__container';

    const modalTitle = document.createElement('p');
    modalTitle.textContent = product.name;
    modalTitle.className = 'modal-title';

    const modalPrice = document.createElement('p');
    modalPrice.textContent = `Price: $${product.currentPrice}`;
    modalPrice.className = 'modal-price';

    const modalDescription = document.createElement('p');
    modalDescription.textContent = product.description;
    modalDescription.className = 'modal-description'


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
    typeContainer.className = 'type-container'; // Добавляем класс для стилей
    typeContainer.appendChild(typeLabel);
    typeContainer.appendChild(productType);
    ////ТЕГИ ТОВАРОВ


    const modalImg = document.createElement('img');
    modalImg.src = imgUrls[currentIndex]
    modalImg.className = 'modal-img';

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

    const modalImgButtonLeft = document.createElement('button');
    modalImgButtonLeft.className = 'modal-img__button';

    modalImgButtonLeft.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + imgUrls.length) % imgUrls.length;
        modalImg.src = imgUrls[currentIndex];
        updateIndicators();
    })

    const leftArrowImg = document.createElement('img');
    leftArrowImg.src = '/src/img/svg-product-modal-window/left-chevron.png';
    leftArrowImg.className = 'left-arrow__img';
    modalImgButtonLeft.appendChild(leftArrowImg);

    const modalImgButtonRight = document.createElement('button');
    modalImgButtonRight.className = 'modal-img__button';

    modalImgButtonRight.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % imgUrls.length;
        modalImg.src = imgUrls[currentIndex];
        updateIndicators();

    })

    const rightArrowImg = document.createElement('img');
    rightArrowImg.className = 'right-arrow__img'
    rightArrowImg.src = '/src/img/svg-product-modal-window/right-chevron.png';
    modalImgButtonRight.appendChild(rightArrowImg);
    /////КНОПКИ ДЛЯ СВАЙПА ФОТО


    const modalCloseButton = document.createElement('button');
    modalCloseButton.textContent = '×';
    modalCloseButton.className = 'modal-close__button'
    modalCloseButton.addEventListener('click', () => {
        overlay.remove();
        modalDiv.remove()
    });

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
        console.log(store.cart.products);
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

        modalTextContainer.prepend(outOfStockMessage);

        setTimeout(() => {
            outOfStockMessage.remove();
        }, 3000);
    }



    // const addToCartButton = document.createElement('button');
    // addToCartButton.textContent = 'ADD TO CART';
    // addToCartButton.className = 'add-to-cart-button';
    //
    // addToCartButton.addEventListener('click', () => {
    //     const quantity = currentQuantity;
    //
    //     if (quantity <= 0) {
    //         alert('Please select a valid quantity');
    //         return;
    //     }
    //
    //     const updatedProduct= {
    //         ...product,
    //         size: sizeSelect.value,
    //         color: colorSelect.value,
    //     }
    //     console.log('Product color', product.variations[0]?.color)
    //     updateCartWithProduct(updatedProduct, quantity);
    //
    //     console.log(store.cart.products);
    // });







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
    const modalStarsContainer = document.createElement('div');
    modalStarsContainer.className = 'modal-stars__container';


    const modalProductsRank = document.createElement('p');
    modalStarsContainer.innerHTML = getStarsHTML(product.rank);

    modalTextContainer.appendChild(modalStarsContainer);


    // Блок для селекторов цветов и размеров
    let sizeSelect;
    let sizeText;
    if (product.variations && product.variations.length > 0) {
        const firstVariation = product.variations[0];

        sizeText = document.createElement('p');
        sizeText.className = 'modal-size__label';
        sizeText.textContent = "Size:";

        sizeSelect = document.createElement('select');
        sizeSelect.className = 'modal-sizes';

        firstVariation.sizes.forEach(sizeObj => {
            const sizeOption = document.createElement('option');
            sizeOption.value = sizeObj.size;
            sizeOption.text = sizeObj.size;
            sizeSelect.append(sizeOption);
        });


        modalTextContainer.appendChild(sizeText);
        modalTextContainer.appendChild(sizeSelect);
    }

    let colorSelect;
    let colorText;
    if (product.variations) {
        colorText = document.createElement('p');
        colorText.className = 'modal-color__label';
        colorText.textContent = "Color:";

        colorSelect = document.createElement('select');
        colorSelect.className = 'modal-colors';

        product.variations.forEach(variation => {
            const colorOption = document.createElement('option');
            colorOption.value = variation.color;
            colorOption.textContent = variation.color;
            colorSelect.append(colorOption);
        });

        modalTextContainer.appendChild(colorText);
        modalTextContainer.appendChild(colorSelect);

        colorSelect.addEventListener('change', (event) => {
            const selectedColor = event.target.value;
            const selectedVariation = product.variations.find(variation => variation.color === selectedColor);

            if (selectedVariation) {
                if (selectedVariation.imageUrls) {
                    modalImg.src = selectedVariation.imageUrls[0];
                }

                const sizeSelect = document.querySelector('.modal-sizes');
                sizeSelect.innerHTML = '';
                selectedVariation.sizes.forEach(sizeObj => {
                    const sizeOption = document.createElement('option');
                    sizeOption.value = sizeObj.size;
                    sizeOption.text = sizeObj.size;
                    sizeSelect.append(sizeOption);
                });

                modalPrice.textContent = `Price: $${selectedVariation.currentPrice.toFixed(2)}`;
            }
        });
    }

    const quantityInput = document.createElement('input');
    quantityInput.className = 'modal-quantity__input';
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
        const selectedColor = document.querySelector('.modal-colors')?.value;
        const selectedSize = document.querySelector('.modal-sizes')?.value;
        const selectedVariation = product.variations.find(variation => variation.color === selectedColor);

        const selectedSizeObj = selectedVariation.sizes.find(sizeObj => sizeObj.size === selectedSize);

        if (selectedSizeObj && currentQuantity < selectedSizeObj.quantity) {
            currentQuantity++;
            quantityInput.value = currentQuantity;
        }
    });
    quantityInput.addEventListener('input', () => {
        const value = parseInt(quantityInput.value);
        const selectedColor = document.querySelector('.modal-colors')?.value;
        const selectedSize = document.querySelector('.modal-sizes')?.value;
        const selectedVariation = product.variations.find(variation => variation.color === selectedColor);
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
        }
    });

    const quantityContainer = document.createElement('div');
    quantityContainer.className = 'quantity-container';
    quantityContainer.append(decreaseButton);
    quantityContainer.append(quantityInput);
    quantityContainer.append(increaseButton);

    updateStarsDisplay(modalStarsContainer, product.rank);
    addRatingEventListeners(modalStarsContainer, product);

    modalTextContainer.append(
        modalCloseButton,
        modalTitle,
        modalStarsContainer,
        modalProductsRank,
        modalPrice,
        modalDescription,
        sizeText, sizeSelect,
        colorText, colorSelect,
        quantityContainer,
        buttonsContainer,
        stockKeepingContainer,
        categoryContainer,
        typeContainer,
        shareProductContainer
    );

    modalImgContainer.append(modalImg, modalImgButtonLeft, modalImgButtonRight, indicatorsContainer);

    modalContent.append(modalImgContainer, modalTextContainer);
    document.body.appendChild(modalDiv);
}