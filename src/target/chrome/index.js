import "./manifest.json";
import "./icon-16.png";
import "./icon-32.png";
import "./icon-48.png";
import "./icon-128.png";

const {
  runtime: { onInstalled },
  storage: { local }
} = chrome;

onInstalled.addListener(() => local.set({ mode: "off" }));
