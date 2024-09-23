export const API = 'https://dummyjson.com';
export const API_LOCAL = 'http://localhost:4000/api/'

export const ENDPOINT = Object.freeze({
  PRODUCTS: {
    ROOT: "/products",
    SEARCH: "/products/search?q=",
    CATEGORIES: "/products/categories",
    CATEGORY_LIST: "/products/category-list",
    CATEGORY: "/products/category/",
    ADD: "/products/add",
  },
  CARTS: {
    WARP: "/carts",
    BY_USER: "/carts/user/",
    ADD_NEW: "/carts/add",
    UPDATE: "/carts/",
    DELETE: "/carts/",
  },
  USERS: {
    SOURCE:"/users",
    LOGIN: "/user/login",
    CURRENT: "/user/me",
    SINGLE: "/users/",
    SEARCH_USERS: "/users/search?q=",
    CARTS_BY_USER: "/users/ /carts",
  },
  AUTH: {
    CORE: "/auth",
    LOGIN: "/auth/login",
    CURRENT_AUTH: "/auth/me",
    REFRESH_AUTH_SESSION: "auth/refresh"

  },
});

export const modalWindowPosition = {
  right: "right",
  center: "center",
};
