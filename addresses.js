const fs = require('fs');

const getRandomFloat = require('./getRandomFloat');
const numOfAddresses = 50

// trice coords
// 41.8766389,-87.6505024
// bedford park
// 41.7733706,-87.7832374

const maxLat = 41.8766389;
const minLat = 41.7733706;

const maxLng = -87.6505024;
const minLng = -87.7832374;
let data = [];

for (var x = 0; x < numOfAddresses; x++) {
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
