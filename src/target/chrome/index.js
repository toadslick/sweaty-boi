import "./manifest.json";
import "./icon-16.png";
import "./icon-32.png";
import "./icon-48.png";
import "./icon-128.png";

const {
  runtime: { onInstalled },
  declarativeContent: { PageStateMatcher, ShowPageAction, onPageChanged }
} = chrome;

onInstalled.addListener(() => {
  onPageChanged.removeRules(undefined, () => {
    onPageChanged.addRules([
      {
        conditions: [
          new PageStateMatcher({
            pageUrl: { hostEquals: "developer.chrome.com" }
          })
        ],
        actions: [new ShowPageAction()]
      }
    ]);
  });
});
