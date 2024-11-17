import {modalWindowPosition, store} from "./constants.js";
import {addRatingEventListeners, createCartProduct, getStarsHTML, updateStarsDisplay} from "./top-sellers.js";
import {extractImgUrls} from "./helper/extractImgUrls.js";
import {createModal} from "./helper/createModalFunction.js";
import {addToCartProducts} from "./helper/addToCartProducts.js";

export const modalProductWindow = (product, position = modalWindowPosition.center) => {
    const imgUrls = extractImgUrls(product)
    const {modalDiv, modalContent, overlay} = createModal(position);

    let currentIndex = 0;  // Начальный индекс изображения
    let currentQuantity = 1; // Начальное количество товара


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

// Объединяем метку и значение в один контейнер
    const categoryContainer = document.createElement('div');
    categoryContainer.className = 'category-container'; // Добавляем класс для стилей
    categoryContainer.appendChild(categoryLabel);
    categoryContainer.appendChild(productCategory);

    const typeLabel = document.createElement('p');
    typeLabel.className = 'product-tag';
    typeLabel.textContent = 'Type:';

    const productType = document.createElement('p');
    productType.className = 'product-type';
    productType.textContent = `${product.type}`;


    // Создаем контейнер для блока "Share:"
    const shareProductContainer = document.createElement('div');
    shareProductContainer.className = 'product-share';

// Текст "Share:"
    const shareProductText = document.createElement('p');
    shareProductText.className = 'product-share__text';
    shareProductText.textContent = 'Share: ';
    shareProductContainer.appendChild(shareProductText);

// Функция для создания ссылки с иконкой соцсети
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

// Добавляем ссылки в контейнер
    shareProductContainer.append(facebookLink, twitterLink, pinterestLink, linkedInLink);


// Объединяем метку и значение в один контейнер
    const typeContainer = document.createElement('div');
    typeContainer.className = 'type-container'; // Добавляем класс для стилей
    typeContainer.appendChild(typeLabel);
    typeContainer.appendChild(productType);
    ////ТЕГИ ТОВАРОВ


    const modalImg = document.createElement('img');
    modalImg.src = imgUrls[currentIndex]
    modalImg.className = 'modal-img';

    /////КНОПКИ ДЛЯ СВАЙПА ФОТО

    // Создайте контейнер для индикаторов изображений
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'indicators-container';

// Функция для создания индикаторов
    function updateIndicators() {
        indicatorsContainer.innerHTML = ''; // Очистите контейнер перед обновлением
        imgUrls.forEach((_, index) => {
            const indicator = document.createElement('span');
            indicator.className = 'indicator';
            if (index === currentIndex) {
                indicator.classList.add('active'); // Подсветите активный индикатор
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
        currentIndex = (currentIndex + 1) % imgUrls.length;  // Смена индекса
        modalImg.src = imgUrls[currentIndex];  // Обновляем изображение
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

    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'ADD TO CART';
    addToCartButton.className = 'add-to-cart-button';

    addToCartButton.addEventListener('click', () => {
        const selectedColor = colorSelect ? colorSelect.value : null;
        const selectedSize = sizeSelect ? sizeSelect.value : null;
        const quantity = currentQuantity;

        // Проверка наличия товара
        const selectedVariation = product.variations.find(variation => variation.color === selectedColor);

        // Если товар отсутствует на складе
        if (selectedVariation && selectedVariation.quantity === 0) {
            showOutOfStockMessage(); // Показать сообщение об отсутствии товара
            return; // Останавливаем выполнение
        }

        if (quantity <= 0) {
            alert('Please select a valid quantity');
            return; // Останавливаем выполнение, если количество меньше 1
        }

        // Добавляем товар в корзину, если количество больше 0
        addToCartProducts(product, quantity);
        console.log(store.cart.products);
    });

    function showOutOfStockMessage() {
        // Создаем сообщение об отсутствии товара
        const outOfStockMessage = document.createElement('div');
        outOfStockMessage.className = 'out-of-stock-message'; // Используем класс из CSS

        // Текст сообщения
        outOfStockMessage.textContent = 'Sorry, this product is out of stock!';

        // Добавляем сообщение в модальное окно
        modalTextContainer.prepend(outOfStockMessage); // Используем prepend, чтобы сообщение шло первым элементом

        // Убираем сообщение через 3 секунды
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
    const modalStarsContainer = document.createElement('div');
    modalStarsContainer.className = 'modal-stars__container';


    const modalProductsRank = document.createElement('p');
    modalStarsContainer.innerHTML = getStarsHTML(product.rank);

    modalTextContainer.appendChild(modalStarsContainer);


    // Блок для селекторов цветов и размеров
    let sizeSelect;
    let sizeText
    if (product.variations && product.sizes) {
        sizeText = document.createElement('p')
        sizeText.className = 'modal-size__label';
        sizeText.textContent = "Size:"

        sizeSelect = document.createElement('select');
        sizeSelect.className = 'modal-sizes';

        const sizesProduct = product.sizes.split(', ');
        sizesProduct.forEach(size => {
            const sizeOption = document.createElement('option');
            sizeOption.value = size;
            sizeOption.text = size;
            sizeSelect.append(sizeOption)
        })
        modalTextContainer.appendChild(sizeText);
        modalTextContainer.appendChild(sizeSelect);

    }

    let colorSelect;
    let colorText
    if (product.variations) {
        colorText = document.createElement('p')
        colorText.className = 'modal-color__label';
        colorText.textContent = "Color:"

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
            const selectedVariation = product.variations.find(variations => variations.color === selectedColor)
            if (selectedVariation && selectedVariation.imageUrls) {
                modalImg.src = selectedVariation.imageUrls[0]
            }

        })
    }

    // отображения количества товара
    const quantityInput = document.createElement('input');
    quantityInput.className = 'modal-quantity__input';
    quantityInput.type = "number";
    quantityInput.value = currentQuantity;
    quantityInput.min = 1;

    //кнопка для уменьшеная к-ства
    const decreaseButton = document.createElement('button');
    decreaseButton.className = 'quantity-button';
    decreaseButton.textContent = '-';
    decreaseButton.addEventListener('click', () => {
        if (currentQuantity > 1) {
            currentQuantity--;
            quantityInput.value = currentQuantity;
        }
    })

//кнопка для увиличения к-ства
    const increaseButton = document.createElement('button');
    increaseButton.className = 'quantity-counter';
    increaseButton.textContent = '+';
    increaseButton.addEventListener('click', () => {
        const selectedColor = document.querySelector('.modal-colors')?.value  //выбранный цвет
        const selectedVariation = product.variations.find(variation => variation.color === selectedColor);

        // Если существует выбранная вариация и текущее количество (currentQuantity) меньше, чем доступное количество для этой вариации (selectedVariation.quantity) то Увеличиваем currentQuantity на 1.
        if (selectedVariation && currentQuantity < selectedVariation.quantity) {
            currentQuantity++;
            quantityInput.value = currentQuantity;
        }
    })

    // изменения значения в input
    quantityInput.addEventListener('input', () => {
        const value = parseInt(quantityInput.value);
        const selectedColor = document.querySelector('.modal-colors')?.value; // Получаем выбранный цвет
        const selectedVariation = product.variations.find(variation => variation.color === selectedColor);
        if (selectedVariation) {
            if (value < 1) {
                quantityInput.value = 1;
                currentQuantity = 1;
            } else if (value > selectedVariation.quantity) {
                quantityInput.value = selectedVariation.quantity;
                currentQuantity = selectedVariation.quantity;
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
        modalStarsContainer, // Добавили звездный рейтинг
        modalProductsRank,
        modalPrice,
        modalDescription,
        sizeText, sizeSelect,
        colorText, colorSelect,
        quantityContainer,
        buttonsContainer,
        stockKeepingContainer,
        categoryContainer, // Используем контейнер для категории
        typeContainer, // Используем контейнер для типа
        shareProductContainer
    );

    modalImgContainer.append(modalImg, modalImgButtonLeft, modalImgButtonRight,  indicatorsContainer);

    modalContent.append(modalImgContainer, modalTextContainer);
    document.body.appendChild(modalDiv);
};
