export default class PublicMonitor {
  constructor() {
    this.activityEl = document.querySelector("#sweatyboi-activity-meter div");
  }

  activity(rate, max) {
    const height = 100 - (rate / max) * 100;
    this.activityEl.style.height = `${height}%`;
  }

  vector() {}

  count() {}
}
