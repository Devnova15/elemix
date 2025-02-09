import {API, ENDPOINT, store} from './constants.js';
import {initCart} from "./helper/initCart.js";
import {saveCartToLocalStorage} from "./helper/saveCartToLocalStorage.js";
import {saveTokenToLocalStorage} from "./helper/saveTokenToLocalStorage.js";

export const sendRequest = async (url, method = "GET", options = {}) => {
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


export const loginAndGetToken = async (credentional) => {
    return await sendRequest(ENDPOINT.CUSTOMERS.LOGIN, 'POST', {
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentional)
    })
}

export const registrateUser = (userData) => {
    return sendRequest(ENDPOINT.CUSTOMERS.REGISTER, 'POST', {
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
    })

}

export const registrateInit = async () => {
    const newUser = {
        firstName: "Customer",
        lastName: "Newone",
        login: "Customer",
        email: "customer@gmail.com",
        password: "1111111",
        isAdmin: true
    }
    const responce = await registrateUser(newUser)
    console.log(responce)
}

export const loginUser = async () => {
    const userData = {
        loginOrEmail: "customer@gmail.com",
        password: "1111111"
    };


    const {token} = await loginAndGetToken(userData)
    if (token){
        store.token = token
        store.user = userData
        saveTokenToLocalStorage(token)
        await initCart(token)

    }

}

export const getProduct = async () => {
    return sendRequest(ENDPOINT.PRODUCTS.ROOT, 'GET', {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};


export const addProduct = async (product) => {
    const addProducts = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': store.token,
        },
        body: JSON.stringify(product)
    }
    const responceProduct = await sendRequest(ENDPOINT.PRODUCTS.ROOT, 'POST', addProducts)
    console.log(responceProduct)
}


export const getAllProducts = async () => {
    return await sendRequest(ENDPOINT.PRODUCTS.ROOT)
}


export const deleteProductFromCart = async (productId) => {
    return await sendRequest(`${ENDPOINT.CUSTOMERS.DELETE_PRODUCT_FROM_CART}/${productId}`, 'DELETE', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': store.token,
        },
    })
}

export const updateCartOnServer = async (cartData) => {
    return await sendRequest(ENDPOINT.CUSTOMERS.UPDATE_CART_ON_SERVER, 'PUT', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': store.token,
        },
        body: JSON.stringify(cartData)
    })
}


export const getCart = async (token) => {
    return await sendRequest(ENDPOINT.CUSTOMERS.GET_CART, 'GET', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },

        }
    )}

export const createCart = async (payload) => {
    return await  sendRequest(ENDPOINT.CUSTOMERS.CREATE_CART, 'POST', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': store.token,
            },
        body: JSON.stringify(payload),
        }
    )}




// const searchProducts = async (item, ) => {
//     return await sendRequest(`${API}${ENDPOINT.PRODUCTS.SEARCH}${item}`)
// }
//
// //getAllUsers тоже пагинация
//
// const loginUser = async (username, password) => {
//     const loginDetails = {
//         username,
//         password,
//         expiresInMins: 30,
//     };
//
//     return await sendRequest(`${API}${ENDPOINT.USERS.LOGIN}`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(loginDetails),
//     });
// };

// getAllProducts().then(products => {
//     console.log("Products on page 1:", products);
// });