import {modalWindowPosition} from "./constants.js";
import {createModal} from "./helper/createModalFunction.js";
import {store} from "./constants.js";
import {createCartProductCart} from "./helper/cart-product-card.js";
import {getWishList, loginInit} from "./requests.js";

// Функция для удаления окна по нажатию клавиши
export const removeWindowByKeyPress = (event, modal, overlay) => {
    if (event.keyCode === 27) {
        modal.remove(); // Убираем модальное окно
        overlay.remove(); // Убираем затемнение
        document.removeEventListener('keydown', (e) => removeWindowByKeyPress(e, modal, overlay)); // Удаляем обработчик события
    }
    console.log(event);
};

export const createOverlay = () => {
    let existingOverlay = document.querySelector('.modal-overlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    document.body.appendChild(overlay);

    return overlay;
};

document.addEventListener("DOMContentLoaded", () => {
    const wishlistIcon = document.querySelector(".header-icon__heart");

    if (wishlistIcon) {
        wishlistIcon.addEventListener("click", (event) => {
            event.preventDefault();

            createModalWindowWishlist("right");
        });
    }
});


export const createModalWindowWishlist = (position = modalWindowPosition.right) => {
    const { modalDiv, modalContent } = createModal(position, 'modal-wishlist-content');
    const overlay = createOverlay();

    const title = document.createElement('h2');
    title.textContent = "Your Wishlist";

    const wishlistContent = document.createElement('div');
    wishlistContent.className = "wishlist-content";

    // Добавление товаров в модальное окно
    if (store.wishlist.length > 0) {
        store.wishlist.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = "wishlist-item";

            const itemImage = document.createElement('img');
            itemImage.src = item.image; // Изображение товара
            itemImage.alt = item.name;

            const itemName = document.createElement('p');
            itemName.textContent = item.name; // Название товара

            const itemPrice = document.createElement('p');
            itemPrice.textContent = `$${item.currentPrice.toFixed(2)}`; // Цена товара

            itemDiv.appendChild(itemImage);
            itemDiv.appendChild(itemName);
            itemDiv.appendChild(itemPrice);

            wishlistContent.appendChild(itemDiv);
        });
    } else {
        wishlistContent.textContent = "Your wishlist is empty.";
    }

    const closeButton = document.createElement('button');
    closeButton.className = "modal-close";
    closeButton.textContent = "×";

    const closeModal = () => {
        modalDiv.remove();
        overlay.remove();
    };

    closeButton.addEventListener('click', closeModal);

    modalContent.appendChild(closeButton);
    modalContent.appendChild(title);
    modalContent.appendChild(wishlistContent);

    document.body.append(modalDiv);

    overlay.addEventListener('click', closeModal);
};




// МОДАЛКА МЕНЮ
export const createModalWindowMenu = (error, position = modalWindowPosition.right) => {
    const {modalDiv, modalContent} = createModal(position, 'modal-menu-content');

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
        hamburgerIcon.addEventListener("click", (event) => {
            event.preventDefault();
        });
    }
});

// // МОДАЛКА КОРЗИНЫ
// export const createModalWindowCart = (error, position = modalWindowPosition.right) => {
//     const {modalDiv, modalContent} = createModal(position);
//
//     let cartSideBarHeader = document.createElement('div');
//     cartSideBarHeader.className = "cart-side-bar__header"
//
//     let cartSideBarTitle = document.createElement('p');
//     cartSideBarTitle.className = "cart-side-bar__title"
//     cartSideBarTitle.textContent = "SHOPPING CART"
//
//     let cartSideBarSpan = document.createElement('span');
//     cartSideBarSpan.className = "cart-side-bar__span"
//     cartSideBarSpan.textContent = "0"
//
//
//     let cartSideBarButton = document.createElement('button');
//     cartSideBarButton.className = "cart-side-bar__button"
//
//     let cartSideBarButtonCloseImg = document.createElement('img');
//     cartSideBarButtonCloseImg.className = "cart-side-bar-button-close__img"
//     cartSideBarButtonCloseImg.src = "/src/img/header-images/close-svgrepo-com.png"
//
//     cartSideBarButtonCloseImg.addEventListener('click', () => {
//         modalDiv.remove();
//     })
//
//     let cartSideBarContent = document.createElement('div');
//     cartSideBarContent.className = "cart-side-bar__content"
//
//     let cartSideBarContentEmptyMassage = document.createElement('p');
//     cartSideBarContentEmptyMassage.className = "cart-side-bar-content-empty__massage"
//     cartSideBarContentEmptyMassage.textContent = "No products in the cart"
//
//
//
//     cartSideBarButton.appendChild(cartSideBarButtonCloseImg);
//     cartSideBarHeader.appendChild(cartSideBarTitle);
//     cartSideBarHeader.appendChild(cartSideBarSpan);
//     cartSideBarHeader.appendChild(cartSideBarButton);
//
//     cartSideBarContent.appendChild(cartSideBarContentEmptyMassage);
//
//     modalContent.appendChild(cartSideBarHeader);  // Вставляем шапку в контент модального окна
//     modalContent.appendChild(cartSideBarContent); // Вставляем основной контент в модальное окно
//
//
//     if (error) {
//         let title = document.createElement("h2");
//         title.textContent = "Error";
//         modalContent.appendChild(title);
//     }
//
//     document.body.append(modalDiv);
// }


