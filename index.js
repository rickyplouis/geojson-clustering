const kClusters = 3;
const data = require('./addresses');
const getRandomInt = require('./getRandomInt');

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
}

const makeCentroids = (cluster) => {
  let final =  cluster.map((clust) => {
    console.log('clust', clust);
    console.log('clust.length', clust.length);
    const lat = clust.reduce((sum, acc) => acc.lat + sum, 0) / clust.length;
    const lng = clust.reduce((sum, acc) => acc.lng + sum, 0) / clust.length;
    return {
      lat,
      lng
    };
  })
  console.log('centroids', final);
  return final

}

const centroidsEqual = (first, second) => {
  if (first.length !== second.length) {
    return false;
  }
  for (var x = 0; x < first.length; x += 1) {
    for (var y = 0; y < second.lenth; y += 1) {
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

const clusterAnalysis = (k, dataset) => {
  let firstCentroid = initializeCentroids(k, dataset);
  let firstCluster = makeClusters(firstCentroid, dataset);
  let nextCentroid = makeCentroids(firstCluster);
  let nextCluster = makeClusters(nextCentroid, dataset);
  while (!centroidsEqual(firstCentroid, nextCentroid)) {
    firstCentroid = nextCentroid.map((centroid) => Object.assign({}, centroid));
    firstCluster = makeClusters(firstCentroid, dataset);
    nextCentroid = makeCentroids(firstCluster);
    nextCluster = makeClusters(nextCentroid, dataset)
  }
  let final = sortClusterByLat(nextCluster);
  console.log('final cluster', final);
  return final

}

const sortClusterByLat = (clusters) => {
  return clusters.map((cluster) => {
    return cluster.sort((a, b) => {
      if (a.lat < b.lat) {
        return -1
      }
      if (a.lat > b.lat) {
        return 1;
      }
      return 0;
    })
  })
}

clusterAnalysis(kClusters, data);
