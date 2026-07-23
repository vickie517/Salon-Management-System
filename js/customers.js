import { app, db } from "../firebase/firebase.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const auth = getAuth(app);

// Protect page
onAuthStateChanged(auth, (user) => {

    if (!user) {

        alert("Please login first.");

        window.location.href = "login.html";

    }

});

// Logout
document.getElementById("logoutBtn").addEventListener("click", async (e) => {

    e.preventDefault();

    await signOut(auth);

    window.location.href = "login.html";

});

// Load customers
async function loadCustomers() {

    const table = document.getElementById("customersTable");

    table.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "appointments"));

    querySnapshot.forEach((doc) => {

        const booking = doc.data();

        table.innerHTML += `
        <tr>
            <td>${booking.name}</td>
            <td>${booking.phone}</td>
            <td>${booking.service}</td>
            <td>${booking.date}</td>
            <td>${booking.status}</td>
        </tr>
        `;
    });

}

loadCustomers();