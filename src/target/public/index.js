import Runner from "../../runner";

import "./index.scss";

const ALL_RADIOS_SELECTOR = "#sweatyboi-mode-select input";
const CHECKED_RADIO_SELECTOR = "#sweatyboi-mode-select input:checked";
const MAIN_CONTENT_SELECTOR = "#sweatyboi-main";

const runner = new Runner();

const onModeChanged = () => {
  const radio = document.querySelector(CHECKED_RADIO_SELECTOR);
  const main = document.querySelector(MAIN_CONTENT_SELECTOR);
  runner.mode(radio.value);
  main.scrollIntoView({ behavior: "smooth" });
};

const radios = document.querySelectorAll(ALL_RADIOS_SELECTOR);
radios.forEach(radio => radio.addEventListener("change", onModeChanged));
