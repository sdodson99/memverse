import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import { useFetcher } from '../use-fetcher';
import { useMockTagContext } from '../use-mock-tag-context';

jest.mock('../use-mock-tag-context');
const mockUseMockTagContext = useMockTagContext as jest.Mock;

describe('useFetcher', () => {
  afterEach(() => {
    mockUseMockTagContext.mockReset();
  });

  it('should return axios when no mock provided', () => {
    const { result } = renderHook(() => useFetcher());

    expect(result.current).toBe(axios);
  });

  it('should return mock fetcher when mock provided', () => {
    mockUseMockTagContext.mockReturnValue('mock');

    const { result } = renderHook(() => useFetcher());

    expect(result.current).not.toBe(axios);
  });
});
