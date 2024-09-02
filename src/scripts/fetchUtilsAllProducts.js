const API = 'https://dummyjson.com';
const PRODUCTS_ENDPOINT = '/products';

fetch(`${API}${PRODUCTS_ENDPOINT}`)
    .then(res => res.json())
    .then(console.log);


export const firstPageProducts = fetch('https://dummyjson.com/products?limit=30&skip=0')
    .then(res => res.json())
    .then(data => data.products)
    .catch(error => {
        console.error('Error fetching first page products', error);
        return [];
    });

export const secondPageProducts = fetch('https://dummyjson.com/products?limit=30&skip=30')
    .then(res => res.json())
    .then(data => data.products)
    .catch(error => {
        console.error('Error fetching second page products', error);
        return [];
    });

export const thirdPageProducts = fetch('https://dummyjson.com/products?limit=30&skip=60')
    .then(res => res.json())
    .then(data => data.products)
    .catch(error => {
        console.error('Error fetching third page products', error);
        return [];
    });

export const fourthPageProducts = fetch('https://dummyjson.com/products?limit=30&skip=90')
    .then(res => res.json())
    .then(data => data.products)
    .catch(error => {
        console.error('Error fetching fourth page products', error);
        return [];
    });

export const fifthPageProducts = fetch('https://dummyjson.com/products?limit=30&skip=120')
    .then(res => res.json())
    .then(data => data.products)
    .catch(error => {
        console.error('Error fetching fifth page products', error);
        return [];
    });
