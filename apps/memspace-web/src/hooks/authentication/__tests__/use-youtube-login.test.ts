import { useYouTubeLogin } from '../use-youtube-login';
import { useGoogleIdentityServicesContext } from '../use-google-identity-services-context';
import { useMockTagContext } from '../../use-mock-tag-context';

jest.mock('../use-google-identity-services-context');
const mockUseGoogleIdentityServicesContext =
  useGoogleIdentityServicesContext as jest.Mock;

jest.mock('../../use-mock-tag-context');
const mockUseMockTagContext = useMockTagContext as jest.Mock;

describe('useYouTubeLogin', () => {
  let accessToken: string;

  let mockClient: GoogleTokenClient;

  beforeEach(() => {
    accessToken = '123';
    mockClient = {
      callback: jest.fn(),
      requestAccessToken: jest.fn(),
    };
    mockUseGoogleIdentityServicesContext.mockReturnValue({
      client: mockClient,
    });
  });

  afterEach(() => {
    mockUseGoogleIdentityServicesContext.mockReset();
    mockUseMockTagContext.mockReset();
  });

  describe('login', () => {
    it('should return access token when successful', async () => {
      mockClient.requestAccessToken = () => {
        mockClient.callback({ access_token: accessToken });
      };
      const { login } = useYouTubeLogin();

      const actualAccessToken = await login();

      expect(actualAccessToken).toBe(accessToken);
    });

    it('should throw error when no access token returned', async () => {
      mockClient.requestAccessToken = () => {
        mockClient.callback({} as GoogleTokenClientCallbackResponse);
      };
      const { login } = useYouTubeLogin();

      await expect(async () => await login()).rejects.toThrow();
    });

    it('should return stub access token when in mock mode', async () => {
      mockUseMockTagContext.mockReturnValue('any-mock');
      const { login } = useYouTubeLogin();

      const actualAccessToken = await login();

      expect(actualAccessToken).toBe('mock-google-access-token');
    });
  });

  describe('isInitializing', () => {
    it('should return true when initializing', () => {
      mockUseGoogleIdentityServicesContext.mockReturnValue({
        initialized: false,
      });

      const { isInitializing } = useYouTubeLogin();

      expect(isInitializing).toBeTruthy();
    });

    it('should return false when initialized', () => {
      mockUseGoogleIdentityServicesContext.mockReturnValue({
        initialized: true,
      });

      const { isInitializing } = useYouTubeLogin();

      expect(isInitializing).toBeFalsy();
    });
  });
});
