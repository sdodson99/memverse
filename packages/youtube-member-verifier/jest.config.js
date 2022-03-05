// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  testEnvironment: 'node',
  clearMocks: true,
  testMatch: ['<rootDir>/src/**/*.test.[jt]s?(x)'],
  collectCoverageFrom: ['<rootDir>/src/**/*.[jt]s?(x)'],
  coverageDirectory: '<rootDir>/coverage/',
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },
};
