import { useYouTubeLogin } from '../use-youtube-login';
import { useGoogleAuth } from 'react-gapi-auth2';

jest.mock('react-gapi-auth2');
const mockUseGoogleAuth = useGoogleAuth as jest.Mock;

describe('useYouTubeLogin', () => {
  let mockGetAuthResponse: jest.Mock;
  let mockGoogleAuth: any;

  let accessToken: string;

  beforeEach(() => {
    accessToken = '123';

    mockGetAuthResponse = jest.fn();

    mockGoogleAuth = {
      googleAuth: {
        signIn: () => ({
          getAuthResponse: mockGetAuthResponse,
        }),
      },
    };
    mockUseGoogleAuth.mockReturnValue(mockGoogleAuth);
  });

  afterEach(() => {
    mockUseGoogleAuth.mockReset();
  });

  describe('login', () => {
    it('should return access token when successful', async () => {
      mockGetAuthResponse.mockReturnValue({
        access_token: accessToken,
      });
      const { login } = useYouTubeLogin();

      const actualAccessToken = await login();

      expect(actualAccessToken).toBe(accessToken);
    });

    it('should throw error when no access token returned', async () => {
      mockGetAuthResponse.mockReturnValue({
        access_token: null,
      });
      const { login } = useYouTubeLogin();

      await expect(async () => await login()).rejects.toThrow();
    });
  });

  describe('isInitializing', () => {
    it('should return true when initializing', () => {
      mockGoogleAuth.googleAuth = null;

      const { isInitializing } = useYouTubeLogin();

      expect(isInitializing).toBeTruthy();
    });

    it('should return false when initialized', () => {
      const { isInitializing } = useYouTubeLogin();

      expect(isInitializing).toBeFalsy();
    });
  });
});
