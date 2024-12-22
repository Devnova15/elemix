import { API, ENDPOINT, store } from './constants.js';

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentional)
    })
}

export const registrateUser = (userData) => {
    return sendRequest(ENDPOINT.CUSTOMERS.REGISTER, 'POST', {
        headers: { 'Content-Type': 'application/json' },
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

export const loginInit = async () => {
    const userData = {
        loginOrEmail: "customer@gmail.com",
        password: "1111111"
    };

    const { token } = await loginAndGetToken(userData)
    store.token = token
    store.user = userData
    console.log(store)
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

// WISHLIST
export const addProductToWishlist = async (productId) => {
    try {
        return await sendRequest(`${ENDPOINT.CUSTOMERS.WISHLIST}/${productId}`, 'PUT', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': store.token,
            }
        },)

    } catch (error) {
        console.log(error);

    }
}


export const deleteProductFromWishlist = async (productId) => {
    try {
        return await sendRequest(`${ENDPOINT.CUSTOMERS.WISHLIST}/${productId}`, 'DELETE', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': store.token,
            }
        },)
    }catch (error){
        console.log(error);
    }
}


export const getWishList = async () =>{
    console.log('store token',store.token)
        return await  sendRequest(ENDPOINT.CUSTOMERS.WISHLIST, 'GET', {
            headers: {
                'content-type': 'application/json',
                'Authorization': store.token,
            }
        })
}