// МОДАЛКА КОРЗИНЫ

export const createModalWindowCart = (error, position = modalWindowPosition.right) => {
    const { modalDiv, modalContent, overlay } = createModal(position, 'modal-cart-content');

    // Заголовок корзины
    let cartSideBarHeader = document.createElement('div');
    cartSideBarHeader.className = "cart-side-bar__header";

    let cartSideBarTitle = document.createElement('p');
    cartSideBarTitle.className = "cart-side-bar__title";
    cartSideBarTitle.textContent = "SHOPPING CART";

    let cartSideBarSpan = document.createElement('span');
    cartSideBarSpan.className = "cart-side-bar__span";
    cartSideBarSpan.textContent = store.cart.quantity;

    let cartSideBarButton = document.createElement('button');
    cartSideBarButton.className = "cart-side-bar__button";

    let cartSideBarButtonCloseImg = document.createElement('img');
    cartSideBarButtonCloseImg.className = "cart-side-bar-button-close__img";
    cartSideBarButtonCloseImg.src = "/src/img/header-images/close-svgrepo-com.png";

    // Закрытие модального окна при клике на крестик
    cartSideBarButtonCloseImg.addEventListener('click', () => {
        overlay.remove();
        modalDiv.remove();
    });

    // Контейнер для контента корзины
    let cartSideBarContent = document.createElement('div');
    cartSideBarContent.className = "cart-side-bar__content";

    // Сборка модального окна
    cartSideBarButton.appendChild(cartSideBarButtonCloseImg);
    cartSideBarHeader.appendChild(cartSideBarTitle);
    cartSideBarHeader.appendChild(cartSideBarSpan);
    cartSideBarHeader.appendChild(cartSideBarButton);

    modalContent.appendChild(cartSideBarHeader);
    modalContent.appendChild(cartSideBarContent);

    // Если корзина пустая
    if (store.cart.products.length === 0) {
        let cartSideBarContentEmptyMessage = document.createElement('p');
        cartSideBarContentEmptyMessage.className = "cart-side-bar-content-empty__message";
        cartSideBarContentEmptyMessage.textContent = "No products in the cart";
        cartSideBarContent.appendChild(cartSideBarContentEmptyMessage);
    } else {
        // Создаем карточки товаров в корзине
        const cards = store.cart.products.map(product => createCartProductCart(product));
        cartSideBarContent.append(...cards);

        // Подсчет общей суммы
        const totalAmount = store.cart.products.reduce((total, product) => {
            return total + product.currentPrice * product.cartQuantity;
        }, 0);

        // Создание элемента для отображения общей суммы

        const totalContainer = document.createElement('div');
        totalContainer.className = 'total-container';


        const totalAmountText = document.createElement('p');
        totalAmountText.className = 'total-amount__text';
        totalAmountText.textContent = 'Total:';

        let totalAmountElement = document.createElement('p');
        totalAmountElement.className = "cart-total-amount";
        totalAmountElement.textContent = `$${totalAmount.toFixed(2)}`;

        // Создание кнопок View Total и Check Out
        let viewTotalButton = document.createElement('button');
        viewTotalButton.className = "cart-view-total-button";
        viewTotalButton.textContent = "View Total";

        let checkOutButton = document.createElement('button');
        checkOutButton.className = "cart-checkout-button";
        checkOutButton.textContent = "Check Out";

        // Контейнер для футера с кнопками
        let cartFooter = document.createElement('div');
        cartFooter.className = "cart-footer";

        // Контейнер для кнопок (для размещения в один ряд)
        let buttonsContainer = document.createElement('div');
        buttonsContainer.className = "cart-footer-buttons";
        buttonsContainer.appendChild(viewTotalButton);
        buttonsContainer.appendChild(checkOutButton);

        // Добавляем элементы в футер
        totalContainer.appendChild(totalAmountText);
        totalContainer.appendChild(totalAmountElement);
        cartFooter.appendChild(totalContainer);
        cartFooter.appendChild(buttonsContainer);

        // Добавляем футер в модальное окно
        modalContent.appendChild(cartFooter);
    }

    if (error) {
        let title = document.createElement("h2");
        title.textContent = "Error";
        modalContent.appendChild(title);
    }
    document.body.append(modalDiv);
};











export const createModalForSingUpForm = (error, position = modalWindowPosition.center) => {
    const {modalDiv, modalContent} = createModal(position, 'singup-modal-content');

    modalDiv.className = 'singup-modal-center';

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

    signInButton.addEventListener ('click', async () => {
        await loginInit();
        const data = await getWishList()
        store.wishlist = data.products;
        console.log('wishList', data);
const wishListNodes= data.products.map(product => {
    const node = document.querySelector(`[data-product-id="${product._id}"]`).querySelector('.favorite-btn-shaded').style.display="block";

    return node;
})

        console.log(wishListNodes);
    })

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
