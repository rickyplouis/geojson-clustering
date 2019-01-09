const kClusters = 5;
const data = require('./addresses');
const getRandomInt = require('./getRandomInt');
let finalCentroids = [];

const euclideanDistance = (coordA, coordB) => {
  return Math.sqrt(Math.pow(coordA.lat - coordB.lat, 2) + Math.pow(coordA.lng - coordB.lng, 2))
}

const getMin = (coords, prop) => {
  return coords.reduce((min, acc) => acc[prop] < min ? acc[prop] : min, coords[0][prop])
}

const getMax = (coords, prop) => {
  return coords.reduce((max, acc) => acc[prop] > max ? acc[prop] : max, coords[0][prop])
}

const initializeCentroids = (n, data) => {
  const centroids = [];
  for ( var x = 0; x < n; x += 1) {
    centroids.push(
      {
        lat: getRandomInt(getMin(data, 'lat'), getMax(data, 'lat')),
        lng: getRandomInt(getMin(data, 'lng'), getMax(data, 'lng')),
      }
    )
  }
  return centroids;
}

const makeClusters = (centroids, data) => {
  let clusters = [];
  for (let n = 0; n < centroids.length; n += 1) {
    clusters.push([]);
  }
  for (let x = 0; x < data.length; x += 1) {
    let minCentroidIndex = 0;
    for (let y = 0; y < centroids.length; y += 1) {
      //change index of closest centroid
      if (euclideanDistance(data[x], centroids[minCentroidIndex]) > euclideanDistance(data[x], centroids[y])) {
        minCentroidIndex = y;
      }
      // reached end of array, put data point in cluster of closest centroid
      if (y === centroids.length - 1 ) {
        clusters[minCentroidIndex].push(data[x]);
      }
    }
  }
  return clusters;
  // TODO
  // for each datapoint
  // for each centroid
  // if distance(dpX, c) < distance(dPX, c)
  // minCentroid = c
  // after all iteration assigned dp to indexOf(centroid)
}

const getMeanCentroid = (data) => {
  const lat = data.reduce((sum, acc) => acc.lat + sum, 0) / data.length;
  const lng = data.reduce((sum, acc) => acc.lng + sum, 0) / data.length;
  return {
    lat,
    lng
  };
}

const clustersEqual = (first, second) => {
  if (first.length !== second.length) {
    return false;
  }
  for (var x = 0; x < first.length; x += 1) {
    for (var y = 0; y < second.lenfth; y += 1) {
      if (first[x].lat !== second[y].lat) {
        return false;
      }
      if (first[x].lng !== second[y].lng) {
        return false;
      }
    }
  }
  return true;
}

let nCentroids = initializeCentroids(kClusters, data);
let yCentroids = initializeCentroids(kClusters, data);
let testClusters = makeClusters(nCentroids, data);
let testThree = testClusters;
let testTwo = makeClusters(yCentroids, data);

let mean = getMeanCentroid(nCentroids);
console.log('clustersEqual', clustersEqual(testClusters[0], testTwo[0]));
console.log('clustersEqual', clustersEqual(testClusters[0], testThree[0]));
console.log('mean', mean);
