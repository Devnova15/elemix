import {calculateTotalAmount} from "./calculateTotalAmount.js";

export const updateTotalAmountElement = (products) => {
    const totalAmountElement = document.getElementById('totalAmountElement');
    totalAmountElement.textContent = calculateTotalAmount(products)
}