/* Project: PC Craft
   File: js/pc-builder.js
   Description: Logic for PC Builder with Promise-based Currency Integration.
*/

document.addEventListener('DOMContentLoaded', () => {
    // INITIALIZATION: Wait for currency data
    if (window.currencyReady) {
        window.currencyReady.then(() => {
            initBuilder();
        });
    } else {
        // Fallback
        initBuilder();
    }
});

// --- Currency Change Listener ---
window.addEventListener('currencyChange', () => {
    renderStep();    // Re-render product cards with new prices
    updateSummary(); // Re-calculate summary total
});

// --- Configuration ---
const steps = [
    { id: 'cpu', category: 'cpu', title: 'Select Processor (CPU)' },
    { id: 'motherboard', category: 'motherboard', title: 'Select Motherboard' },
    { id: 'ram', category: 'ram', title: 'Select Memory (RAM)' },
    { id: 'gpu', category: 'gpu', title: 'Select Graphics Card' },
    { id: 'storage', category: 'storage', title: 'Select Storage' },
    { id: 'psu', category: 'psu', title: 'Select Power Supply' },
    { id: 'case', category: 'case', title: 'Select PC Case' },
    { id: 'cooling', category: 'cooling', title: 'Select Cooling' }
];

// --- State ---
let currentStepIndex = 0;
const build = {
    cpu: null, motherboard: null, ram: null, gpu: null,
    storage: null, psu: null, case: null, cooling: null
};

// --- Initialization ---
function initBuilder() {
    renderStep();
    updateSummary();
    setupNavigation();
}

