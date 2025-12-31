/* Project: PC Craft
   File: js/currency.js
   Description: Dedicated module for Currency API.
   Implements a Promise-based architecture to prevent race conditions.
*/

// --- Default Configuration ---
let exchangeRates = { USD: 1, EUR: 0.92, TRY: 34.5 };
const currencySymbols = { USD: '$', EUR: '€', TRY: '₺' };
const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

// Load User Preference
let currentCurrency = localStorage.getItem('pcCraftCurrency') || 'USD';

// --- PROMISE ARCHITECTURE SETUP ---
// This promise allows other scripts to wait until rates are fully loaded.
let resolveCurrency;
window.currencyReady = new Promise((resolve) => {
    resolveCurrency = resolve;
});

// --- 1. Fetch Rates from API ---
async function fetchRates() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data && data.rates) {
            exchangeRates = data.rates;

            // Ensure critical rates exist
            if (!exchangeRates.TRY) exchangeRates.TRY = 34.0;

            console.log("Exchange rates updated:", exchangeRates);
        }
    } catch (error) {
        console.warn("Currency API Error: Using default rates.", error);
    } finally {
        // ALWAYS resolve the promise, whether API succeeds or fails.
        // This ensures the app initializes and doesn't hang.
        resolveCurrency();

        // Notify application of rate change (for subsequent updates)
        window.dispatchEvent(new Event('currencyChange'));
    }
}

// --- 2. Global Price Formatter ---
window.formatPrice = function (priceInUSD) {
    let price = parseFloat(priceInUSD);
    if (isNaN(price)) return "$0.00";

    const rate = exchangeRates[currentCurrency] || 1;
    const converted = price * rate;
    const symbol = currencySymbols[currentCurrency] || '$';

    return `${symbol}${converted.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    })}`;
};

// --- 3. Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    fetchRates();

    const selector = document.getElementById('currency-selector');
    if (selector) {
        selector.value = currentCurrency;

        selector.addEventListener('change', (e) => {
            currentCurrency = e.target.value;
            localStorage.setItem('pcCraftCurrency', currentCurrency);

            // Dispatch event to update UI immediately
            window.dispatchEvent(new Event('currencyChange'));
        });
    }
});