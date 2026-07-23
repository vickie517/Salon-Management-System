import { app, db } from "../firebase/firebase.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import {
    collection,
    getDocs,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const auth = getAuth(app);

// Check if user is logged in
onAuthStateChanged(auth, (user) => {

    if (!user) {

        alert("Please login first.");

        window.location.href = "login.html";

    }

});

// Logout button
document.getElementById("logoutBtn").addEventListener("click", async (e) => {

    e.preventDefault();

    await signOut(auth);

    alert("Logged out successfully.");

    window.location.href = "login.html";

});

// ==========================
// Load Appointments
// ==========================
async function loadAppointments() {

    const table = document.getElementById("appointmentsTable");

    table.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "appointments"));

    querySnapshot.forEach((docSnap) => {

        const booking = docSnap.data();

        table.innerHTML += `
        <tr>
            <td>${booking.name}</td>
            <td>${booking.phone}</td>
            <td>${booking.service}</td>
            <td>${booking.date}</td>
            <td>${booking.time}</td>
            <td>${booking.status}</td>
            <td>
                <button onclick="updateStatus('${docSnap.id}', 'Confirmed')">
                    ✅ Confirm
                </button>

                <button onclick="updateStatus('${docSnap.id}', 'Cancelled')">
                    ❌ Cancel
                </button>
            </td>
        </tr>
        `;

    });

}

// ==========================
// Load Statistics
// ==========================
async function loadStatistics() {

    const querySnapshot = await getDocs(collection(db, "appointments"));

    let totalAppointments = 0;
    let todayBookings = 0;

    const today = new Date().toISOString().split("T")[0];

    querySnapshot.forEach((docSnap) => {

        const booking = docSnap.data();

        totalAppointments++;

        if (booking.date === today) {
            todayBookings++;
        }

    });

    document.getElementById("todayBookings").textContent = todayBookings;
document.getElementById("totalCustomers").textContent = totalAppointments;


}

// ==========================
// Update Appointment Status
// ==========================
async function updateStatus(id, newStatus) {

    try {

        const appointmentRef = doc(db, "appointments", id);

        await updateDoc(appointmentRef, {
            status: newStatus
        });

        alert("Appointment updated successfully!");

        loadAppointments();
        loadStatistics();

    } catch (error) {

        console.error(error);

        alert("Failed to update appointment.");

    }

}

// Make function accessible to HTML buttons
window.updateStatus = updateStatus;

// Load everything when page opens
loadAppointments();
loadStatistics();