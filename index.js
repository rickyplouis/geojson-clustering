const n = 30
const k = 2;
const maxLat = 30;
const maxLng = 30;
const minLat = 0;
const minLng = 0;

let data = [];
const euclideanDistance = (coordA, coordB) => {
  return Math.sqrt(Math.pow(coordA.lat - coordB.lat, 2) + Math.pow(coordA.lng - coordB.lng, 2))
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

for (var x = 0; x < n; x++) {
  data.push({lat: getRandomInt(0, maxLat), lng: getRandomInt(0, maxLng)})
}

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
