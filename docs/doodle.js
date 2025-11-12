let handPose;
let video;
let hands = [];
let isDrawing = false;
let lastX, lastY;
let drawnLines = [];
let scale = 2;
const scaleFactor = 0.1;
let currentColor = '#000';
const lineFallSpeed = 0.5;

function zoom(event) {
    event.preventDefault();
    scale += event.deltaY < 0 ? scaleFactor : -scaleFactor;
    scale = Math.max(scale, 1);
}
document.addEventListener('wheel', zoom);

const canvas = document.getElementById('doodleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.parentElement.offsetWidth;
canvas.height = canvas.parentElement.offsetHeight;
ctx.strokeStyle = currentColor;
ctx.lineWidth = 10;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

function preload() {
    handPose = ml5.handPose();
}

function setup() {
    createCanvas(640, 680);
    video = createCapture(VIDEO);
    video.size(640, 680);
    video.hide();
    handPose.detectStart(video, gotHands);
}

function draw() {
    clear();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < drawnLines.length; i++) {
        let line = drawnLines[i];
        line.y1 += lineFallSpeed;
        line.y2 += lineFallSpeed;
        drawLine(line.x1, line.y1, line.x2, line.y2, line.color);
    }
    
    for (let i = 0; i < hands.length; i++) {
        let hand = hands[i];
        let indexFingerTip = hand.keypoints[8];
        let x = width - indexFingerTip.x;
        let y = indexFingerTip.y;

        if (isDrawing) {
            if (lastX !== undefined && lastY !== undefined) {
                ctx.beginPath();
                ctx.moveTo(lastX, lastY);
                ctx.quadraticCurveTo(lastX, lastY, x, y); 
                ctx.lineWidth = 12; 
                ctx.lineJoin = 'round'; 
                ctx.lineCap = 'round'; 
                ctx.strokeStyle = currentColor;
                ctx.stroke();

               
                drawnLines.push({ x1: lastX, y1: lastY, x2: x, y2: y, color: currentColor });
            }
            lastX = x;
            lastY = y;
        } else {
            lastX = undefined;
            lastY = undefined;
        }
    }
}


function drawLine(x1, y1, x2, y2, color) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function gotHands(results) {
    hands = results;
}

window.addEventListener('keydown', (e) => {
    if (e.key === 's') isDrawing = true;
    if (e.key === 'e') isDrawing = false;
    if (e.key === 'a') currentColor = getRandomColor();
});

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

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

const bubbleContainer = document.getElementById('background-bubbles');
function createBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    const size = Math.random() * 70 + 80;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = Math.random() * 100 + "%";
    bubble.style.animationDuration = Math.random() * 5 + 5 + "s";
    bubbleContainer.appendChild(bubble);
    bubble.addEventListener('animationend', () => {
        bubble.remove();
    });
}
setInterval(createBubble, 6000);
