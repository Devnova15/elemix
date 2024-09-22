import { modalWindowPosition } from "./constants.js";

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

export const createModalWindowMenu = (error, position = modalWindowPosition.right) => {
    const { modalDiv, modalContent } = createModal(position);

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

    let menuContent = document.createElement('div');
    menuContent.className = "menu-content";

    let menuContentUlHome = document.createElement('ul');
    menuContentUlHome.className = "menu-content-ul__home";
    menuContentUlHome.textContent = "HOME";
    let menuContentUlHomeLi = document.createElement('li')
    menuContentUlHomeLi.className = "menu-content-ul-home__li"
    let menuContentUlSpanHome = document.createElement('span');
    menuContentUlSpanHome.className = "span-home";
    menuContentUlSpanHome.textContent = ">";


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

    // Добавляем элементы списка в меню
    menuContent.appendChild(menuContentLiHome);
    menuContent.appendChild(menuContentLiShop);
    menuContent.appendChild(menuContentLiPages);
    menuContent.appendChild(menuContentLiBlog);
    menuContent.appendChild(menuContentLiContact);

    menuContentContainer.appendChild(menuContent);

    // обертка футера менюшки
    let menuFooterContainer = document.createElement('div');
    menuFooterContainer.className = "menu-footer__container";

    let menuFooterLoginImg = document.createElement('img');
    menuFooterLoginImg.className = "menu-footer-login__img";
    menuFooterLoginImg.src = "/src/img/svg-header/user.svg";

    let menuFooterLoginText = document.createElement('p');
    menuFooterLoginText.className = "menu-footer-login__text";
    menuFooterLoginText.textContent = "Login";

    let menuFooterCartImg = document.createElement('img');
    menuFooterCartImg.className = "menu-footer-cart__img";
    menuFooterCartImg.src = "/src/img/svg-header/shopping-cart.svg";

    let menuFooterCartText = document.createElement('p');
    menuFooterCartText.className = "menu-footer-cart__text";
    menuFooterCartText.textContent = "Shopping cart";

    let menuFooterCartSpan = document.createElement('span');
    menuFooterCartSpan.textContent = "0";

    menuFooterCartText.appendChild(menuFooterCartSpan);

    menuFooterContainer.appendChild(menuFooterLoginImg);
    menuFooterContainer.appendChild(menuFooterLoginText);
    menuFooterContainer.appendChild(menuFooterCartImg);
    menuFooterContainer.appendChild(menuFooterCartText);

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
