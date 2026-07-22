const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", function(event){

    event.preventDefault();

    const name = document.getElementById("name").value;

    alert("Thank you " + name + "! Your appointment request has been received.");

    bookingForm.reset();

});