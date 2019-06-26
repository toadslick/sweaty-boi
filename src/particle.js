import { vector } from "./utils";

const SIZE = 30;
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
  styles = { background: "pink" };

  scaleDecay = 0;
  velocityMultiplier = 0;
  velocityScatter = 0;
  velocityDecayX = 0;
  velocityDecayY = 0;
  gravityX = 0;
  gravityXDecay = 0;
  gravityXMax = 0;
  gravityY = 0;
  gravityYDecay = 0;
  gravityYMax = 0;

  constructor(originX = 0, originY = 0, angle = 0, velocity = 0, scale = 1) {
    this.config();

    const {
      scaleScatter,
      velocityMultiplier,
      velocityScatter,
      originOffsetDistance
    } = this;

    const { x: vx, y: vy } = vector(angle, velocity * velocityMultiplier);

    this.x = originX + SIZE / 2;
    this.y = originY + SIZE / 2;
    this.velocityX = vx + (Math.random() - 0.5) * velocityScatter;
    this.velocityY = vy + (Math.random() - 0.5) * velocityScatter;
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
