import { renderHook } from '@testing-library/react-hooks';
import { TestApp } from '../../test-utils/render-app';
import { Url, useNavigate } from '../use-navigate';
import { useRouter } from 'next/router';

const mockUseRouter = useRouter as jest.Mock;

describe('useNavigate', () => {
  let url: Url;
  let mockRouterPush: jest.Mock;

  beforeEach(() => {
    url = {
      pathname: '/',
    };

    mockRouterPush = jest.fn();
  });

  it('should navigate to url', () => {
    mockUseRouter.mockReturnValue({
      isReady: true,
      push: mockRouterPush,
      query: {},
    });
    const { result } = renderHook(() => useNavigate(), { wrapper: TestApp });

    result.current(url);

    expect(mockRouterPush).toBeCalledWith(url);
  });

  it('should navigate to url with mock tag when mock tag provided', () => {
    mockUseRouter.mockReturnValue({
      isReady: true,
      push: mockRouterPush,
      query: {
        mock: 'base-mock',
      },
    });
    const { result } = renderHook(() => useNavigate(), { wrapper: TestApp });

    result.current(url);

    expect(mockRouterPush).toBeCalledWith({
      pathname: '/',
      query: {
        mock: 'base-mock',
      },
    });
  });
});
