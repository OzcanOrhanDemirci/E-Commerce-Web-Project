/* Project: PC Craft
   File: js/checkout.js
   Description: Handles checkout process, tax calculation, and success simulation.
*/

const TAX_RATE = 0.20;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Total
    calculateTotal();

    // 2. Handle Form Submission
    const form = document.getElementById('checkout-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simulate Processing
            const btn = form.querySelector('button[type="submit"]');

            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
            btn.disabled = true;

            setTimeout(() => {
                showSuccessModal();
            }, 1500);
        });
    }
});

// --- Currency Change Listener ---
window.addEventListener('currencyChange', () => {
    calculateTotal();
});

// --- Calculation Logic ---
function calculateTotal() {
    const totalEl = document.getElementById('checkout-total');
    if (!totalEl) return;

    const cart = JSON.parse(localStorage.getItem('techCoreCart')) || [];

    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }

    // Calculate Values
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    // Display formatted price
    totalEl.textContent = window.formatPrice ? window.formatPrice(total) : `$${total.toFixed(2)}`;
}

// --- Modal Logic ---
function showSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (modal) modal.classList.add('active');
}

// Global Function (Called by Modal Button)
window.finishDemo = function () {
    localStorage.removeItem('techCoreCart');
    window.location.href = 'index.html';
};