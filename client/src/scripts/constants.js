export const API = '//localhost:4000/api'

export const store = {
    token: null,
    user: {
        isLogin: false,
        token: null,
        userInfo: null,
    },
    topSellers: null,

    cart: {
        products: [],
        totalPrice: 0,
        quantity: 0,
    },
}

export const ENDPOINT = Object.freeze({
    PRODUCTS: {
        ROOT: `${API}/products`,
        PRODUCT_BY_ID: `${API}/products/`
    },

    CUSTOMERS: {
        LOGIN: `${API}/customers/login`,
        REGISTER: `${API}/customers`,
        PASSWORD: `${API}/customers/password`,
        UPDATE_CART_ON_SERVER: `${API}/cart`,
        DECREASE_PRODUCT_QUANTITY: `${API}/cart/product/`,
        ADD_TO_CART_PRODUCT: `${API}/cart/`,
        DELETE_PRODUCT_FROM_CART: `${API}/cart/`,
        GET_CART: `${API}/cart/`,
        CREATE_CART: `${API}/cart/`,
        PRODUCT_COMMENT: `${API}/comments`,
        DELETE_PRODUCT_COMMENT: `${API}/comments/`
    },
});

export const modalWindowPosition = {
    right: "right",
    center: "center",
};