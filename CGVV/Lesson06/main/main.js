document.addEventListener("DOMContentLoaded", function () {
    //BANNER
    const slides = document.querySelectorAll(".carousel-slide");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    let currentIndex = 0;
    function updateCarousel() {
        slides.forEach((slide, index) => {
            slide.style.display = index === currentIndex ? "block" : "none";
        });
    }
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    }
    prevButton.addEventListener("click", prevSlide);
    nextButton.addEventListener("click", nextSlide);
    setInterval(nextSlide, 5000);
    updateCarousel();
    //MOVIE
    const movieContainer = document.querySelector(".movies");
    const moviePrev = document.querySelector(".movie-prev");
    const movieNext = document.querySelector(".movie-next");
    let movieIndex = 0;
    const movieWidth = 220;
    function moveMovies(direction) {
        movieIndex += direction;
        const maxIndex = movieContainer.children.length - 4;
        if (movieIndex < 0) movieIndex = 0;
        if (movieIndex > maxIndex) movieIndex = maxIndex;
        movieContainer.style.transform = `translateX(-${movieIndex * movieWidth}px)`;
    }
    //EVENT
    moviePrev.addEventListener("click", () => moveMovies(-1));
    movieNext.addEventListener("click", () => moveMovies(1));
    const eventContainer = document.querySelector(".events");
    const eventPrev = document.querySelector(".event-prev");
    const eventNext = document.querySelector(".event-next");
    let eventIndex = 0;
    const eventWidth = 320;
    function moveEvents(direction) {
        eventIndex += direction;
        const maxIndex = eventContainer.children.length - 3;
        if (eventIndex < 0) eventIndex = 0;
        if (eventIndex > maxIndex) eventIndex = maxIndex;
        eventContainer.style.transform = `translateX(-${eventIndex * eventWidth}px)`;
    }
    eventPrev.addEventListener("click", () => moveEvents(-1));
    eventNext.addEventListener("click", () => moveEvents(1));
});
document.querySelector(".profile").addEventListener("click", function() {
  window.location.href = "profile.html";
});