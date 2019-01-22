const fs = require('fs');
const index = require('./index');
const constants = require('./src/constants');
const random = require('./src/random');

const { minimumLat, minimumLng, maximumLat, maximumLng, numOfAddresses } = constants;
const { writeClustersToFile } = index;
const { makeMockData } = random;

const startingCoords = { minimumLat, minimumLng, maximumLat, maximumLng };
const mockData = makeMockData(numOfAddresses, startingCoords);

let res = writeClustersToFile(mockData);

writeClustersToFile('./stations.geojson');

fs.writeFile('output/isVariable.geojson', JSON.stringify(res), err => {
  if (err) throw err;
});
