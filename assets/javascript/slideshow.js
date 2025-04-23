https://www.w3schools.com/howto/howto_js_slideshow.asp
let slideIndex = 0;

function showSlides(n) {
    const slides = document.getElementsByClassName("slide");

    if (n >= slides.length) { slideIndex = 0; }
    if (n < 0) { slideIndex = slides.length - 1; }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex].style.display = "block";
}

function changeSlide(n) {
    showSlides(slideIndex += n);
}

// Auto-display first slide when page loads
document.addEventListener('DOMContentLoaded', () => showSlides(slideIndex));
