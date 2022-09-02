import { act, renderHook } from '@testing-library/react-hooks';
import { useFirebaseAuthContext } from '../../authentication/firebase-auth/use-firebase-auth-context';
import axios from 'axios';
import { when } from 'jest-when';
import { waitFor } from '@testing-library/react';
import { useUpdateMemberMessage } from '../use-update-member-message';

jest.mock('../../authentication/firebase-auth/use-firebase-auth-context');
const mockUseFirebaseAuthContext = useFirebaseAuthContext as jest.Mock;

jest.mock('axios');
const mockAxiosPut = axios.put as jest.Mock;

describe('useUpdateMemberMessage', () => {
  let token: string;

  let message: string;

  beforeEach(() => {
    token = '123';
    mockUseFirebaseAuthContext.mockReturnValue({
      getIdToken: async () => token,
    });

    message = 'message';
  });

  afterEach(() => {
    mockUseFirebaseAuthContext.mockReset();
    mockAxiosPut.mockReset();
  });

  it('should update message for user', async () => {
    const { result } = renderHook(() => useUpdateMemberMessage());

    act(() => {
      result.current.execute(message);
    });

    await waitFor(() => {
      expect(mockAxiosPut).toBeCalledWith(
        `${process.env.NEXT_PUBLIC_MEMSPACE_SERVER_BASE_URL}/account/message`,
        {
          content: message,
        },
        {
          headers: {
            authorization: 'Bearer 123',
          },
        }
      );
    });
  });

  it('should return error when update fails', async () => {
    const expectedError = new Error();
    when(mockAxiosPut)
      .calledWith(
        `${process.env.NEXT_PUBLIC_MEMSPACE_SERVER_BASE_URL}/account/message`,
        {
          content: message,
        },
        {
          headers: {
            authorization: 'Bearer 123',
          },
        }
      )
      .mockImplementation(() => {
        throw expectedError;
      });
    const { result } = renderHook(() => useUpdateMemberMessage());

    await act(async () => {
      const { error } = await result.current.execute(message);
      expect(error).toBe(expectedError);
    });

    await waitFor(() => {
      expect(result.current.error).toBe(expectedError);
    });
  });
});
