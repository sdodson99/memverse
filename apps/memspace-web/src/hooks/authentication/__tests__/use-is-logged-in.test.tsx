import { useIsLoggedIn } from '../use-is-logged-in';
import { useFirebaseAuthContext } from '../firebase-auth/use-firebase-auth-context';

jest.mock('../firebase-auth/use-firebase-auth-context');
const mockUseFirebaseAuthContext = useFirebaseAuthContext as jest.Mock;

describe('useIsLoggedIn', () => {
  afterEach(() => {
    mockUseFirebaseAuthContext.mockReset();
  });

  it('should return true when current user exists', () => {
    mockUseFirebaseAuthContext.mockReturnValue({
      currentUser: {
        id: '123',
      },
    });

    const isLoggedIn = useIsLoggedIn();

    expect(isLoggedIn).toBeTruthy();
  });

  it('should return false when current user does not exist', () => {
    mockUseFirebaseAuthContext.mockReturnValue({
      currentUser: null,
    });

    const isLoggedIn = useIsLoggedIn();

    expect(isLoggedIn).toBeFalsy();
  });
});
