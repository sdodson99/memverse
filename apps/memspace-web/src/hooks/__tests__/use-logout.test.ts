import { useAccessTokenContext } from '../use-access-token-context';
import { useLogout } from '../use-logout';

jest.mock('../use-access-token-context');
const mockUseAccessTokenContext = useAccessTokenContext as jest.Mock;

describe('useLogout', () => {
  let mockClearAccessToken: jest.Mock;

  beforeEach(() => {
    mockClearAccessToken = jest.fn();

    mockUseAccessTokenContext.mockReturnValue({
      clearAccessToken: mockClearAccessToken,
    });
  });

  afterEach(() => {
    mockUseAccessTokenContext.mockReset();
  });

  describe('logout', () => {
    it('should clear access token', () => {
      const logout = useLogout();

      logout();

      expect(mockClearAccessToken).toBeCalled();
    });
  });
});
