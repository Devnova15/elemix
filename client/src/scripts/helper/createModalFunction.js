// Функция для создания модального окна
import {modalWindowPosition} from "../constants.js";
import {removeWindowByKeyPress} from "../navigation-header.js";

export const createModal = (position, contentStyle = 'modal-content-center') => {
    let modalDiv = document.createElement("div");
    let modalContent = document.createElement("div");

    modalDiv.id = "myModal";

    // Присваиваем класс модальному окну в зависимости от переданной позиции
    if (position === modalWindowPosition.right) {
        modalDiv.className = "modal-right";  // Модальное окно справа
    } else if (position === modalWindowPosition.center) {
        modalDiv.className = "modal-center"; // Модальное окно по центру
    }

    modalContent.className = contentStyle

    // Создание затемняющего элемента
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    document.body.appendChild(overlay);


    modalDiv.appendChild(modalContent);

    // Закрытие модального окна по нажатию клавиши
    document.addEventListener('keydown', (event) => {
        removeWindowByKeyPress(event, modalDiv, overlay);
    });

    return {
        modalDiv,
        modalContent,
        overlay
    };
};