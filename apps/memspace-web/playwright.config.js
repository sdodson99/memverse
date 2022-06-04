const config = {
  testDir: './test/e2e',
  retries: 2,
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    headless: true,
  },
};

module.exports = config;
