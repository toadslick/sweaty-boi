import Runner from "../../lib/runner";
import Monitor from "./monitor";
import onRadioSelected from "../../utils/on-radio-selected";

import "./index.scss";

const runner = new Runner(Monitor);

const main = document.querySelector("#sweatyboi-main");
const select = document.querySelector("#sweatyboi-mode-select");
const meter = document.querySelector("#sweatyboi-activity-meter");

const setSelectedRadio = onRadioSelected("#sweatyboi-mode-select", value => {
  runner.mode(value);
  meter.style.display = value === "sweat" ? "block" : "none";
  main.scrollIntoView({ behavior: "smooth" });
});

setSelectedRadio("off");
select.scrollIntoView();
