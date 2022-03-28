import { config } from 'firebase-functions';
import { createServiceProvider } from '../service-provider';

jest.mock('firebase-functions');
const mockFunctionsConfig = config as unknown as jest.Mock;

describe('createServiceProvider', () => {
  beforeEach(() => {
    mockFunctionsConfig.mockReturnValue({
      youtube_studio: {},
      access_token: {},
    });
  });

  it('should provide login handler', () => {
    const serviceProvider = createServiceProvider();

    const loginHandler = serviceProvider.resolveLoginHandler();

    expect(loginHandler).toBeDefined();
  });
});
