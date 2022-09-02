import { useFirebaseAuthContext } from '../firebase-auth/use-firebase-auth-context';
import { useLogout } from '../use-logout';

jest.mock('../firebase-auth/use-firebase-auth-context');
const mockUseFirebaseAuthContext = useFirebaseAuthContext as jest.Mock;

describe('useLogout', () => {
  let mockSignOut: jest.Mock;

  beforeEach(() => {
    mockSignOut = jest.fn();

    mockUseFirebaseAuthContext.mockReturnValue({
      signOut: mockSignOut,
    });
  });

  afterEach(() => {
    mockUseFirebaseAuthContext.mockReset();
  });

  describe('logout', () => {
    it('should sign out through Firebase', () => {
      const logout = useLogout();

      logout();

      expect(mockSignOut).toBeCalled();
    });
  });
});
