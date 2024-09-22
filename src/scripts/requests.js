
import { API, ENDPOINT} from './constants.js';

const sendRequest = async (url, method = "GET", options = {}) => {
    try {
        const response = await fetch(url, {
            method,
            ...options,
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


export const getAllProducts = async () => {

    return sendRequest(`${API}${ENDPOINT.PRODUCTS.ROOT}?limit=0`)
}
//по идее сюда тоже логику с пагинацией нужно
const searchProducts = async (item, ) => {
    return await sendRequest(`${API}${ENDPOINT.PRODUCTS.SEARCH}${item}`)
}

//getAllUsers тоже пагинация

const loginUser = async (username, password) => {
    const loginDetails = {
        username,
        password,
        expiresInMins: 30,
    };

    return await sendRequest(`${API}${ENDPOINT.USERS.LOGIN}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginDetails),
    });
};

getAllProducts().then(products => {
    console.log("Products on page 1:", products);
});
