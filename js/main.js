/* Project: PC Craft
   File: js/main.js
   Description: Global application logic and shared UI components.
   Refactored to wait for currency data using Promises.
*/

// --- Constants ---
const STORAGE_KEY = 'techCoreCart';
const TOAST_DURATION = 3000;

// --- State Management ---
let cart = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    // Check if we are on the homepage
    const path = window.location.pathname;
    const isHomepage = path.includes('index.html') || path === '/' || path.endsWith('/');

    if (isHomepage) {
        // WAIT for currency data before initializing the slider
        window.currencyReady.then(() => {
            initHomepageSlider();
        });
    }
});

// Re-render slider on currency change (Dynamic update)
window.addEventListener('currencyChange', () => {
    const track = document.getElementById('slider-track');
    if (track) {
        initHomepageSlider();
    }
});

// --- Homepage Slider Logic ---
function initHomepageSlider() {
    const elements = {
        track: document.getElementById('slider-track'),
        prevBtn: document.getElementById('slide-prev'),
        nextBtn: document.getElementById('slide-next')
    };

    if (!elements.track) return;

    // Flagship Product IDs
    const flagshipIds = [105, 205, 305, 405, 505, 605, 705, 805];

    if (typeof products === 'undefined') {
        elements.track.innerHTML = '<p>Error loading product data.</p>';
        return;
    }

    const featuredProducts = products.filter(p => flagshipIds.includes(p.id));

    // Render Cards
    elements.track.innerHTML = '';
    featuredProducts.forEach(product => {
        const card = createProductCard(product);
        elements.track.appendChild(card);
    });

    // Slider Navigation Logic
    setupSliderNavigation(elements, featuredProducts.length);
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');

    const displayPrice = window.formatPrice ? window.formatPrice(product.price) : `$${product.price}`;

    // Rating Logic
    const reviewCount = product.reviews ? product.reviews.length : 0;
    const avgRating = reviewCount > 0
        ? Math.round(product.reviews.reduce((acc, r) => acc + r.rating, 0) / reviewCount)
        : 0;

    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        starsHtml += (i <= avgRating)
            ? '<i class="fa-solid fa-star" style="color: #ffc107; font-size: 0.8rem;"></i>'
            : '<i class="fa-regular fa-star" style="color: #555; font-size: 0.8rem;"></i>';
    }

    card.innerHTML = `
        <a href="product-detail.html?id=${product.id}" style="text-decoration: none; color: inherit; display: block; flex-grow: 1; display: flex; flex-direction: column;">
            <span class="badge" style="background: var(--accent); color: var(--bg-color);">FLAGSHIP</span>
            <img src="${product.image}" alt="${product.name}" class="card-image">
            <div class="card-content">
                <span class="card-category">${product.category}</span>
                <h3 class="card-title">${product.name}</h3>
                
                <div style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 3px;">
                    ${starsHtml}
                    <span style="font-size: 0.75rem; color: #777; margin-left: 5px;">(${reviewCount})</span>
                </div>

                <div class="card-price">${displayPrice}</div>
            </div>
        </a>
        <div style="padding: 0 1.5rem 1.5rem 1.5rem;">
            <button class="btn-add-cart" onclick="addToCart(${product.id})">
                <i class="fa-solid fa-cart-plus"></i> Add to Cart
            </button>
        </div>
    `;
    return card;
}

function setupSliderNavigation(elements, totalItems) {
    let currentIndex = 0;
    const cardWidth = 300;
    const { track, prevBtn, nextBtn } = elements;

    const updateVisibleCards = () => Math.floor(track.parentElement.offsetWidth / cardWidth) || 1;

    function updateButtons() {
        const itemsVisible = updateVisibleCards();
        const maxScroll = Math.max(0, totalItems - itemsVisible);
        if (prevBtn && nextBtn) {
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= maxScroll;
        }
    }

    function updateSliderPosition() {
        const translateX = -(currentIndex * cardWidth);
        track.style.transform = `translateX(${translateX}px)`;
        updateButtons();
    }

    // Replace buttons to clear old listeners
    if (nextBtn) {
        const newNext = nextBtn.cloneNode(true);
        nextBtn.parentNode.replaceChild(newNext, nextBtn);
        newNext.addEventListener('click', () => {
            const itemsVisible = updateVisibleCards();
            const maxScroll = totalItems - itemsVisible;
            if (currentIndex < maxScroll) {
                currentIndex++;
                updateSliderPosition();
            }
        });
    }

    if (prevBtn) {
        const newPrev = prevBtn.cloneNode(true);
        prevBtn.parentNode.replaceChild(newPrev, prevBtn);
        newPrev.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSliderPosition();
            }
        });
    }

    window.addEventListener('resize', () => {
        currentIndex = 0;
        updateSliderPosition();
    });

    updateButtons();
}

// --- Global Cart Functions ---
window.addToCart = function (id, silent = false) {
    if (typeof products === 'undefined') return;
    const product = products.find(p => p.id === id);

    if (product) {
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        saveCart();
        updateCartCount();

        if (!silent) {
            showToast(`${product.name} added to cart!`);
        }
    }
};

// --- Toast Notification System ---
window.showToast = function (message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.classList.add('toast-container');
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = `<i class="fa-solid fa-check-circle"></i><span class="toast-message">${message}</span>`;
    container.appendChild(toast);

    // Animation frames
    setTimeout(() => { toast.classList.add('show'); }, 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => { toast.remove(); }, 400);
    }, TOAST_DURATION);
};

// --- Utility Functions ---
function saveCart() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function updateCartCount() {
    const countSpan = document.getElementById('cart-count');
    if (countSpan) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        countSpan.textContent = `(${totalItems})`;
    }
}