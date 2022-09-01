import { NonMemberError, useApplicationLogin } from '../use-application-login';
import { renderHook } from '@testing-library/react-hooks';
import { getTestApp } from '../../../test-utils/render-app';

describe('useApplicationLogin', () => {
  describe('login', () => {
    let token: string;

    beforeEach(() => {
      token = '123';
    });

    it('should return access token when successful', async () => {
      const TestApp = getTestApp({ mockTag: 'base' });
      const { result } = renderHook(() => useApplicationLogin(), {
        wrapper: TestApp,
      });

      const accessToken = await result.current.login(token);

      expect(accessToken).toBe('mock-access-token');
    });

    it('should throw if request fails', async () => {
      const TestApp = getTestApp({ mockTag: 'loginfailed' });
      const { result } = renderHook(() => useApplicationLogin(), {
        wrapper: TestApp,
      });

      await expect(result.current.login(token)).rejects.toThrow();
    });

    it('should throw NonMemberError if request fails with 403 status code', async () => {
      const TestApp = getTestApp({ mockTag: 'loginnonmember' });
      const { result } = renderHook(() => useApplicationLogin(), {
        wrapper: TestApp,
      });

      await expect(result.current.login(token)).rejects.toThrow(NonMemberError);
    });
  });
});
