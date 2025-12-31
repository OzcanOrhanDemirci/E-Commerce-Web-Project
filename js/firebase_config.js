/* Project: PC Craft
   File: js/firebase-config.js
   Description: Firebase Initialization using Modular SDK.
*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCxsz_FDGfBBGzY3BnQdbIUSBeIEq_O6dg",
    authDomain: "pc-craft-d9b01.firebaseapp.com",
    projectId: "pc-craft-d9b01",
    storageBucket: "pc-craft-d9b01.firebasestorage.app",
    messagingSenderId: "856040556428",
    appId: "1:856040556428:web:b51a639782208062f138a9"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };