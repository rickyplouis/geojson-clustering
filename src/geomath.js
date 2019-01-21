const getLng = coord => {
  if ('geometry' in coord) {
    if ('coordinates' in coord.geometry) {
      return coord.geometry.coordinates[0];
    }
  }

  return 0;
};

const getLat = coord => {
  if ('geometry' in coord) {
    if ('coordinates' in coord.geometry) {
      return coord.geometry.coordinates[1];
    }
  }

  return 0;
};

const euclideanDistance = (coordA = {}, coordB = {}) => {
  let latA = getLat(coordA);
  let latB = getLat(coordB);
  let lngA = getLng(coordA);
  let lngB = getLng(coordB);
  return Math.sqrt(Math.pow(latA - latB, 2) + Math.pow(lngA - lngB, 2));
};

const getMin = (data = [{}], prop) => {
  let initialVal = prop === 'lat' ? getLat(data[0]) : getLng(data[0]);
  return data.reduce((min, acc) => {
    let currVal = prop === 'lat' ? getLat(acc) : getLng(acc);
    return currVal < min ? currVal : min;
  }, initialVal);
};

const getMax = (data = [{}], prop) => {
  let initialVal = prop === 'lat' ? getLat(data[0]) : getLng(data[0]);
  return data.reduce((max, acc) => {
    let currVal = prop === 'lat' ? getLat(acc) : getLng(acc);
    return currVal > max ? currVal : max;
  }, initialVal);
};

module.exports = {
  getLat,
  getLng,
  euclideanDistance,
  getMax,
  getMin
};
