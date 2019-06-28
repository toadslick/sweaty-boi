import { sample } from "../utils";
import Particle from "./base";

const ROTATION_SCATTER = 20;
const PARTICLE_COUNT = 3;
const MINIMUM_VELOCITY = 0.1;

class GlistenParticle extends Particle {
  config() {
    const colors = [
      "orange",
      "gold",
      "yellow",
      "lightsalmon",
      "lightpink",
      "hotpink",
      "peachpuff",
      "violet",
      "plum"
    ];

    this.styles = {
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><path id="svg_1" d="m50.62503,0.75051c9.1247,39.08275 6.24947,42.41591 48.12397,50.749c-40.83301,5.08326 -40.66628,11.16652 -47.24953,47.74949c-9.24989,-37.08302 -9.99991,-41.66627 -49.74949,-48.24953c39.20812,-6.5831 42.91657,-11.6662 48.87505,-50.24896z" stroke-width="1.5" fill="${sample(
        colors
      )}"/></svg>'`
    };

    this.originOffset = 20;
    this.scaleDecay = 0.98;
    this.velocityScatter = 1;
    this.velocityDecayX = 0.99;
    this.velocityDecayY = 0.99;
    this.scaleScatter = 0.5;

    this.rotationRate = (Math.random() - 0.5) * ROTATION_SCATTER;
    this.rotationValue = this.rotationRate;
  }

  rotation() {
    this.rotationValue = this.rotationValue + this.rotationRate;
    return this.rotationValue;
  }
}

GlistenParticle.incrementFormation = (rate, velocity) =>
  velocity > MINIMUM_VELOCITY ? PARTICLE_COUNT : 0;

export default GlistenParticle;
