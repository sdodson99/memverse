import axios, { AxiosResponse } from 'axios';
import { getMockData } from '../mocks';
import { useMockTagContext } from './use-mock-tag-context';

export const useFetcher = () => {
  const mockTag = useMockTagContext();

  if (mockTag) {
    const mockData = getMockData(mockTag);

    return {
      get: <T = unknown, R = AxiosResponse<T>, _D = unknown>(
        url: string
      ): Promise<R> => {
        return Promise.resolve(mockData.get(url) as unknown as R);
      },
    };
  }

  return axios;
};
