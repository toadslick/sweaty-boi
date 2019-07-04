import "./manifest.json";
import "./icon-16.png";
import "./icon-32.png";
import "./icon-48.png";
import "./icon-128.png";

import Runner from "../../lib/runner";

import { getMode, onModeChanged } from "../../utils/browser-utils";

if (!window.sweatyboiInitialized) {
  window.sweatyboiInitialized = true;

  const runner = new Runner();

  getMode(runner.mode);

  onModeChanged(runner.mode);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      getMode(runner.mode);
    } else if (document.visibilityState === "hidden") {
      runner.clear();
      runner.stop();
    }
  });
}
