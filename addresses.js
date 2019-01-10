const fs = require('fs');

const getRandomInt = require('./getRandomInt');
const n = 100
const maxLat = 30;
const maxLng = 30;
const minLat = 0;
const minLng = 0;
let data = [];

for (var x = 0; x < n; x++) {
  data.push({lat: getRandomInt(minLat, maxLat), lng: getRandomInt(minLng, maxLng)})
}

const json = JSON.stringify(data);
fs.writeFile('test.json', json, (err) => {
  if (err) throw err;
  console.log('complete');
});

module.exports = data;
