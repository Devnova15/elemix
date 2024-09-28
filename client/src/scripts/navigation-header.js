import {modalWindowPosition} from "./constants.js";

// Функция для удаления окна по нажатию клавиши
export const removeWindowByKeyPress = (event, target) => {
    if (event.keyCode === 27) { // Используем число 27, а не строку
        target.remove();
        document.removeEventListener('keydown', removeWindowByKeyPress);
    }
    console.log(event);
};

// Функция для создания модального окна
export const createModal = (position = modalWindowPosition.right) => {
    let modalDiv = document.createElement("div");
    let modalContent = document.createElement("div");

    modalDiv.className = "modal";
    modalDiv.id = "myModal";

    switch (true) {
        case position === modalWindowPosition.right:
            modalContent.className = 'modal-content-right';
            break;
        case position === modalWindowPosition.center:
            modalContent.className = "modal-content";
            break;
    }

    modalDiv.appendChild(modalContent);

    document.addEventListener('keydown', (event) => {
        removeWindowByKeyPress(event, modalDiv);
    });

    return {
        modalDiv,
        modalContent
    };
};

// МОДАЛКА МЕНЮ
export const createModalWindowMenu = (error, position = modalWindowPosition.right) => {
    const {modalDiv, modalContent} = createModal(position);

    // это обертка поисковика
    let menuSearchContainer = document.createElement('div');
    menuSearchContainer.className = "menu-search__container";

    let menuSearchInput = document.createElement('input');
    menuSearchInput.className = "menu-search__input";
    menuSearchInput.type = "text";
    menuSearchInput.placeholder = "Search...";

    let menuSearchButton = document.createElement('button');
    menuSearchButton.className = "menu-search__button";

    let menuSearchImg = document.createElement('img');
    menuSearchImg.className = "menu-search__img";
    menuSearchImg.src = '/src/img/svg-header/search.svg';

    menuSearchButton.appendChild(menuSearchImg);
    menuSearchContainer.appendChild(menuSearchInput);
    menuSearchContainer.appendChild(menuSearchButton);

    // обертка для ашек
    let menuContentContainer = document.createElement('div');
    menuContentContainer.className = "menu-content__container";

    let menuContent = document.createElement('ul');
    menuContent.className = "menu-content";

    let menuContentLiHome = document.createElement('li');
    menuContentLiHome.className = "menu-content-li__home";
    menuContentLiHome.textContent = "HOME";
    let menuContentLiSpanHome = document.createElement('span');
    menuContentLiSpanHome.className = "span-home";
    menuContentLiSpanHome.textContent = ">";

    let menuContentLiShop = document.createElement('li');
    menuContentLiShop.className = "menu-content-li__shop";
    menuContentLiShop.textContent = "SHOP";
    let menuContentLiSpanShop = document.createElement('span');
    menuContentLiSpanShop.className = "span-shop";
    menuContentLiSpanShop.textContent = ">";

    let menuContentLiPages = document.createElement('li');
    menuContentLiPages.className = "menu-content-li__pages";
    menuContentLiPages.textContent = "PAGES";
    let menuContentLiSpanPages = document.createElement('span');
    menuContentLiSpanPages.className = "span-pages";
    menuContentLiSpanPages.textContent = ">";

    let menuContentLiBlog = document.createElement('li');
    menuContentLiBlog.className = "menu-content-li__blog";
    menuContentLiBlog.textContent = "BLOG";
    let menuContentLiSpanBlog = document.createElement('span');
    menuContentLiSpanBlog.className = "span-blog";
    menuContentLiSpanBlog.textContent = ">";

    let menuContentLiContact = document.createElement('li');
    menuContentLiContact.className = "menu-content-li__contact";
    menuContentLiContact.textContent = "CONTACT";
    let menuContentLiSpanContact = document.createElement('span');
    menuContentLiSpanContact.className = "span-contact";
    menuContentLiSpanContact.textContent = ">";


    menuContent.appendChild(menuContentLiHome);
    menuContent.appendChild(menuContentLiShop);
    menuContent.appendChild(menuContentLiPages);
    menuContent.appendChild(menuContentLiBlog);
    menuContent.appendChild(menuContentLiContact);

    menuContentLiHome.appendChild(menuContentLiSpanHome);
    menuContentLiShop.appendChild(menuContentLiSpanShop);
    menuContentLiPages.appendChild(menuContentLiSpanPages);
    menuContentLiBlog.appendChild(menuContentLiSpanBlog);
    menuContentLiContact.appendChild(menuContentLiSpanContact);

    menuContentContainer.appendChild(menuContent);

    // обертка футера менюшки
    let menuFooterContainer = document.createElement('div');
    menuFooterContainer.className = "menu-footer__container";


    let menuFooterLoginWrapper = document.createElement('div');
    menuFooterLoginWrapper.className = "menu-footer-login__wrapper";

    let menuFooterLoginImg = document.createElement('img');
    menuFooterLoginImg.className = "menu-footer-login__img";
    menuFooterLoginImg.src = "/src/img/svg-header/user.svg";

    let menuFooterLoginText = document.createElement('p');
    menuFooterLoginText.className = "menu-footer-login__text";
    menuFooterLoginText.textContent = "Login";

    let menuFooterCartWrapper = document.createElement('div');
    menuFooterCartWrapper.className = "menu-footer-cart__wrapper";

    let menuFooterCartImg = document.createElement('img');
    menuFooterCartImg.className = "menu-footer-cart__img";
    menuFooterCartImg.src = "/src/img/svg-header/shopping-cart.svg";

    let menuFooterCartText = document.createElement('p');
    menuFooterCartText.className = "menu-footer-cart__text";
    menuFooterCartText.textContent = "Shopping cart";

    let menuFooterCartSpan = document.createElement('span');
    menuFooterCartSpan.textContent = "0";

    menuFooterCartText.appendChild(menuFooterCartSpan);

    menuFooterContainer.appendChild(menuFooterLoginWrapper);
    menuFooterLoginWrapper.appendChild(menuFooterLoginImg);
    menuFooterLoginWrapper.appendChild(menuFooterLoginText);
    menuFooterContainer.appendChild(menuFooterCartWrapper);
    menuFooterCartWrapper.appendChild(menuFooterCartImg);
    menuFooterCartWrapper.appendChild(menuFooterCartText);

    // Добавляем все элементы в модальное окно
    modalContent.appendChild(menuSearchContainer);
    modalContent.appendChild(menuContentContainer);
    modalContent.appendChild(menuFooterContainer);

    if (error) {
        let title = document.createElement("h2");
        title.textContent = "Error";
        modalContent.appendChild(title);
    }

    document.body.append(modalDiv);
};

