import Runner from "../../lib/runner";
import Monitor from "./monitor";
import onRadioSelected from "../../utils/on-radio-selected";

import "./index.scss";
import "./chrome-logo.svg";
import "./firefox-logo.svg";
import "./site-image.png";

const runner = new Runner(Monitor);

const main = document.querySelector("#sweatyboi-main");
const select = document.querySelector("#sweatyboi-mode-select");
const meter = document.querySelector("#sweatyboi-activity-meter");

const setSelectedRadio = onRadioSelected("#sweatyboi-mode-select", value => {
  const className = "sweatyboi-visible";
  if (value === "sweat") {
    meter.classList.add(className);
  } else {
    meter.classList.remove(className);
  }
  runner.mode(value);
  main.scrollIntoView({ behavior: "smooth" });
});

setSelectedRadio("off");
select.scrollIntoView();
