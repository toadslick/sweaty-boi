const SIZE = 50;
const TAG_NAME = "div";

const privateStyles = {
  position: "fixed",
  left: `${-1 * SIZE}px`,
  top: `${-1 * SIZE}px`,
  height: `${SIZE}px`,
  width: `${SIZE}px`
};

export default class Particle {
  customStyles = {
    backgroundColor: "cyan",
    borderRadius: "50px"
  };

  constructor(container, originX, originY, angle, velocity, scale) {
    this.x = originX;
    this.y = originY;
    this.angle = angle;
    this.velocity = velocity;
    this.scale = scale;
    this.element = document.createElement(TAG_NAME);

    const styles = { ...customStyles, ...privateStyles };
    for (key in styles) {
      console.log(key, styles[key]);
    }

    this.update();
  }
}
