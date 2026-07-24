import { db } from "../firebase/firebase.js";

import {
    collection,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

document.getElementById("checkBtn").addEventListener("click", async () => {

    const phone = document.getElementById("phone").value.trim();

    const result = document.getElementById("result");

    result.innerHTML = "";

    if (phone === "") {

        result.innerHTML = "<p>Please enter your phone number.</p>";

        return;

    }

    const q = query(
        collection(db, "appointments"),
        where("phone", "==", phone)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {

        result.innerHTML = "<p>No appointment found.</p>";

        return;

    }

    querySnapshot.forEach((doc) => {

        const booking = doc.data();

        result.innerHTML += `
            <div class="card">
                <h3>${booking.name}</h3>

                <p><strong>Service:</strong> ${booking.service}</p>

                <p><strong>Date:</strong> ${booking.date}</p>

                <p><strong>Time:</strong> ${booking.time}</p>

                <p><strong>Status:</strong> ${booking.status}</p>
            </div>

            <br>
        `;
    });

});