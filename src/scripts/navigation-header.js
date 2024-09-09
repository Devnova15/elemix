
import {modalWindowPosition} from "./constants.js";


// Функция для удаления окна по нажатию клавиши
const removeWindowByKeyPress = (event, target) => {
    if (event.keyCode === '27') {
        target.remove();
        document.removeEventListener('keydown', removeWindowByKeyPress);
    }
    console.log(event);
};

// Функция для создания модального окна
const createModal = (position = modalWindowPosition.center) => {
    let modalDiv = document.createElement("div");
    let modalContent = document.createElement("div");

    modalDiv.className = "modal";
    modalDiv.id = "myModal";


    switch (true) {
        case position === modalWindowPosition.right :
            modalContent.className = 'modal-content-right';
            break;
        case position === modalWindowPosition.center :
            modalContent.className = "modal-content";
            break;
    }

    modalDiv.appendChild(modalContent);

    document.addEventListener('keydown', (event) => {
        removeWindowByKeyPress(event, modalDiv);
    });


    return {
        modalDiv, modalContent
    };
};



const createModalWindow = (targetProduct, error, position = modalWindowPosition.right) => {
    const { modalDiv, modalContent } = createModal(position); // Передаем нужную позицию для окна

    if (targetProduct) {
        // это обертка поисковика
        let menuSearchContainer = document.createElement('div');
        let menuSearchInput = document.createElement('input');
        let menuSearchButton = document.createElement('button');
        let menuSearchIcon = document.createElement('img');

        // обертка для ашек
        let menuContentContainer = document.createElement('div');
        let menuContent = document.createElement('ul');
        let m


    }

    if (error) {
        let title = document.createElement("h2");
        title.textContent = "Error";
        modalContent.appendChild(title);
    }

    // Добавляем элементы на страницу
    document.body.append(modalDiv);
};




