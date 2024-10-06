import {modalWindowPosition} from "./constants.js";

// Функция для удаления окна по нажатию клавиши
export const removeWindowByKeyPress = (event, target) => {
    if (event.keyCode === 27) {
        target.remove();
        document.removeEventListener('keydown', removeWindowByKeyPress);
    }
    console.log(event);
};

// Функция для создания модального окна
export const createModal = (position) => {
    let modalDiv = document.createElement("div");
    let modalContent = document.createElement("div");

    modalDiv.id = "myModal";

    // Присваиваем класс модальному окну в зависимости от переданной позиции
    if (position === modalWindowPosition.right) {
        modalDiv.className = "modal-right";  // Модальное окно справа
    } else if (position === modalWindowPosition.center) {
        modalDiv.className = "modal-center"; // Модальное окно по центру
    }

    // Присваиваем класс контенту модального окна в зависимости от позиции
    switch (position) {
        case modalWindowPosition.right:
            modalContent.className = 'modal-content-right';
            break;
        case modalWindowPosition.center:
            modalContent.className = "modal-content-center";
            break;
    }

    modalDiv.appendChild(modalContent);

    // Закрытие модального окна по нажатию клавиши
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

    // обертка для меню
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

    // обертка футера меню
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

    menuFooterLoginWrapper.appendChild(menuFooterLoginImg);
    menuFooterLoginWrapper.appendChild(menuFooterLoginText);
    menuFooterCartWrapper.appendChild(menuFooterCartImg);
    menuFooterCartWrapper.appendChild(menuFooterCartText);

    menuFooterContainer.appendChild(menuFooterLoginWrapper);
    menuFooterContainer.appendChild(menuFooterCartWrapper);

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



    cartSideBarButton.appendChild(cartSideBarButtonCloseImg);
    cartSideBarHeader.appendChild(cartSideBarTitle);
    cartSideBarHeader.appendChild(cartSideBarSpan);
    cartSideBarHeader.appendChild(cartSideBarButton);

    cartSideBarContent.appendChild(cartSideBarContentEmptyMassage);

    modalContent.appendChild(cartSideBarHeader);  // Вставляем шапку в контент модального окна
    modalContent.appendChild(cartSideBarContent); // Вставляем основной контент в модальное окно


    if (error) {
        let title = document.createElement("h2");
        title.textContent = "Error";
        modalContent.appendChild(title);
    }

    document.body.append(modalDiv);
}

// document.addEventListener("DOMContentLoaded", () => {
//     const cartIcon = document.querySelector(".header-icon__cart");
//
//     if (cartIcon) {
//         cartIcon.addEventListener("click", () => {
//         });
//     }
// });

export const createModalForSingUpForm = (error, position = modalWindowPosition.center) => {
    const { modalDiv, modalContent } = createModal(position);

    // Создание заголовка формы
    let formHeader = document.createElement('div');
    formHeader.className = "form-header";

    let formTitle = document.createElement('h2');
    formTitle.className = "form-title";
    formTitle.textContent = "Sign In / Register";

    formHeader.appendChild(formTitle);

    // Создание контейнера для формы
    let formContainer = document.createElement('div');
    formContainer.className = "form-container";

    // Создание формы входа (Sign In)
    let signInForm = document.createElement('form');
    signInForm.className = "sign-in-form";

    let signInEmail = document.createElement('input');
    signInEmail.type = "email";
    signInEmail.className = "form-input";
    signInEmail.placeholder = "Email";

    let signInPassword = document.createElement('input');
    signInPassword.type = "password";
    signInPassword.className = "form-input";
    signInPassword.placeholder = "Password";

    let signInButton = document.createElement('button');
    signInButton.type = "submit";
    signInButton.className = "form-button";
    signInButton.textContent = "Sign In";

    signInForm.appendChild(signInEmail);
    signInForm.appendChild(signInPassword);
    signInForm.appendChild(signInButton);

    // Создание ссылки на регистрацию (Switch to Register)
    let switchToRegister = document.createElement('p');
    switchToRegister.className = "form-switch";
    switchToRegister.textContent = "Don't have an account? Register";

    // Создание формы регистрации (Register)
    let registerForm = document.createElement('form');
    registerForm.className = "register-form hidden"; // Скрываем по умолчанию

    let registerEmail = document.createElement('input');
    registerEmail.type = "email";
    registerEmail.className = "form-input";
    registerEmail.placeholder = "Email";

    let registerPassword = document.createElement('input');
    registerPassword.type = "password";
    registerPassword.className = "form-input";
    registerPassword.placeholder = "Password";

    let registerConfirmPassword = document.createElement('input');
    registerConfirmPassword.type = "password";
    registerConfirmPassword.className = "form-input";
    registerConfirmPassword.placeholder = "Confirm Password";

    let registerButton = document.createElement('button');
    registerButton.type = "submit";
    registerButton.className = "form-button";
    registerButton.textContent = "Register";

    registerForm.appendChild(registerEmail);
    registerForm.appendChild(registerPassword);
    registerForm.appendChild(registerConfirmPassword);
    registerForm.appendChild(registerButton);

    // Создание ссылки на вход (Switch to Sign In)
    let switchToSignIn = document.createElement('p');
    switchToSignIn.className = "form-switch hidden"; // Скрываем по умолчанию
    switchToSignIn.textContent = "Already have an account? Sign In";

    // Логика переключения между Sign In и Register
    switchToRegister.addEventListener('click', () => {
        signInForm.classList.add('hidden');
        switchToRegister.classList.add('hidden');
        registerForm.classList.remove('hidden');
        switchToSignIn.classList.remove('hidden');
    });

    switchToSignIn.addEventListener('click', () => {
        registerForm.classList.add('hidden');
        switchToSignIn.classList.add('hidden');
        signInForm.classList.remove('hidden');
        switchToRegister.classList.remove('hidden');
    });

    // Добавление элементов в контейнер формы
    formContainer.appendChild(signInForm);
    formContainer.appendChild(switchToRegister);
    formContainer.appendChild(registerForm);
    formContainer.appendChild(switchToSignIn);

    // Добавление всего в модальное окно
    modalContent.appendChild(formHeader);
    modalContent.appendChild(formContainer);

    if (error) {
        let errorMessage = document.createElement("p");
        errorMessage.className = "form-error";
        errorMessage.textContent = "An error occurred. Please try again.";
        modalContent.appendChild(errorMessage);
    }

    document.body.append(modalDiv);
};
