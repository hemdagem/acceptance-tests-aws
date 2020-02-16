module.exports = {
    testRegex: 'index\\.ts',
    preset: 'ts-jest',
    transform: {
      "^.+\\.jsx?$": "babel-jest",
      '^.+\\.ts?$': 'ts-jest'
  },
  }