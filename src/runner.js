import { distance, angle } from "./utils";
import NullMonitor from "./monitors/null";
import BaseParticle from "./particles/base";

const CURSOR_INTERVAL = 100;
const MAX_ACTIVITY_RATE = 10000;
const ACTIVITY_DECAY = 0.99;

export default class Runner {
  constructor(Particle = BaseParticle, Monitor = NullMonitor) {
    this.prevCursorX = 0;
    this.prevCursorY = 0;
    this.frameDistance = 0;
    this.activityRate = 0;
    this.cursorAngle = 0;
    this.formationUnits = 0;

    this.Particle = Particle;
    this.monitor = new Monitor();
    this.particles = [];

    document.addEventListener("mousemove", this.onMouseMove.bind(this));
    window.setInterval(this.onInterval.bind(this), CURSOR_INTERVAL);
    window.requestAnimationFrame(this.onAnimationFrame.bind(this));
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
    this.monitor.count(this.particles.length);
    const remainingParticles = [];
    this.particles.forEach(p => {
      if (!p.removed) {
        p.step();
        remainingParticles.push(p);
      }
    });
    this.particles = remainingParticles;
    window.requestAnimationFrame(this.onAnimationFrame.bind(this));
  }
}
