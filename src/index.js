import { distance, angle, average } from "./utils";

const CURSOR_INTERVAL = 150;
const MAX_ACTIVITY_RATE = 10000;
const ACTIVITY_DECAY = 0.98;

let prevCursorX = 0;
let prevCursorY = 0;
let frameDistance = 0;
let activityRate = 0;
let frameAngles = [];

const activityDiv = document.getElementById("activity-meter");
const vectorDiv = document.getElementById("direction-indicator");

document.addEventListener("mousemove", ({ screenX, screenY }) => {
  const ang = angle(prevCursorX, prevCursorY, screenX, screenY);
  angle && frameAngles.push(ang);
  frameDistance += distance(prevCursorX, prevCursorY, screenX, screenY);
  prevCursorX = screenX;
  prevCursorY = screenY;
});

window.setInterval(() => {
  activityRate = Math.min(
    (activityRate + frameDistance) * ACTIVITY_DECAY,
    MAX_ACTIVITY_RATE
  );
  activityDiv.style.width = `${(activityRate / MAX_ACTIVITY_RATE) * 100}%`;
  vectorDiv.style.width = `${frameDistance * 0.75}px`;
  vectorDiv.style.transform = `rotate(${average(frameAngles)}deg)`;

  frameDistance = 0;
  frameAngles = [];
}, CURSOR_INTERVAL);
