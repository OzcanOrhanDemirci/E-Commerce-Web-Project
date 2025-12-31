/* Project: PC Craft
   File: js/detail.js
   Description: Manages product details, dynamic reviews, and rating calculations.
   Refactored to use Promise-based currency initialization.
*/

// --- Global State ---
let currentProduct = null;
let currentUser = null;

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));

    // Find Product
    if (typeof products !== 'undefined') {
        currentProduct = products.find(p => p.id === productId);
    }

    if (!currentProduct) {
        console.error("Product not found via URL parameter.");
        window.location.href = 'shop.html';
        return;
    }

    // Load persisted reviews
    loadReviewsFromStorage(currentProduct);

    // Render Product Info (Wait for Currency API)
    if (window.currencyReady) {
        window.currencyReady.then(() => {
            initProductDetails();
        });
    } else {
        initProductDetails();
    }

    setupReviewForm();
});

function initProductDetails() {
    renderProductInfo(currentProduct);
    renderTechnicalSpecs(currentProduct);
    renderReviews(currentProduct);
}

// --- Auth State Listener ---
const checkAuthInterval = setInterval(() => {
    if (typeof firebase !== 'undefined' && firebase.auth()) {
        firebase.auth().onAuthStateChanged((user) => {
            currentUser = user;
            updateReviewUI();
        });
        clearInterval(checkAuthInterval);
    }
}, 500);

function updateReviewUI() {
    const loginMsg = document.getElementById('review-login-msg');
    const formContainer = document.getElementById('review-form-container');

    if (currentUser) {
        if (loginMsg) loginMsg.style.display = 'none';
        if (formContainer) formContainer.style.display = 'block';
    } else {
        if (loginMsg) loginMsg.style.display = 'block';
        if (formContainer) formContainer.style.display = 'none';
    }
}

// --- Review Logic ---
function setupReviewForm() {
    const form = document.getElementById('review-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!currentUser) return;

            const rating = parseInt(document.getElementById('review-rating').value);
            const text = document.getElementById('review-text').value.trim();

            const newReview = {
                user: currentUser.displayName || currentUser.email.split('@')[0],
                rating: rating,
                text: text
            };

            // 1. Add to Memory
            if (!currentProduct.reviews) currentProduct.reviews = [];
            currentProduct.reviews.unshift(newReview);

            // 2. Persist to Storage
            saveReviewToStorage(currentProduct.id, newReview);

            // 3. Update UI
            renderReviews(currentProduct);
            renderProductInfo(currentProduct); // Update star average

            // 4. Feedback
            form.reset();
            if (typeof window.showToast === 'function') window.showToast("Review submitted successfully!");
            else alert("Review submitted!");
        });
    }
}

// --- Storage Helpers ---
function loadReviewsFromStorage(product) {
    const key = `reviews_${product.id}`;
    const storedReviews = JSON.parse(localStorage.getItem(key)) || [];
    if (storedReviews.length > 0) {
        if (!product.reviews) product.reviews = [];
        // Note: In a real app, merging logic would be more complex to avoid duplicates
        product.reviews = [...storedReviews, ...product.reviews];
    }
}

function saveReviewToStorage(productId, review) {
    const key = `reviews_${productId}`;
    const existing = JSON.parse(localStorage.getItem(key)) || [];
    existing.unshift(review);
    localStorage.setItem(key, JSON.stringify(existing));
}

// --- Render Functions ---

