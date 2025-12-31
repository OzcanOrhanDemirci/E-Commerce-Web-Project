/* Project: PC Craft
   File: js/auth.js
   Description: Authentication logic using Firebase Compat SDK.
*/

// --- Firebase Configuration ---
const firebaseConfig = {
    apiKey: "AIzaSyCxsz_FDGfBBGzY3BnQdbIUSBeIEq_O6dg",
    authDomain: "pc-craft-d9b01.firebaseapp.com",
    projectId: "pc-craft-d9b01",
    storageBucket: "pc-craft-d9b01.firebasestorage.app",
    messagingSenderId: "856040556428",
    appId: "1:856040556428:web:b51a639782208062f138a9"
};

// --- Initialize Firebase (Compat Mode) ---
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();

console.log("Firebase Auth Loaded (Compat Mode)");

// --- DOM Elements ---
const elements = {
    loginForm: document.getElementById('login-form'),
    registerForm: document.getElementById('register-form'),
    googleBtn: document.getElementById('google-login-btn'),
    logoutBtn: document.getElementById('logout-btn'),
    userGreeting: document.getElementById('user-greeting'),
    authContainer: document.getElementById('auth-container'),
    profileContainer: document.getElementById('profile-container'),
    profileName: document.getElementById('profile-name'),
    profileEmail: document.getElementById('profile-email'),
    regName: document.getElementById('reg-name'),
    regEmail: document.getElementById('reg-email'),
    regPassword: document.getElementById('reg-password'),
    loginEmail: document.getElementById('login-email'),
    loginPassword: document.getElementById('login-password')
};

// --- Helper: UI Feedback ---
const showFeedback = (message, isError = false) => {
    if (typeof window.showToast === 'function' && !isError) {
        window.showToast(message);
    } else {
        alert(message);
    }
};

// --- 1. Register Logic ---
if (elements.registerForm) {
    elements.registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = elements.regName.value.trim();
        const email = elements.regEmail.value.trim();
        const password = elements.regPassword.value;

        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                return userCredential.user.updateProfile({ displayName: name });
            })
            .then(() => {
                alert(`Registration Successful! Welcome, ${name}`);
            })
            .catch((error) => {
                let msg = error.message;
                if (error.code === 'auth/email-already-in-use') msg = "This email is already in use.";
                alert(`REGISTRATION ERROR: ${msg}`);
                console.error(error);
            });
    });
}

// --- 2. Login Logic ---
if (elements.loginForm) {
    elements.loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = elements.loginEmail.value.trim();
        const password = elements.loginPassword.value;

        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                window.location.href = "index.html";
            })
            .catch((error) => {
                console.error("Login Error:", error);
                alert("Login Failed! Incorrect email or password.");
            });
    });
}

// --- 3. Google Login Logic ---
if (elements.googleBtn) {
    elements.googleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const provider = new firebase.auth.GoogleAuthProvider();

        auth.signInWithPopup(provider)
            .then(() => {
                window.location.href = "index.html";
            })
            .catch((error) => {
                alert(`Google Error: ${error.message}`);
                console.error(error);
            });
    });
}

// --- 4. Logout Logic (Shared) ---
const performLogout = () => {
    auth.signOut().then(() => {
        showFeedback("Logged out successfully.");
        setTimeout(() => {
            // Redirect to login if on profile page, otherwise reload
            if (window.location.pathname.includes('login.html')) {
                window.location.reload();
            } else {
                window.location.reload();
            }
        }, 1500);
    });
};

if (elements.logoutBtn) {
    elements.logoutBtn.addEventListener('click', performLogout);
}

// Global Logout Access (for other scripts)
window.handleLogout = performLogout;

// --- 5. Auth State Observer ---
auth.onAuthStateChanged((user) => {
    // Update Header Greeting
    if (elements.userGreeting) {
        elements.userGreeting.textContent = user ? (user.displayName || user.email) : "";
    }

    // Toggle Login/Profile Views
    if (elements.authContainer && elements.profileContainer) {
        if (user) {
            elements.authContainer.style.display = 'none';
            elements.profileContainer.style.display = 'block';
            if (elements.profileName) elements.profileName.textContent = user.displayName || "User";
            if (elements.profileEmail) elements.profileEmail.textContent = user.email;
        } else {
            elements.authContainer.style.display = 'block';
            elements.profileContainer.style.display = 'none';
        }
    }
});