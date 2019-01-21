const cluster = require('../src/cluster');

const { makeDatapoint, centroidsEqual } = cluster;

const testDP = {
  geometry: {
    type: 'Point',
    coordinates: [0, 0]
  }
};

const firstCentroid = [makeDatapoint(0, 0)];
const secondCentroid = [makeDatapoint(0, 1)];
const thirdCentroid = [makeDatapoint(1, 1)];

test('makeDatapoint', () => {
  expect(makeDatapoint(0, 0)).toMatchObject(testDP);
});

test('centroidsEqual', () => {
  expect(centroidsEqual(firstCentroid, firstCentroid)).toBe(true);
  expect(centroidsEqual(firstCentroid, secondCentroid)).toBe(false);
  expect(centroidsEqual(firstCentroid, thirdCentroid)).toBe(false);
});
