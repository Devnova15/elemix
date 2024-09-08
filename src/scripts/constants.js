export const API = 'https://dummyjson.com';

export const ENDPOINT = Object.freeze({
  PRODUCTS: {
    ROOT: "/products",
    SEARCH: "/products/search?q=",
    CATEGORIES: "/products/categories",
    CATEGORY_LIST: "/products/category-list",
    CATEGORY: "/products/category/",
    ADD: "/products/add",
  },
  CARTS: "/carts",
  USERS: "/users",
  AUTH: "/auth",
});

export const NESTED_AUTH_ENDPOINT = Object.freeze({
  LOGIN: "/login",
});

export const modalWindowPosition = {
  right: "right",
  center: "center",
};
