const n = 30
let data = [];
const euclideanDistance = (coordA, coordB) => {
  return Math.sqrt(Math.pow(coordA.lat - coordB.lat, 2) + Math.pow(coordA.lng - coordB.lng, 2))
}

const getRandomInt = (max) => {
  return Math.ceil(Math.random() * Math.floor(max));
}

for (var x = 0; x < n; x++) {
  data.push({lat: getRandomInt(30), lng: getRandomInt(30)})
}

console.log('data', data);
console.log('get distance()', euclideanDistance(data[0], data[1]));
