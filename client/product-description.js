import { addComment, getProductById } from "./src/scripts/requests.js";
import { addRatingEventListeners, getStarsHTML, updateStarsDisplay } from "./src/scripts/top-sellers.js";

export const createProductReviewTabs = () => {
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'tabs-container';

    const tabs = document.createElement('div');
    tabs.className = 'tabs';

    const descriptionTab = document.createElement('p');
    descriptionTab.className = 'tab active';
    descriptionTab.textContent = 'Description';

    const reviewsTab = document.createElement('p');
    reviewsTab.className = 'tab';
    reviewsTab.textContent = 'Reviews';

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'content-wrapper';

    const updateTabContent = async (activeTab, productId) => {
        try {
            const product = await getProductById(productId);
            if (!product) return;

            contentWrapper.innerHTML = '';

            if (activeTab === 'description') {
                const descriptionText = document.createElement('p');
                descriptionText.className = 'product-description-text';
                descriptionText.textContent = product.description || 'No description available';
                contentWrapper.appendChild(descriptionText);
            } else if (activeTab === 'reviews') {
                const reviewsContainer = document.createElement('div');
                reviewsContainer.className = 'reviews-container';
                
                const reviewForm = document.createElement('form');
                reviewForm.className = 'review-form';
                
                const reviewTextarea = document.createElement('textarea');
                reviewTextarea.placeholder = 'Write your review...';
                reviewTextarea.className = 'review-textarea';
                
                const submitButton = document.createElement('button');
                submitButton.textContent = 'Submit Review';
                submitButton.type = 'submit';
                submitButton.className = 'review-submit-btn';
                
                reviewForm.appendChild(reviewTextarea);
                reviewForm.appendChild(submitButton);
                reviewsContainer.appendChild(reviewForm);
                
                contentWrapper.appendChild(reviewsContainer);
            }
        } catch (error) {
            console.error('Error loading product data:', error);
        }
    };

    descriptionTab.addEventListener('click', () => {
        descriptionTab.classList.add('active');
        reviewsTab.classList.remove('active');
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        if (productId) {
            updateTabContent('description', productId);
        }
    });

    reviewsTab.addEventListener('click', () => {
        reviewsTab.classList.add('active');
        descriptionTab.classList.remove('active');
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        if (productId) {
            updateTabContent('reviews', productId);
        }
    });

    tabs.appendChild(descriptionTab);
    tabs.appendChild(reviewsTab);
    tabsContainer.appendChild(tabs);
    tabsContainer.appendChild(contentWrapper);

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    if (productId) {
        updateTabContent('description', productId);
    }

    return tabsContainer;
};

document.addEventListener('DOMContentLoaded', () => {
    const section = document.getElementById('product-description');
    if (section) section.append(createProductReviewTabs());
});