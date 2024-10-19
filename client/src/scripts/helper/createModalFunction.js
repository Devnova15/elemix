// Функция для создания модального окна
import {modalWindowPosition} from "../constants.js";
import {removeWindowByKeyPress} from "../navigation-header.js";

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