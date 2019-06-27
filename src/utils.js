const { abs, atan2, PI, sqrt, sin, cos, floor, random } = Math;

const sq = x => x ** 2;

const degrees = rad => (180 / PI) * rad;

const radians = deg => (deg * PI) / 180;

const distance = (x1, y1, x2, y2) => abs(sqrt(sq(x2 - x1) + sq(y2 - y1)));

const angle = (x1, y1, x2, y2) => degrees(atan2(y2 - y1, x2 - x1));

const average = numbers =>
  numbers.length ? numbers.reduce((a, b) => a + b, 0) / numbers.length : 0;

const vector = (deg, vel) => ({
  x: vel * cos(radians(deg)),
  y: vel * sin(radians(deg)),
});

const sample = array => array[floor(random() * array.length)];

export { distance, angle, average, vector, sample };
