import { useAccessTokenContext } from '../use-access-token-context';
import { useLogin } from '../use-login';
import axios from 'axios';
import { when } from 'jest-when';

jest.mock('../use-access-token-context');
const mockUseAccessTokenContext = useAccessTokenContext as jest.Mock;

jest.mock('axios');
const mockAxiosPost = axios.post as jest.Mock;

describe('useLogin', () => {
  let mockSetAccessToken: jest.Mock;

  beforeEach(() => {
    mockSetAccessToken = jest.fn();

    mockUseAccessTokenContext.mockReturnValue({
      setAccessToken: mockSetAccessToken,
    });
  });

  afterEach(() => {
    mockUseAccessTokenContext.mockReset();
    mockAxiosPost.mockReset();
  });

  describe('login', () => {
    let token: string;

    beforeEach(() => {
      token = '123';
    });

    it('should set access token if successful', async () => {
      const accessTokenResponse = { token: '456' };
      when(mockAxiosPost)
        .calledWith(
          `${process.env.NEXT_PUBLIC_AUTHENTICATION_SERVER_BASE_URL}/login`,
          {
            accessToken: token,
          }
        )
        .mockReturnValue({
          data: accessTokenResponse,
        });
      const login = useLogin();

      await login(token);

      expect(mockSetAccessToken).toBeCalledWith(accessTokenResponse);
    });

    it('should throw if request fails', async () => {
      when(mockAxiosPost)
        .calledWith(
          `${process.env.NEXT_PUBLIC_AUTHENTICATION_SERVER_BASE_URL}/login`,
          {
            accessToken: token,
          }
        )
        .mockImplementation(() => {
          throw new Error();
        });
      const login = useLogin();

      await expect(login(token)).rejects.toThrow();
    });
  });
});
