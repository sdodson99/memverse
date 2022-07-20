process.env.FIREBASE_CONFIG = 'config';
process.env.GCLOUD_PROJECT = 'project';

jest.mock('firebase-functions', () => ({
  ...jest.requireActual('firebase-functions'),
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
  },
}));
