import { renderHook } from '@testing-library/react-hooks';
import { useMemberMessage } from '../use-member-message';
import { waitFor } from '@testing-library/react';
import { getTestApp } from '../../../test-utils/render-app';

describe('useMemberMessage', () => {
  it('should return message for user', async () => {
    const expectedMessage = 'Hello world!';
    const TestApp = getTestApp({ mockTag: 'existingmembermessage' });

    const { result } = renderHook(() => useMemberMessage(), {
      wrapper: TestApp,
    });

    await waitFor(() => {
      expect(result.current.message).toBe(expectedMessage);
    });
  });

  it('should return empty message when user has no message', async () => {
    const expectedMessage = '';
    const TestApp = getTestApp();

    const { result } = renderHook(() => useMemberMessage(), {
      wrapper: TestApp,
    });

    await waitFor(() => {
      expect(result.current.message).toBe(expectedMessage);
    });
  });

  it('should return error when fetch fails', async () => {
    const TestApp = getTestApp({ mockTag: 'getmembermessagefailed' });

    const { result } = renderHook(() => useMemberMessage(), {
      wrapper: TestApp,
    });

    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});
