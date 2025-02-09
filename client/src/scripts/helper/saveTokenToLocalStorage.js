import {} from "../requests.js";

export const saveTokenToLocalStorage = (token) => {
    localStorage.setItem('token', token);
}