const frostedCircle = document.querySelector('.frosted-circle');
let scale = 2; // Initial scale value
const scaleFactor = 0.1; // Factor to control zoom speed

// Handle zoom in and out
function zoom(event) {
  // Prevent default scrolling behavior
  event.preventDefault();

  // Zoom in or out depending on wheel direction
  if (event.deltaY < 0) {
    scale += scaleFactor; // Zoom in
  } else {
    scale -= scaleFactor; // Zoom out
  }

  // Ensure the scale doesn't go below 1
  scale = Math.max(scale, 1);

  // Apply the scale transformation to the frosted-circle
  frostedCircle.style.transform = `scale(${scale})`;
}

// Add event listener for mouse wheel zoom
document.addEventListener('wheel', zoom);



const canvas = document.getElementById('doodleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = canvas.parentElement.offsetWidth;
canvas.height = canvas.parentElement.offsetHeight;

ctx.strokeStyle = '#000';
ctx.lineWidth = 6;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let currentColor = '#000';
const lines = [];

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function animateLines() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const lineGroup of lines) {
        for (const line of lineGroup) {
            // Simulate downward drip
            line.startY += 0.3;
            line.endY += 0.3;

            // Simulate ink spreading by gradually increasing line width
            ctx.lineWidth = Math.min(ctx.lineWidth + 0.02, 20);

            // Draw the line with fading color
            ctx.strokeStyle = line.color;
            ctx.globalAlpha = Math.max(0.8 - line.startY / canvas.height, 0); // Fade based on position
            ctx.beginPath();
            ctx.moveTo(line.startX, line.startY);
            ctx.lineTo(line.endX, line.endY);
            ctx.stroke();
        }
    }

    ctx.globalAlpha = 1; // Reset alpha for next frame
    requestAnimationFrame(animateLines);
}



function draw(e) {
    if (!isDrawing) return;

    const line = [];
    for (let i = 0; i < 5; i++) {
        const offsetX = Math.random() * 2 - 1;
        const offsetY = Math.random() * 2 - 1;
        ctx.strokeStyle = currentColor;
        ctx.beginPath();
        ctx.moveTo(lastX + offsetX, lastY + offsetY);
        ctx.lineTo(e.offsetX + offsetX, e.offsetY + offsetY);
        ctx.stroke();

        line.push({
            startX: lastX + offsetX,
            startY: lastY + offsetY,
            endX: e.offsetX + offsetX,
            endY: e.offsetY + offsetY,
            color: currentColor
        });
    }

    lines.push(line);
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => (isDrawing = false));
canvas.addEventListener('mouseout', () => (isDrawing = false));

window.addEventListener('keydown', (e) => {
    if (e.key === 'a') {
        currentColor = getRandomColor();
    }
});

canvas.addEventListener('click', (e) => {
    for (let i = 0; i < 20; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 50;
        const offsetX = Math.cos(angle) * radius;
        const offsetY = Math.sin(angle) * radius;

        ctx.beginPath();
        ctx.arc(e.offsetX + offsetX, e.offsetY + offsetY, Math.random() * 10, 0, Math.PI * 2);
        ctx.fillStyle = getRandomColor();
        ctx.globalAlpha = Math.random() * 0.5 + 0.5; // Random transparency
        ctx.fill();
    }
});

animateLines();

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
setInterval(createBubble, 6000); // Create a new bubble every 2 seconds
