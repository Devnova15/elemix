import {createModal} from "./navigation-header.js";
import {modalWindowPosition} from "./constants.js";

export const modalProductWindow = (id, position = modalWindowPosition.center) => {
    const {modalDiv, modalContent} = createModal(position);


}