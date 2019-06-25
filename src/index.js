import { distance, angle } from "./utils";
import Particle from "./particle";

const CURSOR_INTERVAL = 100;
const MAX_ACTIVITY_RATE = 10000;
const ACTIVITY_DECAY = 0.98;

let prevCursorX = 0;
let prevCursorY = 0;
let frameDistance = 0;
let activityRate = 0;
let cursorAngle = 0;

const activityDiv = document.getElementById("activity-meter");
const vectorDiv = document.getElementById("vector-indicator");

document.addEventListener("mousemove", ({ screenX, screenY }) => {
  frameDistance += distance(prevCursorX, prevCursorY, screenX, screenY);
  const ang = angle(prevCursorX, prevCursorY, screenX, screenY);
  ang && (cursorAngle = ang);
  prevCursorX = screenX;
  prevCursorY = screenY;
});

window.setInterval(() => {
  activityRate = Math.min(
    (activityRate + frameDistance) * ACTIVITY_DECAY,
    MAX_ACTIVITY_RATE
  );
  activityDiv.style.width = `${(activityRate / MAX_ACTIVITY_RATE) * 100}%`;
  vectorDiv.style.width = `${frameDistance}px`;
  vectorDiv.style.transform = `rotate(${cursorAngle}deg)`;
  frameDistance = 0;
}, CURSOR_INTERVAL);

new Particle();
