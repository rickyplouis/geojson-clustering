const random = require('../src/random');
const { getRandomColor, getRandomFloat, makeMockData } = random;

test('test getRandomFloat()', () => {
  expect(getRandomFloat(1, 2)).toBeGreaterThan(1);
  expect(getRandomFloat(1, 2)).toBeLessThan(2);
  expect(getRandomFloat(-10, -20)).toBeLessThan(-10);
  expect(getRandomFloat(-10, -20)).toBeGreaterThan(-20);
});

test('test getRandomColor()', () => {
  expect(typeof getRandomColor()).toBe('string');
  expect(getRandomColor().length).toBe(7);
});

test('test makeMockData()', () => {
  let testMock = {
    type: 'FeatureCollection',
    features: []
  };

  let coords = {
    minimumLat: 1,
    minimumLng: 1,
    maximumLat: 10,
    maximumLng: 10
  };

  expect(makeMockData()).toMatchObject(testMock);
  expect(makeMockData(100, {}).features.length).toEqual(100);
  expect(
    makeMockData(100, coords).features[0].geometry.coordinates[0]
  ).toBeGreaterThanOrEqual(1);
  expect(
    makeMockData(100, coords).features[0].geometry.coordinates[0]
  ).toBeLessThanOrEqual(10);
});
