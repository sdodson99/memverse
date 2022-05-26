import axios from 'axios';
import { getMockExecutor } from '../mocks';
import { useMockTagContext } from './use-mock-tag-context';

export const useFetcher = () => {
  const mockTag = useMockTagContext();

  if (mockTag) {
    const mockExecutor = getMockExecutor(mockTag);

    return mockExecutor;
  }

  return axios;
};
