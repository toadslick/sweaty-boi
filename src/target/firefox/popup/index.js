import "./index.scss";

import { onRadioSelected } from "../../utils";

const {
  tabs: { query, sendMessage }
} = browser;

onRadioSelected("body", value =>
  query({ active: true, currentWindow: true }).then(tabs =>
    sendMessage(tabs[0].id, { command: value })
  )
);
