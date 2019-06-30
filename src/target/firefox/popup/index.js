import "./index.scss";
import "./icon.svg";

import { setMode, getMode, onModeChanged } from "../../../utils/browser-utils";
import onRadioSelected from "../../../utils/on-radio-selected";

const setSelectedRadio = onRadioSelected("body", setMode);

getMode(setSelectedRadio);

onModeChanged(setMode);
