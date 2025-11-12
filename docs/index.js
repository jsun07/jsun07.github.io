const slider = document.getElementById("slider");
const scrollSpeed = 5;
const threshold = 80;
function scrollSlider(amount) {
    slider.scrollBy({ left: amount, behavior: 'smooth' });
}
slider.addEventListener("mousemove", (event) => {
    const { offsetWidth, scrollWidth, scrollLeft } = slider;
    const mouseX = event.clientX;
    if (mouseX < threshold && scrollLeft > 0) {
        slider.scrollLeft -= scrollSpeed;
    } else if (mouseX > offsetWidth - threshold && scrollLeft < scrollWidth - offsetWidth) {
        slider.scrollLeft += scrollSpeed;
    }
});
slider.addEventListener("mouseleave", () => {
    slider.scrollLeft = 0;
});