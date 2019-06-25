import { distance } from './utils';

const CURSOR_INTERVAL = 300;
const MIN_ACTIVITY_DECAY = 50;
const MAX_ACTIVITY_RATE = 5000;
const ACTIVITY_DIVISOR = 15;

let prevCursorX = 0;
let prevCursorY = 0;
let totalDist = 0;
let activityRate = 0;

const meterDiv = document.getElementById('rate-meter');

document.addEventListener('mousemove', ({ screenX, screenY }) => {
  totalDist += distance(prevCursorX, prevCursorY, screenX, screenY);
  prevCursorX = screenX;
  prevCursorY = screenY;
});

window.setInterval(() => {
  const cooldown = Math.max(activityRate / ACTIVITY_DIVISOR, MIN_ACTIVITY_DECAY);
  activityRate = Math.min(Math.max(activityRate + totalDist - cooldown, 0), MAX_ACTIVITY_RATE);
  meterDiv.style.width = `${(activityRate / MAX_ACTIVITY_RATE) * 100}%`;
  totalDist = 0;
}, CURSOR_INTERVAL);
