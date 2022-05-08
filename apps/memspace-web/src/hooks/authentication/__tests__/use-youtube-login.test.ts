import { useYouTubeLogin } from '../use-youtube-login';
import { useGoogleIdentityServicesContext } from '../use-google-identity-services-context';

jest.mock('../use-google-identity-services-context');
const mockUseGoogleIdentityServicesContext =
  useGoogleIdentityServicesContext as jest.Mock;

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
