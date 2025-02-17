import {store} from "../constants.js";
import {updateCartOnServer} from "../requests.js";
import {saveCartToLocalStorage} from "./saveCartToLocalStorage.js";

export const updateCartWithProduct = async (product, quantity = 1) => {
    const cartCountElement = document.querySelector('.header-icon__cart-count');
    const existingProduct = store.cart.products.find(p => p.product._id === product._id);

    // console.log('it`s a product',product);

    if (!existingProduct) {
        const newProduct = {
            product : {...product},
            cartQuantity: quantity,
            color: product.color,
            size: product.size,
            image: product.variations.find(el => el.color === product.color).imageUrls[0]
        }
        // console.log('New product', newProduct)
        // console.log('cart with product', store.cart.products)

        store.cart.products.push(newProduct);


    } else {
        existingProduct.cartQuantity += quantity;
    }

    store.cart.quantity = store.cart.products.reduce((total, item) => total + item.cartQuantity, 0);
    store.cart.totalPrice = store.cart.products.reduce(
        (total, item) => total + item.product.currentPrice * item.cartQuantity,
        0
    );
    saveCartToLocalStorage();


    try {
        const productsToUpdate = {
            products: store.cart.products.map( p => ({
                product: p.product._id,
                cartQuantity: p.cartQuantity,
                image : p.image,
                color: p.color,
                size: p.size,


            })),
        }
        console.log('',productsToUpdate)
        const responce = await updateCartOnServer(productsToUpdate);
        if (responce) {
            store.cart.products = [...responce.products];

        }

        console.log('Корзина синхронизирована с сервером');
    } catch (error) {
        console.log("Ошибка при обновлении корзины на сервере", error);
    }

    if (cartCountElement) {
        cartCountElement.textContent = store.cart.products.length;
        console.log("store~~",store.cart);
    }
};
