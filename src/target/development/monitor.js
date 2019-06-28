export default class DevelopmentMonitor {
  constructor() {
    this.activityEl = document.getElementById("sweatyboi-activity");
    this.vectorEl = document.getElementById("sweatyboi-vector");
    this.countEl = document.getElementById("sweatyboi-count");
  }

  activity(rate, max) {
    this.activityEl.style.width = `${(rate / max) * 100}%`;
  }

  vector(angle, velocity) {
    this.vectorEl.style.width = `${velocity}px`;
    this.vectorEl.style.transform = `rotate(${angle}deg)`;
  }

  count(count) {
    this.countEl.textContent = " • ".repeat(count);
  }
}
