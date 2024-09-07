
import { API, ENDPOINT, NESTED_AUTH_ENDPOINT} from './constants.js';

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

// Limit and skip products

// fetch('https://dummyjson.com/products?limit= сюда Лимит 10&skip= Сюда пропуск 10&select=title,price')
//     .then(res => res.json())
//     .then(console.log);


const getAllProducts = async (page) => {
   const limit = 30;
   const skip = (page - 1) * limit
    return sendRequest(`${API}${ENDPOINT.PRODUCTS}/?limit=${limit}&skip${skip}`)
}


//по идее сюда тоже логику с пагинацией нужно
const searchProducts = async (item, ) => {
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