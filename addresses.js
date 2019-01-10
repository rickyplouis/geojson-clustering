const fs = require('fs');

const getRandomFloat = require('./getRandomFloat');
const n = 100
const maxLat = 30;
const maxLng = 30;
const minLat = 0;
const minLng = 0;
let data = [];

for (var x = 0; x < n; x++) {
  data.push({lat: getRandomFloat(minLat, maxLat), lng: getRandomFloat(minLng, maxLng)})
}

module.exports = data;
