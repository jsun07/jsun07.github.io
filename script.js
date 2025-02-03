const container = document.getElementById("thought-container");
const input = document.getElementById("thought-input");
const button = document.getElementById("add-thought-button");

// Store stacking position
let stackHeight = 0;

button.addEventListener("click", () => {
  const thought = input.value.trim();

  if (thought === "") return;

  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.textContent = thought;

  const textLength = thought.length;
  const bubbleSize = Math.min(Math.max(textLength * 100, 150, 250), 350);
  bubble.style.width = bubble.style.height = `${bubbleSize}px`;

  bubble.style.left = Math.random() * (window.innerWidth - bubbleSize) + "px";
  bubble.style.top = Math.random() * (window.innerHeight - bubbleSize) + "px";

  container.appendChild(bubble);

  function popBubble(bubble, thought, x, y) {
  // Remove the bubble
  bubble.remove();

  // Pop the thought to the screen
  const poppedText = document.createElement("div");
  poppedText.classList.add("popped-text");
  poppedText.textContent = thought;

  poppedText.style.left = `${x}px`;
  poppedText.style.top = `${y}px`;

  container.appendChild(poppedText);

}

  // Add floating animation
  bubble.animate(
    [
      { transform: "translateY(100%)", opacity: 1 },
      { transform: "translateY(-150%)", opacity: 0.5 }
    ],
    { duration: 8000, fill: "forwards" }
  );

  // Add pop effect on click
  bubble.addEventListener("click", (e) => {
    popBubble(bubble, thought, e.pageX, e.pageY);
  });

  input.value = "";
});

// Allow Enter key to add a thought
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    button.click();
  }
});

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
    slider.scrollLeft = 0; // Scroll back to the first page when the mouse leaves
});

const bubbleContainer = document.getElementById('background-bubbles');

function createBubble() {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  
  // Random size
  const size = Math.random() * 70 + 80; // Bubble size between 30px and 80px
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;

  // Random horizontal position (positioned at the bottom)
  bubble.style.left = Math.random() * 100 + "%";
  bubble.style.animationDuration = Math.random() * 5 + 5 + "s"; // Random float speed between 5s and 10s
  
  bubbleContainer.appendChild(bubble);

  // Remove the bubble after animation ends
  bubble.addEventListener('animationend', () => {
    bubble.remove();
  });
}

// Create new bubbles at intervals
setInterval(createBubble, 4000); // Create a new bubble every 2 seconds
