const SIZE = 50;
const TAG_NAME = "div";

const privateStyles = {
  position: "fixed",
  // left: `${-1 * SIZE}px`,
  // top: `${-1 * SIZE}px`,
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

  constructor(originX = 0, originY = 0, angle = 0, velocity = 0, scale = 1) {
    this.x = originX;
    this.y = originY;
    this.angle = angle;
    this.velocity = velocity;
    this.scale = scale;
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
    this.element.style.transform = `scale(${this.scale})`;
    this.element.style.left = `${this.x - SIZE / 2}px`;
    this.element.style.top = `${this.y - SIZE / 2}px`;
  }

  decay() {
    this.scale = this.scale * this.scaleDecay;
  }

  shouldDismount() {
    return this.scale < 0.1;
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
}
