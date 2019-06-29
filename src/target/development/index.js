import Runner from "../../runner";
import Monitor from "./monitor";

import "./index.scss";

const runner = new Runner(Monitor);

const select = document.getElementById("mode-select");
const onSelectChanged = () => runner.mode(select.value);
select.addEventListener("change", onSelectChanged);

onSelectChanged();
