import { renderHook } from '@testing-library/react-hooks';
import { useFirebaseAuthContext } from '../use-firebase-auth-context';
import { getTestApp } from '../../../../test-utils/render-app';
import { signInWithCustomToken } from 'firebase/auth';

jest.mock('firebase/auth');
const mockSignInWithCustomToken = signInWithCustomToken as jest.Mock;

describe('useFirebaseAuthContext', () => {
  afterEach(() => {
    mockSignInWithCustomToken.mockReset();
  });

  describe('when in real mode', () => {
    let token: string;

    beforeEach(() => {
      token = 'custom-token';
    });

    describe('signInWithCustomToken', () => {
      it('should sign in via Firebase', async () => {
        const TestApp = getTestApp({});
        const { result } = renderHook(() => useFirebaseAuthContext(), {
          wrapper: TestApp,
        });

        await result.current.signInWithCustomToken(token);

        expect(mockSignInWithCustomToken).toBeCalledWith(undefined, token);
      });
    });
  });

  describe('when in mocked mode', () => {
    it('should return stubbed custom token sign in method', async () => {
      const TestApp = getTestApp();
      const { result } = renderHook(() => useFirebaseAuthContext(), {
        wrapper: TestApp,
      });

      expect(result.current.signInWithCustomToken).toBeDefined();
      expect(() => result.current.signInWithCustomToken('token')).not.toThrow();
    });
  });
});
