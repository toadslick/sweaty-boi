import "./manifest.json";

import Runner from "../../lib/runner";

import { getMode, onModeChanged } from "../../utils/browser-utils";

const runner = new Runner();

getMode(runner.mode);

onModeChanged(runner.mode);

window.onFocus = () => getMode(runner.mode);
