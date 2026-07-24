function bookService(serviceName) {

    // Automatically select the chosen service
    document.getElementById("service").value = serviceName;

    // Smoothly scroll to the booking form
    document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
    });

}

// Make the function available to the HTML buttons
window.bookService = bookService;