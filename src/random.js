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

module.exports = {
  getRandomColor,
  getRandomFloat
};
