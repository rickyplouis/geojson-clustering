const fs = require('fs');

const getRandomFloat = require('./getRandomFloat');
const n = 100

// chicago 41.8781° N, 87.6298° W
// st louis 38.6270° N, 90.1994° W
const maxLat = 41.8781;
const minLat = 38.6270;

const maxLng = -87.6298;
const minLng = -90.1994;
let data = [];

for (var x = 0; x < n; x++) {
  const datapoint = {
        "geometry": {
            "type": "Point",
            "coordinates": [
                getRandomFloat(minLng, maxLng),
                getRandomFloat(minLat, maxLat)
            ]
        },
        "type": "Feature",
        "properties": {
          "title": "index of " + x,
          "marker-symbol": 'suitcase',
        }
    }
  data.push(datapoint)
}

module.exports = {
  maxLat,
  minLat,
  maxLng,
  minLng,
  data
};
