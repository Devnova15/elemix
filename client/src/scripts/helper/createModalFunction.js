import {modalWindowPosition} from "../constants.js";
import {removeWindowByKeyPress} from "../navigation-header.js";

export const createModal = (position, contentStyle = 'modal-content-center') => {
    let modalDiv = document.createElement("div");
    let modalContent = document.createElement("div");

    modalDiv.id = "myModal";

    if (position === modalWindowPosition.right) {
        modalDiv.className = "modal-right";
    } else if (position === modalWindowPosition.center) {
        modalDiv.className = "modal-center";
    }

    modalContent.className = contentStyle

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    document.body.appendChild(overlay);


    modalDiv.appendChild(modalContent);

    document.addEventListener('keydown', (event) => {
        removeWindowByKeyPress(event, modalDiv, overlay);
    });

    return {
        modalDiv,
        modalContent,
        overlay
    };
};