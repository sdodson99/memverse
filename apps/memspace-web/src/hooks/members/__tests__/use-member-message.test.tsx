import React from 'react';
import { renderHook, WrapperComponent } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useAccessTokenContext } from '../../authentication/use-access-token-context';
import { useMemberMessage } from '../use-member-message';
import axios from 'axios';
import { when } from 'jest-when';
import { waitFor } from '@testing-library/react';

jest.mock('../../authentication/use-access-token-context');
const mockUseAccessTokenContext = useAccessTokenContext as jest.Mock;

jest.mock('axios');
const mockAxiosGet = axios.get as jest.Mock;

describe('useMemberMessage', () => {
  let token: string;
  let wrapper: WrapperComponent<unknown>;

  beforeEach(() => {
    token = '123';
    mockUseAccessTokenContext.mockReturnValue({ token });

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
          {children}
        </QueryClientProvider>
      );
    };
  });

  afterEach(() => {
    mockUseAccessTokenContext.mockReset();
    mockAxiosGet.mockReset();
  });

  it('should fetch message for user', async () => {
    const expectedMessage = 'message';
    when(mockAxiosGet)
      .calledWith(
        `${process.env.NEXT_PUBLIC_MEMSPACE_SERVER_BASE_URL}/account/message`,
        {
          headers: {
            authorization: 'Bearer 123',
          },
        }
      )
      .mockReturnValue({ data: { content: expectedMessage } });

    const { result } = renderHook(() => useMemberMessage(), { wrapper });

    await waitFor(() => {
      expect(result.current.message).toBe(expectedMessage);
    });
  });

  it('should set empty message when user has no message', async () => {
    when(mockAxiosGet)
      .calledWith(
        `${process.env.NEXT_PUBLIC_MEMSPACE_SERVER_BASE_URL}/account/message`,
        {
          headers: {
            authorization: 'Bearer 123',
          },
        }
      )
      .mockReturnValue({ data: {} });

    const { result } = renderHook(() => useMemberMessage(), { wrapper });

    await waitFor(() => {
      expect(result.current.message).toBe('');
    });
  });

  it('should return error when fetch fails', async () => {
    const expectedError = new Error();
    when(mockAxiosGet)
      .calledWith(
        `${process.env.NEXT_PUBLIC_MEMSPACE_SERVER_BASE_URL}/account/message`,
        {
          headers: {
            authorization: 'Bearer 123',
          },
        }
      )
      .mockImplementation(() => {
        throw expectedError;
      });

    const { result } = renderHook(() => useMemberMessage(), { wrapper });

    await waitFor(() => {
      expect(result.current.error).toBe(expectedError);
    });
  });
});
