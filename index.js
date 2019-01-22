const fs = require('fs');
const random = require('./src/random');
const cluster = require('./src/cluster');
const constants = require('./src/constants');

const { maximumLat, maximumLng, minimumLat, minimumLng, numOfAddresses } = constants;

const { getRandomColor, getRandomFloat } = random;
const { clusterAnalysis } = cluster;

// Trice coords
// 41.8766389,-87.6505024
// bedford park
// 41.7733706,-87.7832374

const makeMockData = (numAddresses, initCoords) => {
  let data = {
    type: 'FeatureCollection',
    features: []
  };
  const { minimumLat, minimumLng, maximumLat, maximumLng } = initCoords;
  for (var x = 0; x < numAddresses; x++) {
    const datapoint = {
      geometry: {
        type: 'Point',
        coordinates: [
          getRandomFloat(minimumLng, maximumLng),
          getRandomFloat(minimumLat, maximumLat)
        ]
      },
      type: 'Feature',
      properties: {
        title: 'index of ' + x,
        'marker-symbol': 'suitcase'
      }
    };
    data.features.push(datapoint);
  }

  return data;
};

const writeGEOJSON = clusters => {
  let json = {
    type: 'FeatureCollection',
    features: []
  };

  let colors = [];

  for (var x = 0; x < clusters.length; x++) {
    colors.push(getRandomColor());
  }

  clusters.map((cluster, index) => {
    if (cluster.length > 0) {
      for (let dp of cluster) {
        dp.properties['marker-color'] = colors[index];
        json.features.push(dp);
      }
    }

    return cluster;
  });

  fs.writeFile('output/output.geojson', JSON.stringify(json), err => {
    if (err) throw err;
  });
};

const writeClustersToFile = (filepath = '', k = 3, maxIterations = 1000) => {
  // If no file args then use mock data
  if (filepath.length === 0) {
    // Use mock addresses to create input geojson file
    const startingCoords = { minimumLat, minimumLng, maximumLat, maximumLng };
    let mockData = JSON.stringify(makeMockData(numOfAddresses, startingCoords));
    if (!fs.existsSync('output')) {
      fs.mkdirSync('output');
    }

    fs.writeFile('output/input.geojson', mockData, err => {
      if (err) throw err;
      const inputData = JSON.parse(fs.readFileSync('output/input.geojson'));
      writeGEOJSON(clusterAnalysis(k, inputData.features, maxIterations));
    });
  } else {
    // Else there are args so use input filepath
    const inputFile = JSON.parse(fs.readFileSync(filepath));
    const inputData = inputFile.features;
    writeGEOJSON(clusterAnalysis(k, inputData, maxIterations));
  }
};

module.exports = {
  writeClustersToFile
};
