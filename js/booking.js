import { db } from "../firebase/firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    // Hide any previous success message
    document.getElementById("successMessage").style.display = "none";

    // Generate a unique booking reference
    const bookingReference = "LXG-" + Date.now().toString().slice(-8);

    const booking = {

        bookingReference: bookingReference,

        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        service: document.getElementById("service").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        notes: document.getElementById("notes").value,

        status: "Pending",

        createdAt: serverTimestamp()

    };

    try {

        // Save booking to Firestore
        await addDoc(collection(db, "appointments"), booking);

        document.getElementById("bookingReference").textContent =
    "Booking Reference: " + bookingReference;
    
        // Display the booking reference
        document.getElementById("bookingReference").textContent =
            "Booking Reference: " + bookingReference;

        // Clear the form
        bookingForm.reset();

        // Show success message
        const successMessage = document.getElementById("successMessage");

        successMessage.style.display = "none";

        setTimeout(() => {

            successMessage.style.display = "block";

            successMessage.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 100);

    } catch (error) {

        console.error(error);

        alert("Failed to book appointment. Please try again.");

    }

});