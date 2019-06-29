import Runner from "../../lib/runner";

import "./manifest.json";

const runner = new Runner();

browser.runtime.onMessage.addListener(({ command }) => {
  runner.mode(command);
});
