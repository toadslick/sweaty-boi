import { angle, sample } from "./utils";
import Particle from "./particle";

const FORMATION_UNIT = 1.5 / 10000;

class SweatParticle extends Particle {
  config() {
    const colors = [
      "skyblue",
      "lightskyblue",
      "darkturquoise",
      "paleturquoise",
      "deepskyblue",
      "dodgerblue"
    ];

    this.styles = {
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      transformOrigin: "center bottom",
      backgroundImage: `url("data:image/svg+xml;utf8,<svg width='51' height='99' xmlns='http://www.w3.org/2000/svg'><path id='svg_1' d='m26.52525,0c0,0 -26.52525,40.37214 -26.52525,73.02986c0,32.65772 50.5,35.74348 50.5,1.80003c0,-33.94345 -19.63889,-69.68695 -23.97475,-74.8299z' fill='${sample(
        colors
      )}'/></svg>"`
    };

    this.originOffset = 30;
    this.scaleDecay = 0.99;
    this.scaleScatter = 0.3;
    this.velocityMultiplier = 10;
    this.velocityScatter = 10;
    this.velocityDecayX = 0.98;
    this.velocityDecayY = 0.96;
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
}

SweatParticle.incrementFormation = rate => rate * FORMATION_UNIT;

export default SweatParticle;
