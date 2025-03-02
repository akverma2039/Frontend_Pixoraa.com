(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    // Initiate WOW.js
    new WOW().init();
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Team carousel
    $(".team-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: false,
        dots: false,
        loop: true,
        margin: 50,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0: { items: 1 },
            768: { items: 2 },
            992: { items: 3 }
        }
    });

    // Testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: true,
        dots: true,
        loop: true,
        margin: 0,
        nav: false,
        responsiveClass: true,
        responsive: {
            0: { items: 1 },
            576: { items: 1 },
            768: { items: 2 },
            992: { items: 3 }
        }
    });

    // Fact Counter
    $(document).ready(function () {
        $('.counter-value').each(function () {
            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                duration: 2000,
                easing: 'easeInQuad',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
    });

})(jQuery);


// Contact Form Submission (Outside jQuery Function)

document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form from refreshing

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();
    const responseMessage = document.getElementById("responseMessage");

    if (!name || !email || !phone || !message) {
        responseMessage.innerHTML = "❌ All fields are required!";
        responseMessage.style.color = "red";
        return;
    }

    try {
        const response = await fetch("https://pixoraa.onrender.com/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, phone, message })
        });

        const data = await response.json();

        if (response.ok) {
            responseMessage.innerHTML = "✅ Message sent successfully!";
            responseMessage.style.color = "green";
            document.getElementById("contactForm").reset(); // Clear the form
        } else {
            responseMessage.innerHTML = `❌ Error: ${data.message}`;
            responseMessage.style.color = "red";
        }
    } catch (error) {
        console.error("Error sending message:", error);
        responseMessage.innerHTML = "❌ Failed to send message. Please try again later.";
        responseMessage.style.color = "red";
    }
});
