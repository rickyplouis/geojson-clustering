const random = require('../src/random');
const { getRandomColor, getRandomFloat } = random;

test('test random float generator', () => {
  expect(getRandomFloat(1, 2)).toBeGreaterThan(1);
  expect(getRandomFloat(1, 2)).toBeLessThan(2);
  expect(getRandomFloat(-10, -20)).toBeLessThan(-10);
  expect(getRandomFloat(-10, -20)).toBeGreaterThan(-20);
});

test('test random color generator', () => {
  expect(typeof getRandomColor()).toBe('string');
  expect(getRandomColor().length).toBe(7);
});
