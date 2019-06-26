import { vector, angle } from "./utils";

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
  customStyles = {
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    transformOrigin: "center bottom",
    backgroundImage: `url("data:image/svg+xml;utf8,<svg width='51' height='99' xmlns='http://www.w3.org/2000/svg'><path id='svg_1' d='m26.52525,0c0,0 -26.52525,40.37214 -26.52525,73.02986c0,32.65772 50.5,35.74348 50.5,1.80003c0,-33.94345 -19.63889,-69.68695 -23.97475,-74.8299z' fill='#07b0ff'/></svg>"`
  };

  scaleDecay = 0.99;
  scaleScatterMultiplier = 0.1;
  velocityMultiplier = 10;
  velocityScatter = 10;
  velocityDecayX = 0.96;
  velocityDecayY = 0.96;
  gravityX = 0;
  gravityXDecay = 0;
  gravityXMax = 0;
  gravityY = 1;
  gravityYDecay = 1.05;
  gravityYMax = 10;

  constructor(originX = 0, originY = 0, angle = 0, velocity = 0, scale = 1) {
    const {
      scaleScatterMultiplier,
      velocityMultiplier,
      velocityScatter,
      originOffsetDistance
    } = this;
    const { x: vx, y: vy } = vector(angle, velocity * velocityMultiplier);
    this.x = originX + SIZE / 2;
    this.y = originY + SIZE / 2;
    this.velocityX = vx + (Math.random() - 0.5) * velocityScatter;
    this.velocityY = vy + (Math.random() - 0.5) * velocityScatter;
    this.scale = scale + (Math.random() + 0.5) * scaleScatterMultiplier;
    this.element = document.createElement(TAG_NAME);
    this.removed = false;

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
    if (this.shouldDismount()) {
      document.body.removeChild(this.element);
      this.removed = true;
    } else {
      this.decay();
      this.update();
    }
  }

  decay() {
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
  }

  rotation() {
    return (
      angle(
        0,
        0,
        this.velocityX + this.gravityX,
        this.velocityY + this.gravityY
      ) - 90
    );
  }

  shouldDismount() {
    return this.scale < 0.1;
  }
}
