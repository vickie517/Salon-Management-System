import { db } from "../firebase/firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    console.log("Name:", document.getElementById("name").value);
console.log("Phone:", document.getElementById("phone").value);
console.log("Service:", document.getElementById("service").value);
console.log("Date:", document.getElementById("date").value);
console.log("Time:", document.getElementById("time").value);
console.log("Notes:", document.getElementById("notes").value);

    const booking = {

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

        await addDoc(collection(db, "appointments"), booking);

        alert("Appointment booked successfully!");

        bookingForm.reset();

    } catch (error) {

        alert(error.message);

    }

});