document.addEventListener("DOMContentLoaded", () => {
    const hamburgerIcon = document.querySelector(".header-icon__menu");

    if (hamburgerIcon) {
        hamburgerIcon.addEventListener("click", () => {
        });
    }
});

// МОДАЛКА КОРЗИНЫ
export const createModalWindowCart = (error, position = modalWindowPosition.right) => {
    const {modalDiv, modalContent} = createModal(position);

    let cartSideBarHeader = document.createElement('div');
    cartSideBarHeader.className = "cart-side-bar__header"

    let cartSideBarTitle = document.createElement('p');
    cartSideBarTitle.className = "cart-side-bar__title"
    cartSideBarTitle.textContent = "SHOPPING CART"

    let cartSideBarSpan = document.createElement('span');
    cartSideBarSpan.className = "cart-side-bar__span"
    cartSideBarSpan.textContent = "0"

    let cartSideBarButton = document.createElement('button');
    cartSideBarButton.className = "cart-side-bar__button"

    let cartSideBarButtonCloseImg = document.createElement('img');
    cartSideBarButtonCloseImg.className = "cart-side-bar-button-close__img"
    cartSideBarButtonCloseImg.src = "/src/img/header-images/close-svgrepo-com.png"

    cartSideBarButtonCloseImg.addEventListener('click', () => {
        modalDiv.remove();
    })

    let cartSideBarContent = document.createElement('div');
    cartSideBarContent.className = "cart-side-bar__content"

    let cartSideBarContentEmptyMassage = document.createElement('p');
    cartSideBarContentEmptyMassage.className = "cart-side-bar-content-empty__massage"
    cartSideBarContentEmptyMassage.textContent = "No products in the cart"



    // Собираем элементы шапки
    cartSideBarButton.appendChild(cartSideBarButtonCloseImg);
    cartSideBarHeader.appendChild(cartSideBarTitle);
    cartSideBarHeader.appendChild(cartSideBarSpan);
    cartSideBarHeader.appendChild(cartSideBarButton);

    // Собираем основной контент
    cartSideBarContent.appendChild(cartSideBarContentEmptyMassage);

    // Теперь вставляем элементы в модальное окно
    modalContent.appendChild(cartSideBarHeader);  // Вставляем шапку в контент модального окна
    modalContent.appendChild(cartSideBarContent); // Вставляем основной контент в модальное окно


    if (error) {
        let title = document.createElement("h2");
        title.textContent = "Error";
        modalContent.appendChild(title);
    }

    document.body.append(modalDiv);
}

document.addEventListener("DOMContentLoaded", () => {
    const cartIcon = document.querySelector(".header-icon__cart");

    if (cartIcon) {
        cartIcon.addEventListener("click", () => {
        });
    }
});

export const createModalForSingUpForm = (error, position = modalWindowPosition.center) => {
    const {modalDiv, modalContent} = createModal(position);


}