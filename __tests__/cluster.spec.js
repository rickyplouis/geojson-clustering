const cluster = require('../src/cluster');
const random = require('../src/random');

const { getRandomFloat } = random;
const {
  makeDatapoint,
  centroidsEqual,
  makeRandomCentroid,
  makeClusters,
  initializeCentroids
} = cluster;

const testDP = {
  geometry: {
    type: 'Point',
    coordinates: [0, 0]
  }
};

const createRandomData = () => {
  let data = [];
  for (let x = 0; x < 100; x++) {
    data.push(makeDatapoint(getRandomFloat(0, 1), getRandomFloat(0, 1)));
  }

  return data;
};

const firstCentroid = [makeDatapoint(0, 0)];
const secondCentroid = [makeDatapoint(0, 1)];
const thirdCentroid = [makeDatapoint(1, 1)];

test('makeDatapoint()', () => {
  expect(makeDatapoint(0, 0)).toMatchObject(testDP);
});

test('centroidsEqual()', () => {
  expect(centroidsEqual(firstCentroid, firstCentroid)).toBe(true);
  expect(centroidsEqual(firstCentroid, secondCentroid)).toBe(false);
  expect(centroidsEqual(firstCentroid, thirdCentroid)).toBe(false);
});

test('makeRandomCentroid()', () => {
  expect(makeRandomCentroid(0, 0, 100, 100)).toHaveProperty('geometry');
  expect(makeRandomCentroid(0, 0, 100, 100).geometry).toHaveProperty('coordinates');
  expect(makeRandomCentroid(0, 0, 100, 100).geometry).toHaveProperty('type', 'Point');
  expect(makeRandomCentroid(0, 0, 100, 100).geometry).toHaveProperty('type', 'Point');
});

test('makeClusters()', () => {
  let testClusters = makeClusters(
    [firstCentroid, secondCentroid, thirdCentroid],
    createRandomData()
  );
  for (let cluster of testClusters) {
    if (cluster.length === 0) {
      expect(cluster).toEqual([]);
    } else {
      expect(cluster[0]).toHaveProperty('geometry');
    }
  }

  expect(makeClusters()).toEqual([]);
  expect(testClusters.length).toBe(3);
});

test('initializeCentroids()', () => {
  let initCentroids = initializeCentroids(3, createRandomData());
  expect(initCentroids.length).toBe(3);
  expect(initCentroids[0]).toHaveProperty('geometry');
  expect(initCentroids[0].geometry).toHaveProperty('coordinates');
  expect(initCentroids[0].geometry.coordinates[0]).toBeGreaterThanOrEqual(0);
  expect(initCentroids[0].geometry.coordinates[0]).toBeLessThanOrEqual(1);
});
