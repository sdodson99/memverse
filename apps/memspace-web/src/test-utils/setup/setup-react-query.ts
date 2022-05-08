import { setLogger } from 'react-query';

beforeAll(() => {
  setLogger({
    log: console.log,
    warn: console.warn,
    error: jest.fn(),
  });
});
