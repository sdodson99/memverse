import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import { useNavigate } from '../../use-navigate';
import { useFirebaseAuthContext } from '../firebase-auth/use-firebase-auth-context';
import { useHandleAuthenticationErrorEffect } from '../use-handle-authentication-error-effect';

jest.mock('axios');
const mockIsAxiosError = axios.isAxiosError as unknown as jest.Mock;

jest.mock('../../use-navigate');
const mockUseNavigate = useNavigate as jest.Mock;

jest.mock('../firebase-auth/use-firebase-auth-context');
const mockUseFirebaseAuthContext = useFirebaseAuthContext as jest.Mock;

describe('useHandleAuthenticationErrorEffect', () => {
  let mockNavigate: jest.Mock;
  let mockSignOut: jest.Mock;

  beforeEach(() => {
    mockNavigate = jest.fn();
    mockUseNavigate.mockReturnValue(mockNavigate);

    mockSignOut = jest.fn();
    mockUseFirebaseAuthContext.mockReturnValue({
      signOut: mockSignOut,
    });
  });

  afterEach(() => {
    mockIsAxiosError.mockReset();
    mockUseNavigate.mockReset();
    mockUseFirebaseAuthContext.mockReset();
  });

  describe.each([401, 403])('with authentication %i error', (statusCode) => {
    beforeEach(() => {
      mockIsAxiosError.mockReturnValue(true);

      renderHook(() =>
        useHandleAuthenticationErrorEffect({
          response: {
            status: statusCode,
          },
        })
      );
    });

    it('should sign out', () => {
      expect(mockSignOut).toBeCalled();
    });

    it('should navigate to login', () => {
      expect(mockNavigate).toBeCalledWith({ pathname: '/login' });
    });
  });

  it('should not execute handler when no error defined', () => {
    renderHook(() => useHandleAuthenticationErrorEffect(null));

    expect(mockSignOut).not.toBeCalled();
  });

  it('should not execute handler when error is not a network error', () => {
    renderHook(() => useHandleAuthenticationErrorEffect(new Error()));

    expect(mockSignOut).not.toBeCalled();
  });

  it('should not execute handler when error is not an authentication error', () => {
    mockIsAxiosError.mockReturnValue(true);

    renderHook(() =>
      useHandleAuthenticationErrorEffect({
        response: { status: 500 },
      })
    );

    expect(mockSignOut).not.toBeCalled();
  });
});
