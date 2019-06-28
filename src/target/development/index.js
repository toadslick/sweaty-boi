import Runner from "../../runner";
import DevelopmentMonitor from "./monitor";

const runner = new Runner(DevelopmentMonitor);

const select = document.getElementById("mode-select");
const onSelectChanged = () => runner.mode(select.value);
select.addEventListener("change", onSelectChanged);

onSelectChanged();
