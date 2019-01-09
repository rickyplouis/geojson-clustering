const getRandomInt = require('./getRandomInt');
const n = 30
const maxLat = 30;
const maxLng = 30;
const minLat = 0;
const minLng = 0;
let data = [];

const euclideanDistance = (coordA, coordB) => {
  return Math.sqrt(Math.pow(coordA.lat - coordB.lat, 2) + Math.pow(coordA.lng - coordB.lng, 2))
}


for (var x = 0; x < n; x++) {
  data.push({lat: getRandomInt(minLat, maxLat), lng: getRandomInt(minLng, maxLng)})
}

module.exports = data;
