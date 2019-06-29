import Runner from "../../lib/runner";
import Monitor from "./monitor";
import { onRadioSelected } from "../utils";

import "./index.scss";

const runner = new Runner(Monitor);
const main = document.querySelector("#sweatyboi-main");

onRadioSelected("#sweatyboi-mode-select", value => {
  runner.mode(value);
  main.scrollIntoView({ behavior: "smooth" });
});
