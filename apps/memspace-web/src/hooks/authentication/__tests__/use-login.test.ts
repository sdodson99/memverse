import { useApplicationLogin } from '../use-application-login';
import { useLogin } from '../use-login';
import { useYouTubeLogin } from '../use-youtube-login';

jest.mock('../use-application-login');
const mockUseApplicationLogin = useApplicationLogin as jest.Mock;

jest.mock('../use-youtube-login');
const mockUseYouTubeLogin = useYouTubeLogin as jest.Mock;

describe('useLogin', () => {
  let mockApplicationLogin: jest.Mock;
  let mockYouTubeLogin: jest.Mock;

  let accessToken: string;

  beforeEach(() => {
    mockApplicationLogin = jest.fn();
    mockUseApplicationLogin.mockReturnValue({
      login: mockApplicationLogin,
    });

    mockYouTubeLogin = jest.fn();
    mockUseYouTubeLogin.mockReturnValue({
      login: mockYouTubeLogin,
    });

    accessToken = 'access123';
  });

  describe('login', () => {
    it('should login with YouTube access token', async () => {
      mockYouTubeLogin.mockReturnValue(accessToken);
      const { login } = useLogin();

      await login();

      expect(mockApplicationLogin).toBeCalledWith(accessToken);
    });
  });

  describe('isInitializing', () => {
    it('should return true when initializing', () => {
      mockUseYouTubeLogin.mockReturnValue({ isInitializing: true });

      const { isInitializing } = useLogin();

      expect(isInitializing).toBeTruthy();
    });

    it('should return false when not initializing', () => {
      mockUseYouTubeLogin.mockReturnValue({ isInitializing: false });

      const { isInitializing } = useLogin();

      expect(isInitializing).toBeFalsy();
    });
  });
});
