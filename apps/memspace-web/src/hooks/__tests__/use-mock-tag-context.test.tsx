import { useRouter } from 'next/router';
import { useMockTagContext, MockTagProvider } from '../use-mock-tag-context';
import { renderHook } from '@testing-library/react-hooks';
import { isProduction } from '../../configuration';

jest.mock('next/router');
const mockUseRouter = useRouter as jest.Mock;

jest.mock('../../configuration');
const mockIsProduction = isProduction as jest.Mock;

describe('useMockTagContext', () => {
  let mockTag: string;

  beforeEach(() => {
    mockTag = 'super-mock';

    mockUseRouter.mockReturnValue({
      isReady: true,
      query: {
        mock: mockTag,
      },
    });
    mockIsProduction.mockReturnValue(false);
  });

  afterEach(() => {
    mockUseRouter.mockReset();
    mockIsProduction.mockReset();
  });

  it('should return mock tag when ready in non-production', () => {
    const { result } = renderHook(() => useMockTagContext(), {
      wrapper: MockTagProvider,
    });

    expect(result.current).toBe(mockTag);
  });

  it('should return lowercase mock tag', () => {
    const upperMockTag = 'SUPER-MOCK';
    mockUseRouter.mockReturnValue({
      isReady: true,
      query: {
        mock: upperMockTag,
      },
    });

    const { result } = renderHook(() => useMockTagContext(), {
      wrapper: MockTagProvider,
    });

    expect(result.current).toBe(mockTag);
  });

  it('should not render when mock tag loading in non-production', () => {
    mockUseRouter.mockReturnValue({
      isReady: false,
      query: {
        mock: mockTag,
      },
    });

    const { result } = renderHook(() => useMockTagContext(), {
      wrapper: MockTagProvider,
    });

    expect(result.current).toBeUndefined();
  });

  it('should not return mock tag in production', () => {
    mockIsProduction.mockReturnValue(true);

    const { result } = renderHook(() => useMockTagContext(), {
      wrapper: MockTagProvider,
    });

    expect(result.current).toBeNull();
  });
});
