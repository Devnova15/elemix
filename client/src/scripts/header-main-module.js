export const initializeProductImageSwitcher = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const mainImage = document.querySelector('.main-product__image .product-photo');
        const selectors = document.querySelectorAll('.product-selector .product-wrapper');

        selectors.forEach(selector => {
            selector.addEventListener('click', () => {
                const newSrc = selector.querySelector('img').src;

                mainImage.classList.remove('fade-in');
                mainImage.classList.add('fade-out');

                setTimeout(() => {
                    mainImage.src = newSrc;

                    mainImage.classList.remove('fade-out');
                    mainImage.classList.add('fade-in');
                }, 600);

                selectors.forEach(wrapper => wrapper.classList.remove('active'));
                selector.classList.add('active');
            });
        });
    });
};
