import { distance, angle } from "./utils";
import NullMonitor from "./monitor";
import BaseParticle from "./particles/base";
import SweatParticle from "./particles/sweat";
import GlistenParticle from "./particles/glisten";

const CURSOR_INTERVAL = 100;
const MAX_ACTIVITY_RATE = 10000;
const ACTIVITY_DECAY = 0.99;
const MOUSE_EVENT = "mousemove";

export default class Runner {
  constructor(Monitor = NullMonitor) {
    this.prevCursorX = 0;
    this.prevCursorY = 0;
    this.frameDistance = 0;
    this.activityRate = 0;
    this.cursorAngle = 0;
    this.formationUnits = 0;

    this.Particle = BaseParticle;
    this.monitor = new Monitor();
    this.particles = [];
    this.running = false;

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onAnimationFrame = this.onAnimationFrame.bind(this);
    this.onInterval = this.onInterval.bind(this);
  }

  start() {
    if (!this.running) {
      this.running = true;
      this.interval = window.setInterval(this.onInterval, CURSOR_INTERVAL);
      document.addEventListener(MOUSE_EVENT, this.onMouseMove);
      window.requestAnimationFrame(this.onAnimationFrame);
    }
  }

  stop() {
    if (this.running) {
      this.running = false;
      window.clearInterval(this.interval);
      document.removeEventListener(MOUSE_EVENT, this.onMouseMove);
    }
  }

  mode(key) {
    switch (key) {
      case "sweat":
        this.Particle = SweatParticle;
        this.start();
        break;
      case "glisten":
        this.Particle = GlistenParticle;
        this.start();
        break;
      default:
        this.stop();
    }
  }

  onMouseMove({ clientX, clientY }) {
    this.frameDistance += distance(
      this.prevCursorX,
      this.prevCursorY,
      clientX,
      clientY
    );
    const ang = angle(this.prevCursorX, this.prevCursorY, clientX, clientY);
    ang && (this.cursorAngle = ang);
    this.prevCursorX = clientX;
    this.prevCursorY = clientY;
  }

  onInterval() {
    const velocity = this.frameDistance / CURSOR_INTERVAL;

    this.activityRate = Math.min(
      (this.activityRate + this.frameDistance) * ACTIVITY_DECAY,
      MAX_ACTIVITY_RATE
    );

    this.monitor.activity(this.activityRate, MAX_ACTIVITY_RATE);
    this.monitor.vector(this.cursorAngle, this.frameDistance);

    this.formationUnits += this.Particle.incrementFormation(
      this.activityRate,
      velocity
    );

    while (this.formationUnits >= 1) {
      this.formationUnits -= 1;
      this.particles.push(
        new this.Particle(
          this.prevCursorX,
          this.prevCursorY,
          this.cursorAngle,
          velocity
        )
      );
    }

    this.frameDistance = 0;
  }

  onAnimationFrame() {
    const remainingParticles = [];
    this.particles.forEach(p => {
      if (!p.removed) {
        p.step();
        remainingParticles.push(p);
      }
    });
    this.particles = remainingParticles;
    this.monitor.count(this.particles.length);
    if (this.running || this.particles.length) {
      window.requestAnimationFrame(this.onAnimationFrame.bind(this));
    }
  }
}
