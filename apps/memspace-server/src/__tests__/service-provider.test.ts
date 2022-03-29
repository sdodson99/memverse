import { config } from 'firebase-functions';
import { createServiceProvider } from '../service-provider';

jest.mock('firebase-functions');
const mockFunctionsConfig = config as unknown as jest.Mock;

jest.mock('../startup/firebase-app');

describe('createServiceProvider', () => {
  beforeEach(() => {
    mockFunctionsConfig.mockReturnValue({
      youtube_studio: {},
      access_token: {},
    });
  });

  it('should provide get account handler', () => {
    const serviceProvider = createServiceProvider();

    const getAccountHandler = serviceProvider.resolveGetAccountHandler();

    expect(getAccountHandler).toBeDefined();
  });

  it('should provide get account message handler', () => {
    const serviceProvider = createServiceProvider();

    const getAccountMessageHandler =
      serviceProvider.resolveGetAccountMessageHandler();

    expect(getAccountMessageHandler).toBeDefined();
  });

  it('should provide update account message handler', () => {
    const serviceProvider = createServiceProvider();

    const updateAccountMessageHandler =
      serviceProvider.resolveUpdateAccountMessageHandler();

    expect(updateAccountMessageHandler).toBeDefined();
  });

  it('should provide get all members handler', () => {
    const serviceProvider = createServiceProvider();

    const getAllMembersHandler = serviceProvider.resolveGetAllMembersHandler();

    expect(getAllMembersHandler).toBeDefined();
  });
});
