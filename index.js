const fs = require('fs');
const kClusters = 3;
const numOfAddresses = 1000;
const maxIterations = 1000;
const getRandomFloat = require('./getRandomFloat');

const getLng = coord => coord.geometry.coordinates[0]
const getLat = coord => coord.geometry.coordinates[1];

// trice coords
// 41.8766389,-87.6505024
// bedford park
// 41.7733706,-87.7832374

const maxLat = 41.8766389;
const minLat = 41.7733706;

const maxLng = -87.6505024;
const minLng = -87.7832374;

const makeMockData = (numAddresses, min_lat, min_lng, max_lat, max_lng) => {
  let data = [];
  for (var x = 0; x < numAddresses; x++) {
    const datapoint = {
          "geometry": {
              "type": "Point",
              "coordinates": [
                  getRandomFloat(min_lng, max_lng),
                  getRandomFloat(min_lat, max_lat)
              ]
          },
          "type": "Feature",
          "properties": {
            "title": "index of " + x,
            "marker-symbol": 'suitcase',
          }
      }
    data.push(datapoint)
  }
  return data
}

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

const getMin = (data, prop) => {
  let initialVal = prop === 'lat' ? getLat(data[0]) : getLng(data[0]);
  return data.reduce((min, acc) => {
    let currVal = prop === 'lat' ? getLat(acc) : getLng(acc);
    return currVal < min ? currVal : min;
  }, initialVal)
}

const getMax = (data, prop) => {
  let initialVal = prop === 'lat' ? getLat(data[0]) : getLng(data[0]);
  return data.reduce((max, acc) => {
    let currVal = prop === 'lat' ? getLat(acc) : getLng(acc);
    return currVal > max ? currVal : max;
  }, initialVal)
}

const initializeCentroids = (n, data) => {
  const centroids = [];
  let min_lat = getMin(data, 'lat');
  let min_lng = getMin(data, 'lng');
  let max_lat = getMax(data, 'lat');
  let max_lng = getMax(data, 'lng');
  for ( var x = 0; x < n; x += 1) {
    centroids.push(makeRandomCentroid(min_lat, min_lng, max_lat, max_lng));
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
      // compare the distance between each centroid and find the index of the closest one
      let firstDist = euclideanDistance(data[x], centroids[minCentroidIndex])
      let secondDist = euclideanDistance(data[x], centroids[y]);
      //change index of closest centroid
      if ( firstDist >= secondDist) {
        minCentroidIndex = y;
      }
      // reached end of array, put data point in cluster of closest centroid
      if (y === centroids.length - 1 ) {
        clusters[minCentroidIndex].push(data[x]);
      }
    }
  }
  console.timeEnd('makeClusters');
  return clusters;
}

const makeCentroids = (cluster) => {
  let final =  cluster.map((clust) => {
    // handles empty clusters by making random centroid
    if (clust.length === 0) {
      return makeRandomCentroid(minLat, minLng, maxLat, maxLng)
    }
    const lat = (clust.reduce((sum, acc) => getLat(acc) + sum, 0) / clust.length);
    const lng = clust.reduce((sum, acc) => getLng(acc) + sum, 0) / clust.length;
    return makeDatapoint(lat, lng);
  })
  return final
}

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
}

const compareClusters = (firstCluster, secondCluster, dataset, maxIter) => {
  console.log('compareClusters::maxIter', maxIter);
  let firstCentroid = makeCentroids(firstCluster);
  let secondCentroid = makeCentroids(secondCluster);
  if (maxIter > 0) {
    return centroidsEqual(firstCentroid, secondCentroid) ?
      secondCluster : compareClusters(makeClusters(firstCentroid, dataset), makeClusters(secondCentroid, dataset), dataset, maxIter -= 1)
  }
  return secondCluster;
}

const clusterAnalysis = (k, dataset, maxIter) => {
  let firstCentroid = initializeCentroids(k, dataset);
  let firstCluster = makeClusters(firstCentroid, dataset);
  let nextCentroid = makeCentroids(firstCluster);
  let nextCluster = makeClusters(nextCentroid, dataset);
  let res = compareClusters(firstCluster, nextCluster, dataset, maxIter);
  return res;
}

const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const writeGEOJSON = (clusters) => {
  console.time('writeGEOJSON');
  let json = {
    "type": "FeatureCollection",
    "features": []
  }

  let colors = [];

  for (var x = 0; x < clusters.length; x++) {
    colors.push(getRandomColor());
  }

  clusters.map((cluster, index) => {
    if (cluster.length > 0) {
      for (let dp of cluster) {
        let rndColor = getRandomColor();
        dp.properties['marker-color'] = colors[index];
        json.features.push(dp);
      }
    }
  })

  fs.writeFile('output.geojson', JSON.stringify(json), (err, data) => {
    if (err) throw err;
  })
}

const getCmdClusters = (args) => {
  for (let arg of args) {
    if (arg.indexOf('clusters=') >= 0) {
      return parseInt(arg.substring('clusters='.length));
    }
  }
  return false
}

const getCmdIterations = (args) => {
  for (let arg of args) {
    if (arg.indexOf('max=') >= 0) {
      console.log('got max');
      return parseInt(arg.substring('max='.length));
    }
  }
  console.log('didnt get maxIter');
  return false
}


const main = () => {
  // if no file args then use mock data
  if (process.argv.length === 2 ) {
    //use mock addresses to create input geojson file
    fs.writeFile('input.geojson', JSON.stringify(makeMockData(numOfAddresses, minLat, minLng, maxLat, maxLng)), (err, data) => {
      if (err) throw err;
      const inputData = JSON.parse(fs.readFileSync('./input.geojson'));
      writeGEOJSON(clusterAnalysis(kClusters, inputData, maxIterations));
    })
  } else {
    const inputFile = JSON.parse(fs.readFileSync(process.argv[2]));
    // else there are args so use input filepath
    const inputData = inputFile.features
    const inputClusters = getCmdClusters(process.argv) ? getCmdClusters(process.argv) : kClusters;
    const inputIterations = getCmdIterations(process.argv) ? getCmdIterations(process.argv) : maxIterations;
    writeGEOJSON(clusterAnalysis(inputClusters, inputData, inputIterations));
  }
}


main();
