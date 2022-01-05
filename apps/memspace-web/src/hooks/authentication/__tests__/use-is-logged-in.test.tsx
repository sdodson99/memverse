import { useAccessTokenContext } from '../use-access-token-context';
import { useIsLoggedIn } from '../use-is-logged-in';

jest.mock('../use-access-token-context');
const mockUseAccessTokenContext = useAccessTokenContext as jest.Mock;

describe('useIsLoggedIn', () => {
  afterEach(() => {
    mockUseAccessTokenContext.mockReset();
  });

  it('should return true if user has non-expired token', () => {
    mockUseAccessTokenContext.mockReturnValue({
      hasToken: true,
      isExpired: () => false,
    });

    const isLoggedIn = useIsLoggedIn();

    expect(isLoggedIn).toBeTruthy();
  });

  it('should return false if user has no token', () => {
    mockUseAccessTokenContext.mockReturnValue({
      hasToken: false,
      isExpired: () => false,
    });

    const isLoggedIn = useIsLoggedIn();

    expect(isLoggedIn).toBeFalsy();
  });

  it('should return false if user has expired token', () => {
    mockUseAccessTokenContext.mockReturnValue({
      hasToken: true,
      isExpired: () => true,
    });

    const isLoggedIn = useIsLoggedIn();

    expect(isLoggedIn).toBeFalsy();
  });
});
