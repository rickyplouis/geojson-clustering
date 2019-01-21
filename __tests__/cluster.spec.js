const cluster = require('../src/cluster');

const { makeDatapoint } = cluster;

const testDP = {
  geometry: {
    type: 'Point',
    coordinates: [0, 0]
  }
};

test('makeDatapoint', () => {
  expect(makeDatapoint(0, 0)).toMatchObject(testDP);
});
