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
      branches: 25,
      functions: 25,
      lines: 25,
      statements: 25,
    },
  },
  setupFilesAfterEnv: ['<rootDir>/src/test-utils/firebase-setup.ts'],
};
