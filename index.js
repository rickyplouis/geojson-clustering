const fs = require('fs');
const kClusters = 5;
const maxIterations = 100;
const addresses = require('./addresses');
const { data, minLat, minLng, maxLat, maxLng } = addresses;
const getRandomFloat = require('./getRandomFloat');

const getLng = coord => coord.geometry.coordinates[0]
const getLat = coord => coord.geometry.coordinates[1];

const makeDatapoint = (lat, lng) => {
  return {
    "geometry": {
        "type": "Point",
        "coordinates": [
            lng,
            lat
        ]
    }
  }
}

const euclideanDistance = (coordA, coordB) => {
  let latA = getLat(coordA)
  let latB = getLat(coordB);
  let lngA = getLng(coordA);
  let lngB = getLng(coordB);
  return Math.sqrt( Math.pow(latA - latB, 2) + Math.pow(lngA - lngB, 2) )
}

const makeRandomCentroid = (minLat, minLng, maxLat, maxLng) => {
  return makeDatapoint(getRandomFloat(minLat, maxLat), getRandomFloat(minLng, maxLng))
}

const initializeCentroids = (n, data) => {
  const centroids = [];
  for ( var x = 0; x < n; x += 1) {
    centroids.push(makeRandomCentroid(minLat, minLng, maxLat, maxLng))
  }
  return centroids;
}

const makeClusters = (centroids, data) => {
  console.time('makeClusters');
  let clusters = [];
  for (let n = 0; n < centroids.length; n += 1) {
    clusters.push([]);
  }
  for (let x = 0; x < data.length; x += 1) {
    let minCentroidIndex = 0;
    for (let y = 0; y < centroids.length; y += 1) {
      //change index of closest centroid
      let firstDist = euclideanDistance(data[x], centroids[minCentroidIndex])
      let secondDist = euclideanDistance(data[x], centroids[y]);
      if ( firstDist > secondDist) {
        minCentroidIndex = y;
      }
      // reached end of array, put data point in cluster of closest centroid
      if (y === centroids.length - 1 ) {
        clusters[minCentroidIndex].push(data[x]);
      }
    }
  }
  return clusters;
}

const makeCentroids = (cluster) => {
  let final =  cluster.map((clust) => {
    const lat = clust.reduce((sum, acc) => getLat(acc) + sum, 0) / clust.length;
    const lng = clust.reduce((sum, acc) => getLng(acc) + sum, 0) / clust.length;
    const datapoint = {
          "geometry": {
              "type": "Point",
              "coordinates": [
                lng,
                lat,
              ]
          },
      }
    return datapoint;
  })
  return final
}

const centroidsEqual = (first, second) => {
  console.log('running centroidsEqual');
  //console.log('centroidsEqual');
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
}

const compareClusters = (firstCluster, secondCluster, dataset) => {
  let firstCentroid = makeCentroids(firstCluster);
  let secondCentroid = makeCentroids(secondCluster);
  return centroidsEqual(firstCentroid, secondCentroid) ?
         secondCluster : compareClusters(makeClusters(firstCentroid, dataset), makeClusters(secondCentroid, dataset), dataset)
}

const clusterAnalysis = (k, dataset) => {
  let firstCentroid = initializeCentroids(k, dataset);
  let firstCluster = makeClusters(firstCentroid, dataset);
  let nextCentroid = makeCentroids(firstCluster);
  let nextCluster = makeClusters(nextCentroid, dataset);
  return compareClusters(firstCluster, nextCluster, dataset);
}

const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

let newClusters = clusterAnalysis(kClusters, data);

let json = {
  "type": "FeatureCollection",
  "features": []
}

let colors = [];

for (var x = 0; x < kClusters; x++) {
  colors.push(getRandomColor());
}

newClusters.map((cluster, index) => {
  if (cluster.length > 0) {
    for (let dp of cluster) {
      let rndColor = getRandomColor();
      dp.properties['marker-color'] = colors[index];
      json.features.push(dp);
    }
  }
})

fs.writeFile('test.geojson', JSON.stringify(json), (err, data) => {
  if (err) throw err;
})
