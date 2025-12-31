# PC Craft 🖥️

**PC Craft** is a comprehensive e-commerce web application designed for high-end computer hardware. It features a logic-driven **PC Builder**, real-time currency conversion, and a persistent shopping cart system, built entirely with modern Vanilla JavaScript.

> **Context:** MIS 326 Web Programming Final Project.

## 🌟 Key Features

### 1. Intelligent PC Builder 🔧
A guided wizard that ensures hardware compatibility.
* **Logic Engine:** Automatically filters components based on dependencies (e.g., selecting an `LGA1700` CPU restricts Motherboards to `LGA1700` sockets only).
* **Step-by-Step Validation:** Prevents users from finalizing a build without essential parts (CPU, Motherboard, etc.).

### 2. Advanced Technical Architecture ⚙️
* **Promise-Based State Management:** The application uses a custom `window.currencyReady` Promise to ensure global configuration (like exchange rates) is loaded before any UI rendering to prevent race conditions.
* **Modular Design:** Codebase is split into distinct modules (`auth.js`, `cart.js`, `shop.js`) adhering to Clean Code principles.
* **Local Persistence:** Uses `localStorage` to persist the Shopping Cart and User Reviews across sessions.

### 3. Dynamic Storefront 🛍️
* **Multi-Currency Support:** Real-time price conversion for **USD**, **EUR**, and **TRY** fetched via Exchange Rate API.
* **Deep Filtering:** Users can filter products by granular specs (e.g., RAM Speed, GPU VRAM) generated dynamically from the data structure.

### 4. Authentication & Security 🔐
* **Google Firebase Integration:** Secure Email/Password registration and Google Sign-In support.
* **User State:** Real-time UI updates based on authentication status (Login/Logout handling).

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3 (Custom Properties & Grid/Flexbox), JavaScript (ES6+).
* **Backend / BaaS:** Google Firebase Authentication (v10 Compat).
* **Data Source:** JSON-based local data simulation with dynamic relational mapping.

## 📂 Project Structure

PC-Craft/ 
├── assets/ # Product images and static resources 
├── css/ │└── style.css # Global high-tech theme variables 
├── js/ │ ├── auth.js # Firebase Auth logic ├── currency.js # API integration & Promise architecture ├── pc-builder.js# Compatibility logic core ├── shop.js # Dynamic filtering engine └── data.js # Product database (Mock DB)
└── *.html # Semantic HTML templates

## 🚀 Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/OzcanOrhanDemirci/E-Commerce-Web-Project.git](https://github.com/OzcanOrhanDemirci/E-Commerce-Web-Project.git)
    ```
2.  **Run the project:**
    * Simply open `index.html` in your browser.
    * *Recommended:* Use a local server (like VS Code "Live Server").

## 👥 Authors

* **Özcan Orhan Demirci** 
* **Mithat Tuğrul Tek** 

---
*Built for the love of hardware.*
