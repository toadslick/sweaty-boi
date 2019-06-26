import { vector } from "./utils";

const SIZE = 50;
const TAG_NAME = "div";

const privateStyles = {
  position: "fixed",
  left: `${-1 * SIZE}px`,
  top: `${-1 * SIZE}px`,
  height: `${SIZE}px`,
  width: `${SIZE}px`,
  zIndex: 9999,
  userSelect: "none"
};

export default class Particle {
  customStyles = {
    backgroundColor: "pink",
    borderRadius: `${SIZE / 2}px`
  };

  scaleDecay = 0.98;
  velocityMultiplier = 30;
  velocityDecayX = 0.96;
  velocityDecayY = 0.96;
  gravity = 1;
  gravityDecay = 1.05;
  gravityMax = 10;
  removed = false;

  constructor(originX = 0, originY = 0, angle = 0, velocity = 0, scale = 1) {
    const { x: vx, y: vy } = vector(angle, velocity * this.velocityMultiplier);
    this.x = originX + SIZE / 2;
    this.y = originY + SIZE / 2;
    this.velocityX = vx;
    this.velocityY = vy;
    this.scale = scale;
    this.element = document.createElement(TAG_NAME);

    const styles = { ...this.customStyles, ...privateStyles };
    for (const key in styles) {
      this.element.style[key] = styles[key];
    }

    document.body.appendChild(this.element);
    this.update();
  }

  update() {
    const {
      x,
      y,
      scale,
      element: { style }
    } = this;
    style.transform = [
      `scale(${scale})`,
      `translate(${x * (1 / scale)}px, ${y * (1 / scale)}px)`
    ].join(" ");
  }

  step() {
    if (this.shouldDismount()) {
      document.body.removeChild(this.element);
      this.removed = true;
    } else {
      this.decay();
      this.update();
    }
  }

  decay() {
    const vect = vector(this.angle, this.velocity);
    this.scale = this.scale * this.scaleDecay;
    this.velocityX = this.velocityX * this.velocityDecayX;
    this.velocityY = this.velocityY * this.velocityDecayY;
    this.gravity = Math.min(this.gravity * this.gravityDecay, this.gravityMax);
    this.x = this.x + this.velocityX;
    this.y = this.y + this.velocityY + this.gravity;
  }

  shouldDismount() {
    return this.scale < 0.1;
  }
}
