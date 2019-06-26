import { angle, vector } from "./utils";

const SIZE = 20;
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
  config() {
    this.styles = { background: "pink" };
    this.originOffset = 0;
    this.scaleDecay = 0;
    this.velocityMultiplier = 0;
    this.velocityScatter = 0;
    this.velocityDecayX = 0;
    this.velocityDecayY = 0;
    this.gravityX = 0;
    this.gravityXDecay = 0;
    this.gravityXMax = 0;
    this.gravityY = 0;
    this.gravityYDecay = 0;
    this.gravityYMax = 0;
  }

  constructor(
    originX = 0,
    originY = 0,
    angleDegrees = 0,
    velocity = 0,
    scale = 1
  ) {
    this.config();

    const {
      scaleScatter,
      velocityMultiplier,
      velocityScatter,
      originOffsetDistance
    } = this;

    const { x: vx, y: vy } = vector(
      angleDegrees,
      velocity * velocityMultiplier
    );

    this.velocityX = vx + (Math.random() - 0.5) * velocityScatter;
    this.velocityY = vy + (Math.random() - 0.5) * velocityScatter;

    const { x: offsetX, y: offsetY } = vector(
      angle(0, 0, this.velocityX, this.velocityY),
      this.originOffset
    );

    this.x = originX + SIZE / 2 + offsetX;
    this.y = originY + SIZE / 2 + offsetY;
    this.scale = scale;
    this.element = document.createElement(TAG_NAME);
    this.removed = false;

    const styles = { ...this.styles, ...privateStyles };
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
      rotation,
      element: { style }
    } = this;
    style.transform = [
      `scale(${scale})`,
      `translate(${x * (1 / scale)}px, ${y * (1 / scale)}px)`,
      `rotate(${rotation.bind(this)()}deg)`
    ].join(" ");
  }

  step() {
    if (this.shouldRemove()) {
      document.body.removeChild(this.element);
      this.removed = true;
    } else {
      this.scale = this.scale * this.scaleDecay;
      this.velocityX = this.velocityX * this.velocityDecayX;
      this.velocityY = this.velocityY * this.velocityDecayY;
      this.gravityX = Math.min(
        this.gravityX * this.gravityXDecay,
        this.gravityXMax
      );
      this.gravityY = Math.min(
        this.gravityY * this.gravityYDecay,
        this.gravityYMax
      );
      this.x = this.x + this.velocityX + this.gravityX;
      this.y = this.y + this.velocityY + this.gravityY;
      this.update();
    }
  }

  rotation() {
    return 0;
  }

  shouldRemove() {
    return false;
  }
}
