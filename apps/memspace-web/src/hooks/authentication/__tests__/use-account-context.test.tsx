import React from 'react';
import { waitFor } from '@testing-library/react';
import { renderHook, WrapperComponent } from '@testing-library/react-hooks';
import { useAccessTokenContext } from '../use-access-token-context';
import { AccountProvider, useAccountContext } from '../use-account-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useIsLoggedIn } from '../use-is-logged-in';
import axios from 'axios';
import { when } from 'jest-when';

jest.mock('../use-access-token-context');
const mockUseAccessTokenContext = useAccessTokenContext as jest.Mock;
jest.mock('../use-is-logged-in');
const mockUseIsLoggedIn = useIsLoggedIn as jest.Mock;
jest.mock('axios');
const mockAxiosGet = axios.get as jest.Mock;

describe('useAccount', () => {
  let token: string;
  let wrapper: WrapperComponent<unknown>;

  beforeEach(() => {
    token = 'token';
    mockUseAccessTokenContext.mockReturnValue({
      token,
    });
    mockUseIsLoggedIn.mockReturnValue(false);
    wrapper = function Wrapper({ children }) {
      return (
        <QueryClientProvider
          client={
            new QueryClient({
              defaultOptions: {
                queries: {
                  retry: false,
                },
              },
            })
          }
        >
          <AccountProvider>{children}</AccountProvider>
        </QueryClientProvider>
      );
    };
  });

  afterEach(() => {
    mockUseAccessTokenContext.mockReset();
    mockUseIsLoggedIn.mockReset();
    mockAxiosGet.mockReset();
  });

  it('should return null account when not logged in', async () => {
    const { result } = renderHook(() => useAccountContext(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.account).toBeNull();
    });
  });

  it('should return account when query successful', async () => {
    const expected = {
      id: '123',
    };
    mockUseIsLoggedIn.mockReturnValue(true);
    when(mockAxiosGet)
      .calledWith(
        `${process.env.NEXT_PUBLIC_MEMSPACE_SERVER_BASE_URL}/account`,
        {
          headers: {
            authorization: 'Bearer token',
          },
        }
      )
      .mockReturnValue({ data: expected });

    const { result } = renderHook(() => useAccountContext(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.account).toBe(expected);
    });
  });

  it('should return error when query fails', async () => {
    const expected = new Error();
    mockUseIsLoggedIn.mockReturnValue(true);
    when(mockAxiosGet)
      .calledWith(
        `${process.env.NEXT_PUBLIC_MEMSPACE_SERVER_BASE_URL}/account`,
        {
          headers: {
            authorization: 'Bearer token',
          },
        }
      )
      .mockImplementation(() => {
        throw expected;
      });

    const { result } = renderHook(() => useAccountContext(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.error).toBe(expected);
    });
  });
});
