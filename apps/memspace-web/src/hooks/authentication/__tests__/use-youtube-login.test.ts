import { useYouTubeLogin } from '../use-youtube-login';
import { useGoogleAuth } from 'react-gapi-auth2';

jest.mock('react-gapi-auth2');
const mockUseGoogleAuth = useGoogleAuth as jest.Mock;

describe('useYouTubeLogin', () => {
  let youTubeLogin: () => Promise<string>;

  let mockGetAuthResponse: jest.Mock;

  let accessToken: string;

  beforeEach(() => {
    accessToken = '123';

    mockGetAuthResponse = jest.fn();
    mockUseGoogleAuth.mockReturnValue({
      googleAuth: {
        signIn: () => ({
          getAuthResponse: mockGetAuthResponse,
        }),
      },
    });

    youTubeLogin = useYouTubeLogin();
  });

  afterEach(() => {
    mockUseGoogleAuth.mockReset();
  });

  it('should return access token when successful', async () => {
    mockGetAuthResponse.mockReturnValue({
      access_token: accessToken,
    });

    const actualAccessToken = await youTubeLogin();

    expect(actualAccessToken).toBe(accessToken);
  });

  it('should throw error when no access token returned', async () => {
    mockGetAuthResponse.mockReturnValue({
      access_token: null,
    });

    await expect(async () => await youTubeLogin()).rejects.toThrow();
  });
});
