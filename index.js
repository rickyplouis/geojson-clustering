const k = 2;
const data = require('./addresses');
const getRandomInt = require('./getRandomInt');

const getMin = (coords, prop) => {
  return coords.reduce((min, acc) => acc[prop] < min ? acc[prop] : min, coords[0][prop])
}

const getMax = (coords, prop) => {
  return coords.reduce((max, acc) => acc[prop] > max ? acc[prop] : max, coords[0][prop])
}

const initializeCentroids = (n, data) => {
  const centroids = [];
  for ( var x = 0; x < n; x += 1) {
    centroids.push(
      {
        lat: getRandomInt(getMin(data, 'lat'), getMax(data, 'lat')),
        lng: getRandomInt(getMin(data, 'lng'), getMax(data, 'lng')),
      }
    )
  }
  return centroids;
}

console.log('initializeCentroids', initializeCentroids(k, data));
