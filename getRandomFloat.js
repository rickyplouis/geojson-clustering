const getRandomFloat = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return (Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

module.exports = getRandomFloat;
