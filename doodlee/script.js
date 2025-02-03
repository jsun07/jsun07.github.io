let handPose;
let video;
let hands = [];
let isDrawing = false;
let lastX, lastY;
let drawnLines = []; // Array to store drawn lines





function preload() {
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  handPose.detectStart(video, gotHands);

  window.addEventListener('keydown', (e) => {
    if (e.key === 's') isDrawing = true;
  });
  window.addEventListener('keyup', (e) => {
    if (e.key === 'e') isDrawing = false;
  });
}

function draw() {
  // Mirror the video feed
  push();
  translate(width, 0);
  scale(-1, 1); // Flip horizontally
 background(255)
  pop();

  // Draw all the tracked hand points
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];

    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      let mirroredX = width - keypoint.x; // Mirror the x-coordinate

      fill(0, 255, 0);
      noStroke();
      circle(mirroredX, keypoint.y, 10);
    }

    let indexFingerTip = hand.keypoints[8];
    let mirroredX = width - indexFingerTip.x;

    if (isDrawing) {
      if (lastX !== undefined && lastY !== undefined) {
        drawnLines.push([lastX, lastY, mirroredX, indexFingerTip.y]); // Store mirrored coordinates
      }
      lastX = mirroredX;
      lastY = indexFingerTip.y;
    } else {
      lastX = undefined;
      lastY = undefined;
    }
  }

  // Draw all stored lines mirrored
  stroke(255, 0, 0);
  strokeWeight(4);
  for (let i = 0; i < drawnLines.length; i++) {
    let linePoints = drawnLines[i];
    line(linePoints[0], linePoints[1], linePoints[2], linePoints[3]);
  }
}

function gotHands(results) {
  hands = results;
}
