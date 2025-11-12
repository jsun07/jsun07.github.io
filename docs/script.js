const container = document.getElementById("thought-container");
const input = document.getElementById("thought-input");
const button = document.getElementById("add-thought-button");

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
  bubble.style.bottom = "0px"; 

  container.appendChild(bubble);

  function popBubble(bubble, thought, x, y) {
    bubble.remove();

    const poppedText = document.createElement("div");
    poppedText.classList.add("popped-text");
    poppedText.textContent = thought;

    poppedText.style.left = `${x}px`;
    poppedText.style.top = `${y}px`;

    container.appendChild(poppedText);
  }

  bubble.animate(
    [
      { transform: "translateY(0)", opacity: 1 },
      { transform: "translateY(-80vh)", opacity: 1 },
      { transform: "translateY(-100vh)", opacity: 0 }
    ],
    { duration: 10000, fill: "forwards" }
  ).onfinish = () => {
    bubble.remove(); 
  };

  bubble.addEventListener("click", (e) => {
    popBubble(bubble, thought, e.pageX, e.pageY);
  });

  input.value = "";
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    button.click();
  }
});

const bubbleContainer = document.getElementById('background-bubbles');

function createBubble() {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  
  const size = Math.random() * 70 + 80;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;

  bubble.style.left = Math.random() * 100 + "%"; 
  bubble.style.bottom = "0"; 

  bubble.style.animation = `floatUpFade ${Math.random() * 5 + 7}s linear forwards`; 
  
  bubbleContainer.appendChild(bubble);

  bubble.addEventListener('animationend', () => {
    bubble.remove();
  });
}

setInterval(createBubble, 4000);

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
