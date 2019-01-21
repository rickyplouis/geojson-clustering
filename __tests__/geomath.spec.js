const geomath = require('../src/geomath');
const { euclideanDistance, getLat, getLng, getMin, getMax } = geomath;

const goodCoord = {
  geometry: {
    type: 'Point',
    coordinates: [3, 4]
  }
};

const goodCoordToo = {
  geometry: {
    type: 'Point',
    coordinates: [0, 0]
  }
};

const badCoord = {
  type: 'Point',
  coordinates: [0, 1]
};

test('getCoords', () => {
  expect(getLat(goodCoord)).toBe(4);
  expect(getLng(goodCoord)).toBe(3);
  expect(getLat(badCoord)).toBe(0);
  expect(getLng(badCoord)).toBe(0);
});

test('euclideanDistance', () => {
  expect(euclideanDistance(goodCoord, goodCoord)).toBe(0);
  expect(euclideanDistance(goodCoord, goodCoordToo)).toBe(5);
  expect(euclideanDistance()).toBe(0);
});

test('getMin', () => {
  expect(getMin([goodCoord, goodCoordToo], 'lat')).toBe(0);
  expect(getMin([goodCoord, goodCoordToo], 'lng')).toBe(0);
  expect(getMin()).toBe(0);
});

test('getMax', () => {
  expect(getMax([goodCoord, goodCoordToo], 'lat')).toBe(4);
  expect(getMax([goodCoord, goodCoordToo], 'lng')).toBe(3);
  expect(getMax()).toBe(0);
});
