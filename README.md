

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
const geoclustering = require('geojson-clustering');
const { createClusters, writeClustersToFile } = geoclustering;

const filepath = './sampleData.geojson';

/*
 * geojson object must follow GEOJSON spec outlined
 * here: https://tools.ietf.org/html/rfc7946
 */
const samplegeojson =
	{
		"type": "FeatureCollection",
		"features":
			[...]
	}

/*
 * Clusters sampledata.geojson into three clusters
 * NOTE: maxIterations is optional (defaults to 1000)
 */
createClusters(filepath, 3);

/*
 * Clusters sampledata.geojson int four clusters
 * and writes it to output/output.geojson
 */
writeClustersToFile(filepath, 4)

/*
 * Clusters samplegeojson into seven clusters
 * and runs 2000 iterations
 * NOTE: The higher the iterations, the slower it runs
 */
createClusters(samplegeojson, 7, 2000);

/*
 * Clusters samplegeojson into three clusters
 * and runs 1500 iterations
 */

writeClustersToFile(samplegeojson, 3, 1500);

```
### Methods

#### createClusters(inputData, kClusters, maxIterations)

#### writeToFile(inputData, kClusters, maxIterations)

| parameter | type | description | required | default |
| -----------|:---------:| -----:|-----:|-----:|
| inputData      | Object or String |Takes in a geojson object or a filepath to a .geojson file| true | ---
| kClusters| Number      | The number of clusters to seperate data into| false | 3
| maxIter| number |The number of iterations to  | false | 1000


#### You can use sample .geojson data located [here](https://github.com/rickyplouis/geojson-clustering/tree/master/sampleData)

### Viewing geojson data
 If you want to quickly view your outputted geojson files then check out [this site](http://geojson.io) and upload your .geojson files.
