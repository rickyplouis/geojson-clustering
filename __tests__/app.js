const getRandomFloat = require('../getRandomFloat');

test('adds numbers', () => {
  expect(getRandomFloat(1, 2)).toBeGreaterThan(1);
  expect(getRandomFloat(1, 2)).toBeLessThan(2);
});
