/* Project: PC Craft
   File: js/cart.js
   Description: Manages shopping cart rendering. 
   Refactored to wait for currency data using Promises.
*/

const TAX_RATE = 0.20;

document.addEventListener('DOMContentLoaded', () => {
    // WAIT for currency data before rendering cart
    if (window.currencyReady) {
        window.currencyReady.then(() => {
            renderCart();
        });
    } else {
        renderCart();
    }
});

// --- Currency Change Listener ---
window.addEventListener('currencyChange', () => {
    renderCart();
});

// --- Render Logic ---
function renderCart() {
    const elements = {
        container: document.getElementById('cart-items'),
        subtotal: document.getElementById('cart-subtotal'),
        tax: document.getElementById('cart-tax'),
        total: document.getElementById('cart-total'),
        clearBtn: document.getElementById('btn-clear-all')
    };

    if (!elements.container) return;

    // 1. Check for Empty Cart
    if (!cart || cart.length === 0) {
        renderEmptyCart(elements);
        return;
    }

    if (elements.clearBtn) elements.clearBtn.style.display = 'block';

    // 2. Render Items
    elements.container.innerHTML = '';
    let subtotal = 0;

    cart.forEach((item) => {
        const itemTotalUSD = item.price * item.quantity;
        subtotal += itemTotalUSD;

        const displayPrice = window.formatPrice ? window.formatPrice(item.price) : `$${item.price}`;
        const displayTotal = window.formatPrice ? window.formatPrice(itemTotalUSD) : `$${itemTotalUSD}`;

        const row = document.createElement('div');
        row.classList.add('cart-item-row');
        row.style.cssText = "display: flex; gap: 1rem; margin-bottom: 1.5rem; background: #15191d; padding: 1rem; border-radius: 8px; align-items: center; position: relative; border: 1px solid #333;";

        row.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px; background: #000;">
            <div style="flex-grow: 1;">
                <h4 style="margin-bottom: 0.2rem; font-size: 1rem;">${item.name}</h4>
                <span style="font-size: 0.9rem; color: var(--accent);">${displayPrice}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <button onclick="updateItemQuantity(${item.id}, -1)" class="btn-qty">-</button>
                <span style="font-weight: bold; width: 20px; text-align: center;">${item.quantity}</span>
                <button onclick="updateItemQuantity(${item.id}, 1)" class="btn-qty">+</button>
            </div>
            <div style="font-weight: bold; min-width: 80px; text-align: right;">${displayTotal}</div>
            <button onclick="removeItemFromCart(${item.id})" class="btn-remove-item">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
        elements.container.appendChild(row);
    });

    // 3. Calculate Totals
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    if (elements.subtotal) elements.subtotal.textContent = window.formatPrice ? window.formatPrice(subtotal) : `$${subtotal.toFixed(2)}`;
    if (elements.tax) elements.tax.textContent = window.formatPrice ? window.formatPrice(tax) : `$${tax.toFixed(2)}`;
    if (elements.total) elements.total.textContent = window.formatPrice ? window.formatPrice(total) : `$${total.toFixed(2)}`;

    setupCheckoutButton();
}

function renderEmptyCart(elements) {
    elements.container.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <i class="fa-solid fa-cart-arrow-down" style="font-size: 3rem; color: #333; margin-bottom: 1rem;"></i>
            <p>Your cart is currently empty.</p>
            <a href="shop.html" style="color: var(--accent); margin-top: 1rem; display: inline-block;">Go to Shop</a>
        </div>
    `;

    const zeroPrice = window.formatPrice ? window.formatPrice(0) : "$0.00";
    if (elements.subtotal) elements.subtotal.textContent = zeroPrice;
    if (elements.tax) elements.tax.textContent = zeroPrice;
    if (elements.total) elements.total.textContent = zeroPrice;

    if (elements.clearBtn) elements.clearBtn.style.display = 'none';

    setupCheckoutButton();
}

// --- Checkout Button Logic ---
function setupCheckoutButton() {
    const checkoutBtn = document.getElementById('action-checkout-btn');

    if (checkoutBtn) {
        const newBtn = checkoutBtn.cloneNode(true);
        newBtn.removeAttribute('onclick');
        newBtn.onclick = null;

        checkoutBtn.parentNode.replaceChild(newBtn, checkoutBtn);

        newBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (!cart || cart.length === 0) {
                if (typeof showToast === 'function') {
                    showToast("⚠️ Your cart is empty! Please add products first.");
                }
            } else {
                window.location.href = 'checkout.html';
            }
        });
    }
}

// --- Global Cart Actions ---
window.updateItemQuantity = function (id, change) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeItemFromCart(id);
        } else {
            saveCart();
            renderCart();
            updateCartCount();
        }
    }
};

window.removeItemFromCart = function (id) {
    const item = cart.find(i => i.id === id);
    cart = cart.filter(i => i.id !== id);

    saveCart();
    renderCart();
    updateCartCount();

    if (typeof showToast === 'function') {
        showToast(`${item ? item.name : 'Item'} removed from cart.`);
    }
};

// --- Modal Logic ---
window.openClearModal = function () {
    const modal = document.getElementById('confirmation-modal');
    if (modal) modal.classList.add('active');
};

window.closeClearModal = function () {
    const modal = document.getElementById('confirmation-modal');
    if (modal) modal.classList.remove('active');
};

window.confirmClearCart = function () {
    cart = [];
    saveCart();
    renderCart();
    updateCartCount();
    closeClearModal();
    if (typeof showToast === 'function') {
        showToast("All items have been removed from your cart.");
    }
};

window.onclick = function (event) {
    const modal = document.getElementById('confirmation-modal');
    if (event.target == modal) closeClearModal();
};