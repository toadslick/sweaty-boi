import Runner from "./runner";
import DevelopmentMonitor from "./monitors/development";
import GlistenParticle from "./particles/glisten";
import SweatParticle from "./particles/sweat";

new Runner(GlistenParticle, DevelopmentMonitor);