function renderProductInfo(product) {
    // Basic Info
    document.title = `${product.name} | PC Craft`;
    const breadcrumbName = document.getElementById('bc-name');
    if (breadcrumbName) breadcrumbName.textContent = product.name;

    const imgEl = document.getElementById('detail-img');
    if (imgEl) { imgEl.src = product.image; imgEl.alt = product.name; }

    const nameEl = document.getElementById('detail-name');
    if (nameEl) nameEl.textContent = product.name;

    const catEl = document.getElementById('detail-category');
    if (catEl) catEl.textContent = product.category;

    // Rating Calculation
    const reviewCount = product.reviews ? product.reviews.length : 0;
    let totalRating = 0;
    if (reviewCount > 0) {
        totalRating = product.reviews.reduce((acc, r) => acc + r.rating, 0) / reviewCount;
    }

    // Render Stars
    const ratingContainer = document.querySelector('.detail-meta .rating');
    if (ratingContainer) {
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            starsHtml += (i <= Math.round(totalRating))
                ? '<i class="fa-solid fa-star" style="color: #ffc107;"></i>'
                : '<i class="fa-regular fa-star" style="color: #555;"></i>';
        }
        starsHtml += `<span style="color: var(--text-main); font-size: 0.9rem; margin-left: 5px;">(${reviewCount} Verified Reviews)</span>`;
        ratingContainer.innerHTML = starsHtml;
    }

    // Price
    const displayPrice = window.formatPrice ? window.formatPrice(product.price) : `$${product.price}`;
    const priceEl = document.getElementById('detail-price');
    if (priceEl) priceEl.textContent = displayPrice;

    // Installment Info
    const installmentEl = document.getElementById('installment-price');
    if (installmentEl) {
        if (product.campaign) {
            const monthlyUSD = product.price / product.campaign.installment;
            const monthlyDisplay = window.formatPrice ? window.formatPrice(monthlyUSD) : `$${monthlyUSD.toFixed(2)}`;
            installmentEl.innerHTML = `<span style="color:var(--text-light); font-weight:bold;">${product.campaign.bank}</span>: ${product.campaign.installment} x ${monthlyDisplay}`;
        } else {
            const monthlyUSD = product.price / 6;
            const monthlyDisplay = window.formatPrice ? window.formatPrice(monthlyUSD) : `$${monthlyUSD.toFixed(2)}`;
            installmentEl.textContent = `${monthlyDisplay} / month`;
        }
    }

    // Action Button
    const addBtn = document.getElementById('add-to-cart-btn');
    if (addBtn) {
        // Remove old listeners by cloning
        const newBtn = addBtn.cloneNode(true);
        addBtn.parentNode.replaceChild(newBtn, addBtn);

        newBtn.addEventListener('click', () => {
            if (typeof window.addToCart === 'function') window.addToCart(product.id);
        });
    }
}

function renderTechnicalSpecs(product) {
    const specsBody = document.getElementById('specs-body');
    if (!specsBody || !product.specs) return;

    specsBody.innerHTML = '';
    for (const [key, value] of Object.entries(product.specs)) {
        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        specsBody.innerHTML += `<tr><td>${label}</td><td style="color: var(--text-light);">${value}</td></tr>`;
    }
}

function renderReviews(product) {
    const container = document.getElementById('reviews-container');
    if (!container) return;
    container.innerHTML = '';

    if (!product.reviews || product.reviews.length === 0) {
        container.innerHTML = `<div style="padding: 1rem; border: 1px dashed #333; border-radius: 8px; color: var(--text-main);">No reviews yet. Be the first to review this component!</div>`;
        return;
    }

    product.reviews.forEach(review => {
        let starsHtml = '';
        for (let i = 0; i < 5; i++) {
            starsHtml += (i < review.rating)
                ? '<i class="fa-solid fa-star" style="color: #ffc107;"></i>'
                : '<i class="fa-regular fa-star" style="color: #555;"></i>';
        }

        const card = document.createElement('div');
        card.classList.add('review-card');
        card.innerHTML = `
            <div class="review-header">
                <span class="reviewer-name">${review.user}</span>
                <div class="stars">${starsHtml}</div>
            </div>
            <p style="color: var(--text-main); font-size: 0.95rem;">"${review.text}"</p>
        `;
        container.appendChild(card);
    });
}

// Re-render on currency change
window.addEventListener('currencyChange', () => {
    if (currentProduct) renderProductInfo(currentProduct);
});