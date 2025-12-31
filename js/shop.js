/* Project: PC Craft
   File: js/shop.js
   Description: Advanced filtering logic updated to use Promise-based currency initialization.
*/

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const elements = {
        grid: document.getElementById('shop-products'),
        searchInput: document.getElementById('search-input'),
        searchBtn: document.getElementById('search-btn'),
        priceRange: document.getElementById('price-range'),
        priceValue: document.getElementById('price-value'),
        categoryBtns: document.querySelectorAll('.filter-btn'),
        dynamicFilters: document.getElementById('dynamic-filters'),
        clearFiltersBtn: document.getElementById('clear-filters')
    };

    // State
    const state = {
        category: 'all',
        search: '',
        maxPrice: 3000,
        filters: {}
    };

    const filterConfig = {
        cpu: ['brand', 'series', 'socket'],
        motherboard: ['brand', 'socket', 'ramType', 'formFactor'],
        gpu: ['chipset', 'series', 'vram'],
        ram: ['type', 'capacity', 'speed'],
        storage: ['type', 'capacity'],
        psu: ['wattage', 'modular'],
        case: ['brand', 'formFactor'],
        cooling: ['type', 'size']
    };

    // --- INITIALIZATION ---
    // Wait for currency module to be ready instead of using setTimeout
    if (window.currencyReady) {
        window.currencyReady.then(() => {
            initShop();
        });
    } else {
        // Fallback if promise is missing (safety check)
        console.warn("Currency promise not found, initializing immediately.");
        initShop();
    }

    // Real-time currency exchange listener
    window.addEventListener('currencyChange', () => {
        renderShopProducts();
    });

    function initShop() {
        generateDynamicFilters();
        renderShopProducts();
        setupEventListeners();
    }

    // --- Event Listeners ---
    function setupEventListeners() {
        // Category Selection
        elements.categoryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                elements.categoryBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                state.category = e.target.dataset.category;
                state.filters = {}; // Reset specific filters on category change

                generateDynamicFilters();
                renderShopProducts();
            });
        });

        // Search
        if (elements.searchBtn) {
            elements.searchBtn.addEventListener('click', () => {
                state.search = elements.searchInput.value.toLowerCase();
                renderShopProducts();
            });
        }
        if (elements.searchInput) {
            elements.searchInput.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') {
                    state.search = e.target.value.toLowerCase();
                    renderShopProducts();
                }
            });
        }

        // Price Range
        if (elements.priceRange) {
            elements.priceRange.addEventListener('input', (e) => {
                state.maxPrice = e.target.value;
                if (elements.priceValue) elements.priceValue.textContent = `$${state.maxPrice}`;
                renderShopProducts();
            });
        }

        // Clear Filters
        if (elements.clearFiltersBtn) {
            elements.clearFiltersBtn.addEventListener('click', clearAllFilters);
        }
    }

    function clearAllFilters() {
        state.search = '';
        state.maxPrice = 3000;
        state.filters = {};

        if (elements.searchInput) elements.searchInput.value = '';
        if (elements.priceRange) elements.priceRange.value = 3000;
        if (elements.priceValue) elements.priceValue.textContent = '$3000';

        elements.categoryBtns.forEach(b => b.classList.remove('active'));
        const allBtn = document.querySelector('[data-category="all"]');
        if (allBtn) allBtn.classList.add('active');
        state.category = 'all';

        generateDynamicFilters();
        renderShopProducts();
    }

    // --- Dynamic Filters Logic ---
    function generateDynamicFilters() {
        if (!elements.dynamicFilters) return;
        elements.dynamicFilters.innerHTML = '';

        if (state.category === 'all') {
            elements.dynamicFilters.innerHTML = `
                <div style="padding: 1rem; border: 1px dashed #333; border-radius: 4px; font-size: 0.9rem; color: var(--text-main); font-style: italic;">
                    Select a specific category (e.g., GPU) to see specific filters.
                </div>
            `;
            return;
        }

        const allowedSpecs = filterConfig[state.category];
        if (!allowedSpecs) return;

        const categoryProducts = products.filter(p => p.category === state.category);

        allowedSpecs.forEach(specKey => {
            const values = [...new Set(categoryProducts.map(p => p.specs ? p.specs[specKey] : null))]
                .filter(Boolean)
                .sort();

            if (values.length > 0) {
                createFilterGroup(specKey, values);
            }
        });
    }

    function createFilterGroup(key, values) {
        const group = document.createElement('div');
        group.classList.add('spec-filter-group');

        const title = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        group.innerHTML = `<h4>${title}</h4>`;

        values.forEach(val => {
            const label = document.createElement('label');
            label.classList.add('filter-checkbox-label');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = val;
            checkbox.classList.add('filter-checkbox');
            checkbox.dataset.key = key;

            if (state.filters[key] && state.filters[key].includes(String(val))) {
                checkbox.checked = true;
            }

            checkbox.addEventListener('change', (e) => {
                handleFilterChange(key, val, e.target.checked);
            });

            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(` ${val}`));
            group.appendChild(label);
        });

        elements.dynamicFilters.appendChild(group);
    }

    function handleFilterChange(key, value, isChecked) {
        if (!state.filters[key]) state.filters[key] = [];
        const strValue = String(value);

        if (isChecked) {
            state.filters[key].push(strValue);
        } else {
            state.filters[key] = state.filters[key].filter(item => item !== strValue);
            if (state.filters[key].length === 0) delete state.filters[key];
        }
        renderShopProducts();
    }

    // --- Product Rendering ---
    function renderShopProducts() {
        if (!elements.grid) return;
        elements.grid.innerHTML = '';

        const filtered = products.filter(product => {
            if (state.category !== 'all' && product.category !== state.category) return false;
            if (product.price > state.maxPrice) return false;
            if (state.search && !product.name.toLowerCase().includes(state.search)) return false;

            for (const [key, selectedValues] of Object.entries(state.filters)) {
                if (selectedValues.length > 0) {
                    if (!product.specs || !product.specs[key]) return false;
                    const productSpecValue = String(product.specs[key]);
                    if (!selectedValues.includes(productSpecValue)) return false;
                }
            }
            return true;
        });

        if (filtered.length === 0) {
            elements.grid.innerHTML = `
                <div style="width: 100%; text-align: center; padding: 3rem;">
                    <i class="fa-solid fa-filter-circle-xmark" style="font-size: 3rem; color: #333; margin-bottom: 1rem;"></i>
                    <p>No products match your filters.</p>
                    <button id="no-result-clear" style="color: var(--accent); background: none; margin-top: 10px; text-decoration: underline; cursor: pointer;">Clear Filters</button>
                </div>`;

            document.getElementById('no-result-clear').addEventListener('click', clearAllFilters);
            return;
        }

        filtered.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('product-card');

            const displayPrice = window.formatPrice ? window.formatPrice(product.price) : `$${product.price}`;

            let starsHtml = '';
            let reviewCount = product.reviews ? product.reviews.length : 0;
            let avgRating = 0;

            if (reviewCount > 0) {
                const total = product.reviews.reduce((acc, r) => acc + r.rating, 0);
                avgRating = Math.round(total / reviewCount);
            }

            for (let i = 1; i <= 5; i++) {
                starsHtml += (i <= avgRating)
                    ? '<i class="fa-solid fa-star" style="color: #ffc107; font-size: 0.8rem;"></i>'
                    : '<i class="fa-regular fa-star" style="color: #555; font-size: 0.8rem;"></i>';
            }

            let badgeText = product.category.toUpperCase();
            if (product.specs) {
                if (product.category === 'gpu') badgeText = product.specs.chipset || "GPU";
                if (product.category === 'cpu') badgeText = product.specs.socket || "CPU";
                if (product.category === 'ram') badgeText = product.specs.type || "RAM";
            }

            card.innerHTML = `
                <a href="product-detail.html?id=${product.id}" class="card-link-wrapper">
                    <span class="badge badge-overlay">${badgeText}</span>
                    <img src="${product.image}" alt="${product.name}" class="card-image">
                    <div class="card-content">
                        <span class="card-category">${product.category}</span>
                        <h3 class="card-title">${product.name}</h3>
                        
                        <div class="card-rating">
                            ${starsHtml}
                            <span class="review-count">(${reviewCount})</span>
                        </div>

                        <div class="card-price">${displayPrice}</div>
                    </div>
                </a>
                <div class="card-actions">
                    <button class="btn-add-cart" onclick="addToCart(${product.id})">
                        <i class="fa-solid fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
            `;
            elements.grid.appendChild(card);
        });
    }
});