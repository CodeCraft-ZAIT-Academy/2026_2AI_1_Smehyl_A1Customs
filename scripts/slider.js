const slider = document.getElementById("bike-slider");
const modBike = document.getElementById("mod-bike");
const sliderLine = document.getElementById("slider-line");

let dragging = false;


// Prevent the browser from dragging the images
slider.addEventListener("dragstart", function(event) {
    event.preventDefault();
});


// Start dragging
slider.addEventListener("pointerdown", function(event) {
    event.preventDefault();

    dragging = true;

    moveSlider(event);
});


// Move slider
document.addEventListener("pointermove", function(event) {

    if (!dragging) {
        return;
    }

    event.preventDefault();

    moveSlider(event);
});


// Stop dragging
document.addEventListener("pointerup", function() {
    dragging = false;
});


// Stop dragging if pointer gets cancelled
document.addEventListener("pointercancel", function() {
    dragging = false;
});


// Stop dragging if browser loses focus
window.addEventListener("blur", function() {
    dragging = false;
});


// Function that actually moves everything
function moveSlider(event) {

    const rect = slider.getBoundingClientRect();

    // Mouse position relative to the image
    let x = event.clientX - rect.left;


    // Don't allow slider to go past left side
    if (x < 0) {
        x = 0;
    }


    // Don't allow slider to go past right side
    if (x > rect.width) {
        x = rect.width;
    }


    // Convert position into percentage
    const percentage = (x / rect.width) * 100;


    // Move the white line
    sliderLine.style.left = percentage + "%";


    // Reveal/hide modified motorcycle
    modBike.style.clipPath =
        `inset(0 ${100 - percentage}% 0 0)`;
}