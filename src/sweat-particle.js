import { angle } from "./utils";
import Particle from "./particle";

export default class SweatParticle extends Particle {
  config() {
    this.styles = {
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      transformOrigin: "center bottom",
      backgroundImage: `url("data:image/svg+xml;utf8,<svg width='51' height='99' xmlns='http://www.w3.org/2000/svg'><path id='svg_1' d='m26.52525,0c0,0 -26.52525,40.37214 -26.52525,73.02986c0,32.65772 50.5,35.74348 50.5,1.80003c0,-33.94345 -19.63889,-69.68695 -23.97475,-74.8299z' fill='#07b0ff'/></svg>"`
    };

    this.originOffset = 30;
    this.scaleDecay = 0.99;
    this.velocityMultiplier = 10;
    this.velocityScatter = 10;
    this.velocityDecayX = 0.96;
    this.velocityDecayY = 0.96;
    this.gravityX = 0;
    this.gravityXDecay = 0;
    this.gravityXMax = 0;
    this.gravityY = 1;
    this.gravityYDecay = 1.05;
    this.gravityYMax = 10;
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

  shouldRemove() {
    return this.scale < 0.1;
  }
}
