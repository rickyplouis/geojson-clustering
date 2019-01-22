const fs = require('fs');
const random = require('./src/random');
const cluster = require('./src/cluster');
const constants = require('./src/constants');

const { maximumLat, maximumLng, minimumLat, minimumLng, numOfAddresses } = constants;

const { getRandomColor, makeMockData } = random;
const { clusterAnalysis } = cluster;

const tagClustersWithColor = clusters => {
  let colors = [];

  for (var x = 0; x < clusters.length; x++) {
    colors.push(getRandomColor());
  }

  return clusters.map((cluster, index) => {
    return cluster.map(datapoint => {
      datapoint.properties['marker-color'] = colors[index];
      return datapoint;
    });
  });
};

const makeGEOJSON = clusters => {
  let json = {
    type: 'FeatureCollection',
    features: []
  };
  clusters.map(cluster => {
    return cluster.map(datapoint => {
      json.features.push(datapoint);
      return json;
    });
  });
  return json;
};

const writeGEOJSON = untaggedClusters => {
  let taggedClusters = tagClustersWithColor(untaggedClusters);

  let geojson = makeGEOJSON(taggedClusters);
  if (!fs.existsSync('output')) {
    fs.mkdirSync('output');
  }

  fs.writeFile('output/output.geojson', JSON.stringify(geojson), err => {
    if (err) throw err;
  });
};

const isTypeOfFilePath = inputVar =>
  typeof inputVar === 'string' &&
  (inputVar.indexOf('.json') > 0 || inputVar.indexOf('.geojson') > 0);

const writeClustersToFile = (inputData = '', k = 3, maxIterations = 1000) => {
  // If no file args then use mock data
  if (inputData.length === 0) {
    // Use mock file to create input geojson file
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
    if (isTypeOfFilePath(inputData)) {
      // Else there are args so use input inputData
      const inputFile = JSON.parse(fs.readFileSync(inputData));
      const clusterData = inputFile.features;
      writeGEOJSON(clusterAnalysis(k, clusterData, maxIterations));
    }

    if (typeof inputData === 'object') {
      let clusters = tagClustersWithColor(
        clusterAnalysis(k, inputData.features, maxIterations)
      );
      let stringifiedGEOJSON = JSON.stringify(makeGEOJSON(clusters));
      fs.writeFile('output/output.geojson', stringifiedGEOJSON, err => {
        if (err) throw err;
      });
    }
  }
};

const createClusters = (inputData = '', k = 3, maxIterations = 1000) => {
  if (isTypeOfFilePath(inputData)) {
    // Else there are args so use input inputData
    const inputFile = JSON.parse(fs.readFileSync(inputData));

    let clusters = tagClustersWithColor(
      clusterAnalysis(k, inputFile.features, maxIterations)
    );
    return makeGEOJSON(clusters);
  }

  if (typeof inputData === 'object') {
    let clusters = tagClustersWithColor(
      clusterAnalysis(k, inputData.features, maxIterations)
    );
    return makeGEOJSON(clusters);
  }
};

module.exports = {
  writeClustersToFile,
  createClusters
};
