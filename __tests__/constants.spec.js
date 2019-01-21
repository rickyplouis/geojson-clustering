const constants = require('../src/constants');

const {
  maximumLat,
  minimumLat,
  maximumLng,
  minimumLng,
  kClusters,
  numOfAddresses,
  maxIterations
} = constants;

test('ensure all constants exist', () => {
  expect(typeof maximumLat).toBe('number');
  expect(typeof minimumLat).toBe('string');
  expect(typeof maximumLng).toBe('number');
  expect(typeof minimumLng).toBe('number');
  expect(typeof kClusters).toBe('number');
  expect(typeof numOfAddresses).toBe('number');
  expect(typeof maxIterations).toBe('number');
});
