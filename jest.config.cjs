module.exports = {
  collectCoverage: true,
  testMatch: ['**/?(*.)+(test).[jt]s'],
  collectCoverageFrom: ['src/**/*.js', '!src/server.js', '!seed.js'],
  coverageReporters: ['lcov', 'text'],
  coverageDirectory: 'coverage',
};
