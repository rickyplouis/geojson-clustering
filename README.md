
## geojson-clustering [![Build Status](https://travis-ci.org/rickyplouis/geojson-clustering.svg?branch=master)](https://travis-ci.org/rickyplouis/geojson-clustering) [![Coverage Status](https://coveralls.io/repos/github/rickyplouis/geojson-clustering/badge.svg?branch=master)](https://coveralls.io/github/rickyplouis/geojson-clustering?branch=master) [![npm version](https://badge.fury.io/js/geojson-clustering.svg)](https://badge.fury.io/js/geojson-clustering)

### What is geojson-clustering
A tool built to allow k-means clustering of geojson data.

##### Note: A primer of geojson can be found  [here](http://geojson.org/)

### Installation
```
$ npm i geojson-clustering
```

### Example

```javascript
const geoclustering = require(geojson-clustering);

const { writeClustersToFile, createClusters } = geoclustering

// writeClustersToFile generates a new file
// at location output/output.geoson

// createClusters returns raw .json data

/* Run without params to generate fake data */
writeClustersToFile();

/* Run with existing geojson file*/
writeClustersToFile(pathToFile, numClusters, maxIterations);

createClusters(pathToFile, numClusters, maxIterations);

/* Run with .geojson data*/
writeClustersToFile(geojsonData, numClusters, maxIterations);

createClusters(geojsonData, numClusters, maxIterations);
```
## Methods
### createClusters(geojson, k, maxIter)
* geojson- Can be either a filepath to a .geojson file or a JSON object
* k- number of clusters (default: 3)
* maxIter- maximum number of iterations for the centroid algorithm (default: 1000)
### writeClustersToFile(geojson, k, maxIter)
* geojson- Can be either a filepath to a .geojson file or a JSON object
* k- number of clusters (default: 3)
* maxIter- maximum number of iterations for the centroid algorithm (default: 1000)

#### You can use sample .geojson data located [here](https://github.com/rickyplouis/geojson-clustering/tree/master/sampleData)
