import { angle, vector } from "./utils";

const { random, min } = Math;

const SIZE = 20;
const TAG_NAME = "div";

const privateStyles = {
  position: "fixed",
  left: `${-1 * SIZE}px`,
  top: `${-1 * SIZE}px`,
  height: `${SIZE}px`,
  width: `${SIZE}px`,
  zIndex: 9999,
  userSelect: "none",
};

const defaultConfig = self => {
  self.styles = {};
  self.originOffset = 0;
  self.scaleDecay = 0;
  self.scaleScatter = 0;
  self.velocityMultiplier = 0;
  self.velocityScatter = 0;
  self.velocityDecayX = 0;
  self.velocityDecayY = 0;
  self.gravityX = 0;
  self.gravityXDecay = 0;
  self.gravityXMax = 0;
  self.gravityY = 0;
  self.gravityYDecay = 0;
  self.gravityYMax = 0;
};

class Particle {
  config() {}

  constructor(
    originX = 0,
    originY = 0,
    angleDegrees = 0,
    velocity = 0,
    scale = 1
  ) {
    defaultConfig(this);

    this.config();

    const {
      velocityMultiplier,
      velocityScatter,
      originOffset,
      scaleScatter,
    } = this;

    const { x: vx, y: vy } = vector(
      angleDegrees,
      velocity * velocityMultiplier
    );

    this.velocityX = vx + (random() - 0.5) * velocityScatter;
    this.velocityY = vy + (random() - 0.5) * velocityScatter;

    const { x: offsetX, y: offsetY } = vector(
      angle(0, 0, this.velocityX, this.velocityY),
      originOffset
    );

    this.x = originX + SIZE / 2 + offsetX;
    this.y = originY + SIZE / 2 + offsetY;
    this.scale = scale + (random() - 0.5) * scaleScatter;
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
      element: { style },
    } = this;
    style.transform = [
      `scale(${scale})`,
      `translate(${x * (1 / scale)}px, ${y * (1 / scale)}px)`,
      `rotate(${rotation.bind(this)()}deg)`,
    ].join(" ");
  }

  step() {
    if (this.shouldRemove()) {
      document.body.removeChild(this.element);
      this.removed = true;
    } else {
      const {
        scale,
        scaleDecay,
        velocityX,
        velocityY,
        velocityDecayX,
        velocityDecayY,
        gravityX,
        gravityY,
        gravityXDecay,
        gravityYDecay,
        gravityXMax,
        gravityYMax,
        x,
        y,
      } = this;

      this.scale = scale * scaleDecay;
      this.velocityX = velocityX * velocityDecayX;
      this.velocityY = velocityY * velocityDecayY;
      this.gravityX = min(gravityX * gravityXDecay, gravityXMax);
      this.gravityY = min(gravityY * gravityYDecay, gravityYMax);
      this.x = x + this.velocityX + this.gravityX;
      this.y = y + this.velocityY + this.gravityY;
      this.update();
    }
  }

  rotation() {
    return 0;
  }

  shouldRemove() {
    return true;
  }
}

Particle.incrementFormation = () => 0;

export default Particle;
