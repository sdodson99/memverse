// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  testMatch: ['<rootDir>/src/**/*.test.[jt]s?(x)'],
  collectCoverageFrom: ['<rootDir>/src/**/*.[jt]s?(x)'],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
  },
  setupFiles: ['jest-canvas-mock'],
  setupFilesAfterEnv: [
    '<rootDir>/src/test-utils/setup-match-media.ts',
    '<rootDir>/src/test-utils/setup-router.ts',
    '<rootDir>/src/test-utils/setup-react-query.ts',
  ],
  testEnvironment: 'jest-environment-jsdom',
  clearMocks: true,
  coverageDirectory: '<rootDir>/coverage',
  coverageProvider: 'babel',
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },
};
