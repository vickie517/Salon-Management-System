// Import Firebase
import { app } from "../firebase/firebase.js";

import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

// Initialize Authentication
const auth = getAuth(app);

// Login Form
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        await signInWithEmailAndPassword(auth, email, password);

        alert("Login successful!");

        window.location.href = "dashboard.html";

    } catch (error) {

        alert(error.message);

    }

});