import { useApplicationLogin } from '../use-application-login';
import { useLogin } from '../use-login';
import { useYouTubeLogin } from '../use-youtube-login';
import { useFirebaseLogin } from '../use-firebase-login';
import { when } from 'jest-when';

jest.mock('../use-application-login');
const mockUseApplicationLogin = useApplicationLogin as jest.Mock;

jest.mock('../use-youtube-login');
const mockUseYouTubeLogin = useYouTubeLogin as jest.Mock;

jest.mock('../use-firebase-login');
const mockUseFirebaseLogin = useFirebaseLogin as jest.Mock;

describe('useLogin', () => {
  let mockApplicationLogin: jest.Mock;
  let mockYouTubeLogin: jest.Mock;
  let mockFirebaseLogin: jest.Mock;

  let youTubeAccessToken: string;
  let firebaseAccessToken: string;

  beforeEach(() => {
    mockApplicationLogin = jest.fn();
    mockUseApplicationLogin.mockReturnValue({
      login: mockApplicationLogin,
    });

    mockYouTubeLogin = jest.fn();
    mockUseYouTubeLogin.mockReturnValue({
      login: mockYouTubeLogin,
    });

    mockFirebaseLogin = jest.fn();
    mockUseFirebaseLogin.mockReturnValue({
      login: mockFirebaseLogin,
    });

    youTubeAccessToken = 'youtubeaccess123';
    firebaseAccessToken = 'firebaseaccess123';
  });

  describe('login', () => {
    it('should login with custom Firebase token for YouTube user', async () => {
      mockYouTubeLogin.mockReturnValue(youTubeAccessToken);
      when(mockApplicationLogin)
        .calledWith(youTubeAccessToken)
        .mockReturnValue(firebaseAccessToken);
      const { login } = useLogin();

      await login();

      expect(mockFirebaseLogin).toBeCalledWith(firebaseAccessToken);
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
