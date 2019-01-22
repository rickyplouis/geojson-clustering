const getRandomFloat = (min, max) => {
  return Math.random() * (max - min) + min; // The maximum is exclusive and the minimum is inclusive
};

const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
};

const makeMockData = (numAddresses = 0, initCoords = {}) => {
  let data = {
    type: 'FeatureCollection',
    features: []
  };
  const { minimumLat = 0, minimumLng = 0, maximumLat = 0, maximumLng = 0 } = initCoords;
  for (var x = 0; x < numAddresses; x++) {
    const datapoint = {
      geometry: {
        type: 'Point',
        coordinates: [
          getRandomFloat(minimumLng, maximumLng),
          getRandomFloat(minimumLat, maximumLat)
        ]
      },
      type: 'Feature',
      properties: {
        title: 'index of ' + x,
        'marker-symbol': 'suitcase'
      }
    };
    data.features.push(datapoint);
  }

  return data;
};

module.exports = {
  getRandomColor,
  getRandomFloat,
  makeMockData
};
