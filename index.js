const fs = require('fs');
const random = require('./random');
const cluster = require('./cluster');
const constants = require('./constants');

const {
  maximumLat,
  maximumLng,
  minimumLat,
  minimumLng,
  kClusters,
  numOfAddresses,
  maxIterations
} = constants;

const { getRandomColor, getRandomFloat } = random;
const { clusterAnalysis } = cluster;

// Trice coords
// 41.8766389,-87.6505024
// bedford park
// 41.7733706,-87.7832374

const makeMockData = (numAddresses, initCoords) => {
  let data = [];
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
    data.push(datapoint);
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

const getCmdClusters = args => {
  for (let arg of args) {
    if (arg.indexOf('clusters=') >= 0) {
      return parseInt(arg.substring('clusters='.length), 10);
    }

    if (arg.indexOf('cluster=') >= 0) {
      return parseInt(arg.substring('clusters='.length), 10);
    }
  }

  return false;
};

const getCmdIterations = args => {
  for (let arg of args) {
    if (arg.indexOf('max=') >= 0) {
      return parseInt(arg.substring('max='.length), 10);
    }
  }

  return false;
};

const main = () => {
  // If no file args then use mock data
  if (process.argv.length === 2) {
    // Use mock addresses to create input geojson file
    const startingCoords = { minimumLat, minimumLng, maximumLat, maximumLng };
    let mockData = JSON.stringify(makeMockData(numOfAddresses, startingCoords));
    if (!fs.existsSync('output')) {
      fs.mkdirSync('output');
    }

    fs.writeFile('output/input.geojson', mockData, err => {
      if (err) throw err;
      const inputData = JSON.parse(fs.readFileSync('output/input.geojson'));
      writeGEOJSON(clusterAnalysis(kClusters, inputData, maxIterations));
    });
  } else {
    const inputFile = JSON.parse(fs.readFileSync(process.argv[2]));
    // Else there are args so use input filepath
    const inputData = inputFile.features;
    const inputClusters = getCmdClusters(process.argv)
      ? getCmdClusters(process.argv)
      : kClusters;

    const inputIterations = getCmdIterations(process.argv)
      ? getCmdIterations(process.argv)
      : maxIterations;

    writeGEOJSON(clusterAnalysis(inputClusters, inputData, inputIterations));
  }
};

main();
