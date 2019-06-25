const { abs, atan2, PI, sqrt } = Math;

const sq = x => x ** 2;

const deg = rad => (180 / PI) * rad;

const distance = (x1, y1, x2, y2) => abs(sqrt(sq(x2 - x1) + sq(y2 - y1)));

const angle = (x1, y1, x2, y2) => deg(atan2(y2 - y1, x2 - x1));

const average = numbers =>
  numbers.length ? numbers.reduce((a, b) => a + b, 0) / numbers.length : 0;

export { distance, angle, average };
