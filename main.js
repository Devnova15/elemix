import { initializeProductImageSwitcher } from './src/scripts/header-main-module.js';
import { createModalWindowMenu } from './src/scripts/navigation-header.js';
import {modalWindowPosition} from "./src/scripts/constants.js";

document.addEventListener("DOMContentLoaded", () => {
    const hamburgerIcon = document.querySelector(".header-icon__menu");

    if (hamburgerIcon) {
        hamburgerIcon.addEventListener("click", () => {
            createModalWindowMenu(false, modalWindowPosition.right);
        });
    }
});

initializeProductImageSwitcher();
