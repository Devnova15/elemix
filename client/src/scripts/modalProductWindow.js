import {modalWindowPosition} from "./constants.js";
import {createCartProduct} from "./top-sellers.js";
import {extractImgUrls} from "./helper/extractImgUrls.js";
import {createModal} from "./helper/createModalFunction.js";

export const modalProductWindow = (product, position = modalWindowPosition.center) => {
    const imgUrls = extractImgUrls(product)
    const {modalDiv, modalContent} = createModal(position);

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
    modalPrice.textContent = `$${product.currentPrice}`;
    modalPrice.className = 'modal-price';

    const modalDescription = document.createElement('p');
    modalDescription.textContent = product.description;
    modalDescription.className = 'modal-description'


    const productCategory = document.createElement('p');
    productCategory.textContent = `Category: ${product.categories}`

    const productType = document.createElement('p')
    productType.textContent = `Type: ${product.type}`

    const modalImg = document.createElement('img');
    modalImg.src = imgUrls[currentIndex]
    modalImg.className = 'modal-img';


    const modalImgButtonLeft = document.createElement('button');
    modalImgButtonLeft.className = 'modal-img__button';
    modalImgButtonLeft.textContent = '<'
    modalImgButtonLeft.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + imgUrls.length) % imgUrls.length;
        modalImg.src = imgUrls[currentIndex];
    })

    const modalImgButtonRight = document.createElement('button');
    modalImgButtonRight.className = 'modal-img__button';
    modalImgButtonRight.textContent = '>'
    modalImgButtonRight.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % imgUrls.length;  // Смена индекса
        modalImg.src = imgUrls[currentIndex];  // Обновляем изображение
    })


    const modalCloseButton = document.createElement('button');
    modalCloseButton.textContent = '×';
    modalCloseButton.className = 'modal-close__button'
    modalCloseButton.addEventListener('click', () => modalDiv.remove());


    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'ADD TO CART';
    addToCartButton.className = 'add-to-cart-button';


    const modalProductsRank = document.createElement('p');
    modalProductsRank.textContent = `Rank:${product.variations ? product.variations[0].rank : product.rank}`;


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


    modalTextContainer.append(
        modalCloseButton,
        modalTitle,
        modalProductsRank,
        modalPrice,
        modalDescription,
        sizeText, sizeSelect,
        colorText, colorSelect,
        quantityContainer,
        addToCartButton,
        productCategory,
        productType,
    );

    modalImgContainer.append(modalImg, modalImgButtonLeft, modalImgButtonRight);

    modalContent.append(modalImgContainer, modalTextContainer);
    document.body.appendChild(modalDiv);
};
