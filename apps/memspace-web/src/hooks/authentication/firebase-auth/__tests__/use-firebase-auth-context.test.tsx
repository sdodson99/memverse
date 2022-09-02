import { act, renderHook } from '@testing-library/react-hooks';
import { useFirebaseAuthContext } from '../use-firebase-auth-context';
import { getTestApp } from '../../../../test-utils/render-app';
import {
  getAuth,
  getIdToken,
  signInWithCustomToken,
  signOut,
} from 'firebase/auth';
import { useFirebaseContext } from '../../../use-firebase-context';

jest.mock('firebase/auth');
const mockGetAuth = getAuth as jest.Mock;
const mockSignInWithCustomToken = signInWithCustomToken as jest.Mock;
const mockGetIdToken = getIdToken as jest.Mock;
const mockSignOut = signOut as jest.Mock;

jest.mock('../../../use-firebase-context');
const mockUseFirebaseContext = useFirebaseContext as jest.Mock;

describe('useFirebaseAuthContext', () => {
  afterEach(() => {
    mockGetAuth.mockReset();
    mockSignInWithCustomToken.mockReset();
    mockGetIdToken.mockReset();
    mockSignOut.mockReset();
    mockUseFirebaseContext.mockReset();
  });

  describe('when in real mode', () => {
    let mockOnIdTokenChanged: jest.Mock;

    let token: string;

    beforeEach(() => {
      token = 'custom-token';

      mockOnIdTokenChanged = jest.fn().mockImplementation((callback) => {
        callback({
          uid: '1',
        });

        return () => {
          return;
        };
      });
      mockGetAuth.mockReturnValue({
        onIdTokenChanged: mockOnIdTokenChanged,
      });

      mockUseFirebaseContext.mockReturnValue({});
    });

    describe('signInWithCustomToken', () => {
      it('should sign in via Firebase', async () => {
        const TestApp = getTestApp({});
        const { result } = renderHook(() => useFirebaseAuthContext(), {
          wrapper: TestApp,
        });

        await result.current.signInWithCustomToken(token);

        expect(mockSignInWithCustomToken).toBeCalledWith(
          expect.anything(),
          token
        );
      });
    });

    describe('getIdToken', () => {
      it('should return ID token when signed in', async () => {
        const expected = 'id-token';
        mockGetIdToken.mockReturnValue(expected);
        mockUseFirebaseContext.mockReturnValue({ app: {} });
        const TestApp = getTestApp({});
        const { result } = renderHook(() => useFirebaseAuthContext(), {
          wrapper: TestApp,
        });

        const token = await result.current.getIdToken();

        expect(token).toBe(expected);
      });

      it('should return null when not signed in', async () => {
        const TestApp = getTestApp({});
        const { result } = renderHook(() => useFirebaseAuthContext(), {
          wrapper: TestApp,
        });

        const token = await result.current.getIdToken();

        expect(token).toBeNull();
      });
    });

    describe('signOut', () => {
      it('should sign out via Firebase', async () => {
        const TestApp = getTestApp({});
        const { result } = renderHook(() => useFirebaseAuthContext(), {
          wrapper: TestApp,
        });

        await result.current.signOut();

        expect(mockSignOut).toBeCalled();
      });
    });

    describe('currentUser', () => {
      it('should return mapped user when signed in', () => {
        mockUseFirebaseContext.mockReturnValue({ app: {} });

        const TestApp = getTestApp({});
        const { result } = renderHook(() => useFirebaseAuthContext(), {
          wrapper: TestApp,
        });

        expect(result.current.currentUser).toEqual({
          id: '1',
        });
      });

      it('should return null when not signed in', () => {
        const TestApp = getTestApp({});
        const { result } = renderHook(() => useFirebaseAuthContext(), {
          wrapper: TestApp,
        });

        expect(result.current.currentUser).toBeNull();
      });
    });
  });

  describe('when in mocked mode', () => {
    it('should return current user when signed in', async () => {
      const TestApp = getTestApp();
      const { result } = renderHook(() => useFirebaseAuthContext(), {
        wrapper: TestApp,
      });

      await act(async () => {
        await result.current.signInWithCustomToken('token');
      });

      expect(result.current.currentUser).toEqual({ id: '1' });
    });

    it('should return null current user after signing out', async () => {
      const TestApp = getTestApp();
      const { result } = renderHook(() => useFirebaseAuthContext(), {
        wrapper: TestApp,
      });

      await act(async () => {
        await result.current.signInWithCustomToken('token');
      });
      expect(result.current.currentUser).toBeDefined();
      await act(async () => {
        await result.current.signOut();
      });

      expect(result.current.currentUser).toBeNull();
    });

    it('should return fake Firebase ID token', async () => {
      const TestApp = getTestApp();
      const { result } = renderHook(() => useFirebaseAuthContext(), {
        wrapper: TestApp,
      });

      const token = await result.current.getIdToken();

      expect(token).toBe('mock-firebase-id-token');
    });
  });
});
