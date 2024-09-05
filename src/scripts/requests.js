
import { API, ENDPOINT, NESTED_AUTH_ENDPOINT, loginDetails} from './constants.js';

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

const searchProducts = async (item) => {
    return await sendRequest(`${API}${ENDPOINT.PRODUCTS}/search?q=${item}`)
}

//getAllUsers тоже пагинация

const loginUser = async (username, password) => {
    const loginDetails = {
        username,
        password,
        expiresInMins: 30,
    };

    return await sendRequest(`${API}${ENDPOINT.AUTH}${NESTED_AUTH_ENDPOINT.LOGIN}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginDetails),
    });
};

const getAllCarts = async () => {
    return await sendRequest(`${API}${ENDPOINT.CARTS}`)
}

const getSingleCart = async (productId) => {
    return await sendRequest(`${API}${ENDPOINT}/${productId}`)
}