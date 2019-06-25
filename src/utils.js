const distance = (x1, y1, x2, y2) =>
  Math.abs(((x1 - x2) ** 2 + (y1 - y2) ** 2) ** 0.5);

const angle = (x1, y1, x2, y2) =>
  360 - (180 / Math.PI) * Math.atan2(x1 - x2, y1 - y2);

const average = numbers => numbers.reduce((a, b) => a + b, 0) / numbers.length;

export { distance, angle, average };
