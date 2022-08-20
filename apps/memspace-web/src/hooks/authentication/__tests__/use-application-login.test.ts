import { useAccessTokenContext } from '../use-access-token-context';
import { NonMemberError, useApplicationLogin } from '../use-application-login';
import axios from 'axios';
import { when } from 'jest-when';
import { renderHook } from '@testing-library/react-hooks';
import { MockTagProvider } from '../../use-mock-tag-context';

jest.mock('../use-access-token-context');
const mockUseAccessTokenContext = useAccessTokenContext as jest.Mock;

jest.mock('axios');
const mockAxiosPost = axios.post as jest.Mock;
const mockIsAxiosError = axios.isAxiosError as unknown as jest.Mock;

describe('useApplicationLogin', () => {
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
    mockIsAxiosError.mockReset();
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
      const { result } = renderHook(() => useApplicationLogin(), {
        wrapper: MockTagProvider,
      });

      await result.current.login(token);

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
      const { result } = renderHook(() => useApplicationLogin(), {
        wrapper: MockTagProvider,
      });

      await expect(result.current.login(token)).rejects.toThrow();
    });

    it('should throw NonMemberError if request fails with 403 status code', async () => {
      mockIsAxiosError.mockReturnValue(true);
      when(mockAxiosPost)
        .calledWith(
          `${process.env.NEXT_PUBLIC_AUTHENTICATION_SERVER_BASE_URL}/login`,
          {
            accessToken: token,
          }
        )
        .mockImplementation(() => {
          // eslint-disable-next-line no-throw-literal
          throw {
            response: {
              status: 403,
            },
          };
        });
      const { result } = renderHook(() => useApplicationLogin(), {
        wrapper: MockTagProvider,
      });

      await expect(result.current.login(token)).rejects.toThrow(NonMemberError);
    });
  });
});
