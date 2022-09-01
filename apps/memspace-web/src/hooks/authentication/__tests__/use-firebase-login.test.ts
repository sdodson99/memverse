import { useFirebaseLogin } from '../use-firebase-login';
import { renderHook } from '@testing-library/react-hooks';
import { getTestApp } from '../../../test-utils/render-app';
import { signInWithCustomToken } from 'firebase/auth';

jest.mock('firebase/auth');
const mockSignInWithCustomToken = signInWithCustomToken as jest.Mock;

describe('useFirebaseLogin', () => {
  afterEach(() => {
    mockSignInWithCustomToken.mockReset();
  });

  describe('login', () => {
    let token: string;

    beforeEach(() => {
      token = '123';
    });

    it('should login with Firebase', async () => {
      const TestApp = getTestApp({});
      const { result } = renderHook(() => useFirebaseLogin(), {
        wrapper: TestApp,
      });

      await result.current.login(token);

      expect(mockSignInWithCustomToken).toBeCalledWith(undefined, token);
    });
  });
});
