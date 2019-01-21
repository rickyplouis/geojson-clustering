const geomath = require('./geomath');
const constants = require('./constants');
const random = require('./random');
const { getRandomFloat } = random;
const { euclideanDistance, getLat, getLng, getMin, getMax } = geomath;
const { maximumLat, maximumLng, minimumLat, minimumLng } = constants;

const makeClusters = (centroids = [], data = []) => {
  let clusters = [];
  for (let n = 0; n < centroids.length; n += 1) {
    clusters.push([]);
  }

  for (let x = 0; x < data.length; x += 1) {
    let minCentroidIndex = 0;
    for (let y = 0; y < centroids.length; y += 1) {
      // Compare the distance between each centroid and find the index of the closest one
      let firstDist = euclideanDistance(data[x], centroids[minCentroidIndex]);
      let secondDist = euclideanDistance(data[x], centroids[y]);
      // Change index of closest centroid
      if (firstDist >= secondDist) {
        minCentroidIndex = y;
      }
      // Reached end of array, put data point in cluster of closest centroid

      if (y === centroids.length - 1) {
        clusters[minCentroidIndex].push(data[x]);
      }
    }
  }

  return clusters;
};

const initializeCentroids = (n, data) => {
  const centroids = [];
  let minLat = getMin(data, 'lat');
  let minLng = getMin(data, 'lng');
  let maxLat = getMax(data, 'lat');
  let maxLng = getMax(data, 'lng');
  for (let x = 0; x < n; x += 1) {
    centroids.push(makeRandomCentroid(minLat, minLng, maxLat, maxLng));
  }

  return centroids;
};

const makeCentroids = cluster => {
  return cluster.map(clust => {
    // Handles empty clusters by making random centroid
    if (clust.length === 0) {
      return makeRandomCentroid(minimumLat, minimumLng, maximumLat, maximumLng);
    }

    // Computes average lat and average lng of the cluster to create new centroid
    const avgLat = clust.reduce((sum, acc) => getLat(acc) + sum, 0) / clust.length;
    const avgLng = clust.reduce((sum, acc) => getLng(acc) + sum, 0) / clust.length;
    return makeDatapoint(avgLat, avgLng);
  });
};

const makeRandomCentroid = (minLat, minLng, maxLat, maxLng) => {
  return makeDatapoint(getRandomFloat(minLat, maxLat), getRandomFloat(minLng, maxLng));
};

const makeDatapoint = (lat, lng) => {
  return {
    geometry: {
      type: 'Point',
      coordinates: [lng, lat]
    }
  };
};

const centroidsEqual = (first, second) => {
  if (first.length !== second.length) {
    return false;
  }

  for (let x = 0; x < first.length; x += 1) {
    if (getLat(first[x]) !== getLat(second[x])) {
      return false;
    }

    if (getLng(first[x]) !== getLng(second[x])) {
      return false;
    }
  }

  return true;
};

const compareClusters = (firstCluster, secondCluster, dataset, maxIter) => {
  let firstCentroid = makeCentroids(firstCluster);
  let secondCentroid = makeCentroids(secondCluster);
  if (maxIter > 0) {
    if (centroidsEqual(firstCentroid, secondCentroid)) {
      return secondCluster;
    }

    compareClusters(
      makeClusters(firstCentroid, dataset),
      makeClusters(secondCentroid, dataset),
      dataset,
      (maxIter -= 1)
    );
  }

  return secondCluster;
};

const clusterAnalysis = (k, dataset, maxIter) => {
  let firstCentroid = initializeCentroids(k, dataset);
  let firstCluster = makeClusters(firstCentroid, dataset);
  let nextCentroid = makeCentroids(firstCluster);
  let nextCluster = makeClusters(nextCentroid, dataset);
  let res = compareClusters(firstCluster, nextCluster, dataset, maxIter);
  return res;
};

module.exports = {
  clusterAnalysis,
  compareClusters,
  centroidsEqual,
  makeDatapoint,
  makeRandomCentroid,
  initializeCentroids,
  makeClusters
};