// --- Render Logic ---
function renderStep() {
    const currentStep = steps[currentStepIndex];
    const grid = document.getElementById('builder-grid');
    const compatMsg = document.getElementById('compatibility-msg');

    // Update Title
    const titleEl = document.getElementById('current-step-title');
    if (titleEl) titleEl.textContent = currentStep.title;

    // Update Progress Indicators
    document.querySelectorAll('.step').forEach((el, index) => {
        el.classList.remove('active', 'completed');
        if (index === currentStepIndex) el.classList.add('active');
        if (index < currentStepIndex) el.classList.add('completed');
    });

    // Filter Products & Compatibility Check
    let stepProducts = products.filter(p => p.category === currentStep.category);
    let msgText = "Showing All Options";

    if (currentStep.id === 'motherboard' && build.cpu) {
        stepProducts = stepProducts.filter(p => p.specs.socket === build.cpu.specs.socket);
        msgText = `Compatible with ${build.cpu.name}`;
    } else if (currentStep.id === 'ram' && build.motherboard) {
        stepProducts = stepProducts.filter(p => p.specs.type === build.motherboard.specs.ramType);
        msgText = `Compatible with ${build.motherboard.name}`;
    }

    if (compatMsg) compatMsg.textContent = msgText;

    if (grid) {
        grid.innerHTML = '';

        if (stepProducts.length === 0) {
            grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">No compatible parts found.</p>`;
            return;
        }

        // Generate Product Cards
        stepProducts.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('selection-card');

            const displayPrice = window.formatPrice ? window.formatPrice(product.price) : `$${product.price}`;
            const specInfo = getSpecInfo(currentStep.id, product.specs);

            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h4 style="font-size: 1rem;">${product.name}</h4>
                <div style="font-size: 0.85rem; color: var(--accent);">${specInfo}</div>
                <div style="font-weight: bold; margin-top: 5px;">${displayPrice}</div>
                <button class="btn-select" onclick="selectProduct(${product.id})">Select</button>
            `;
            grid.appendChild(card);
        });
    }

    // Update Navigation Buttons
    const btnPrev = document.getElementById('btn-prev');
    const btnSkip = document.getElementById('btn-skip');

    if (btnPrev) btnPrev.disabled = currentStepIndex === 0;
    if (btnSkip) btnSkip.style.display = 'block';
}

function getSpecInfo(stepId, specs) {
    switch (stepId) {
        case 'cpu': return `${specs.socket} | ${specs.cores} Cores`;
        case 'motherboard': return `${specs.socket} | ${specs.ramType}`;
        case 'ram': return `${specs.type} | ${specs.speed}`;
        case 'gpu': return `${specs.vram} VRAM`;
        default: return "";
    }
}

// --- Selection Logic ---
window.selectProduct = function (id) {
    const currentStep = steps[currentStepIndex];
    const product = products.find(p => p.id === id);

    if (product) {
        build[currentStep.id] = product;

        // Reset dependent parts if incompatible
        if (currentStep.id === 'cpu') { build.motherboard = null; build.ram = null; }
        if (currentStep.id === 'motherboard') { build.ram = null; }

        nextStep();
    }
};

// --- Navigation Functions ---
function nextStep() {
    if (currentStepIndex < steps.length - 1) {
        currentStepIndex++;
        renderStep();
        updateSummary();
    } else {
        updateSummary();
        if (typeof showToast === 'function') showToast("Build Configuration Complete! Please review.");
        const summaryPanel = document.querySelector('.summary-panel');
        if (summaryPanel) summaryPanel.scrollIntoView({ behavior: 'smooth' });
    }
}

function prevStep() {
    if (currentStepIndex > 0) {
        currentStepIndex--;
        renderStep();
    }
}

function skipStep() {
    const currentStepId = steps[currentStepIndex].id;
    build[currentStepId] = null;
    nextStep();
}

function setupNavigation() {
    const btnPrev = document.getElementById('btn-prev');
    const btnSkip = document.getElementById('btn-skip');
    const btnComplete = document.getElementById('btn-complete');

    if (btnPrev) btnPrev.addEventListener('click', prevStep);
    if (btnSkip) btnSkip.addEventListener('click', skipStep);

    if (btnComplete) {
        btnComplete.addEventListener('click', () => {
            let count = 0;
            Object.values(build).forEach(part => {
                if (part) {
                    if (typeof window.addToCart === 'function') {
                        window.addToCart(part.id, true);
                        count++;
                    }
                }
            });

            if (count > 0) {
                if (typeof showToast === 'function') showToast(`Success! ${count} components added to cart.`);
                setTimeout(() => { window.location.href = 'cart.html'; }, 1500);
            } else {
                if (typeof showToast === 'function') showToast("Your build is empty! Select parts first.");
            }
        });
    }
}

// --- Summary Logic ---
function updateSummary() {
    const listContainer = document.getElementById('build-list');
    const totalPriceEl = document.getElementById('total-price');
    const wattageEl = document.getElementById('total-wattage');
    const completeBtn = document.getElementById('btn-complete');

    if (!listContainer) return;

    listContainer.innerHTML = '';
    let total = 0;
    let watts = 0;

    steps.forEach(step => {
        const part = build[step.id];
        if (part) {
            total += part.price;
            if (part.specs.power) watts += parseInt(part.specs.power);
            if (part.specs.wattage) watts += parseInt(part.specs.wattage);

            const itemPrice = window.formatPrice ? window.formatPrice(part.price) : `$${part.price}`;

            const row = document.createElement('div');
            row.classList.add('build-item');
            row.innerHTML = `
                <div style="display:flex; flex-direction:column;">
                    <span style="font-size:0.75rem; color:var(--accent);">${step.title.split(' ')[1]}</span> 
                    <span class="build-item-name">${part.name}</span>
                </div>
                <span>${itemPrice}</span>
            `;
            listContainer.appendChild(row);
        }
    });

    if (total === 0) {
        listContainer.innerHTML = `<p style="color: #555; font-style: italic;">No parts selected yet.</p>`;
    }

    const displayTotal = window.formatPrice ? window.formatPrice(total) : `$${total.toFixed(2)}`;
    if (totalPriceEl) totalPriceEl.textContent = displayTotal;
    if (wattageEl) wattageEl.textContent = `~${watts} W`;

    if (completeBtn) completeBtn.disabled = !build.cpu;
}