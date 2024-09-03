export const API = 'https://dummyjson.com';
export const PRODUCTS_ENDPOINT = '/products';
export const PRODUCTS_SEARCH_ENDPOINT = '/products/search';
export const AUTH_ENDPOINT = '/auth/login';


fetch(`${API}${PRODUCTS_ENDPOINT}`)
    .then(res => res.json())
    .then(console.log);

fetch(`${API}${PRODUCTS_SEARCH_ENDPOINT}?q=phone`)
    .then(res => res.json())
    .then(console.log);

export const loginDetails = {
    username: 'emilys',
    password: 'emilyspass',
    expiresInMins: 30,
}

// const jsonString = JSON.stringify(loginDetails);
// console.log(jsonString);
// '{"username":"emilys","password":"emilyspass","expiresInMins":30}'

fetch(`${API}${AUTH_ENDPOINT}`,{
    method : 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginDetails),
})
    .then(res => res.json())
    .then(data => {
        // console.log('user logged in', data);
        const token = data.token;
        console.log(token)
    })
    .catch(error => console.error('Error:', error));


// ДЛЯ ПОЛУЧЕНИЯ ВСЕХ ПРОДУКТОВ в количестве по 30///
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
// ДЛЯ ПОЛУЧЕНИЯ ВСЕХ ПРОДУКТОВ
