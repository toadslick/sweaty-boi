import Runner from "./runner";
import DevelopmentMonitor from "./monitors/development";
import GlistenParticle from "./particles/glisten";
import SweatParticle from "./particles/sweat";

const runner = new Runner(GlistenParticle, DevelopmentMonitor);

runner.start();
