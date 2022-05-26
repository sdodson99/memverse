import { AxiosResponse } from 'axios';
import { base } from './tags/base';

const MOCK_TAG_EXECUTOR_MAP: Record<string, typeof base> = {
  base,
};

export const getMockExecutor = (mockTag: string) => {
  const mockTagExecutor = MOCK_TAG_EXECUTOR_MAP[mockTag] ?? base;

  return {
    get: <T = unknown, R = AxiosResponse<T>, _D = unknown>(
      url: string
    ): Promise<R> =>
      (mockTagExecutor.get[url]?.() ?? {}) as unknown as Promise<R>,

    post: <T = unknown, R = AxiosResponse<T>, D = unknown>(
      url: string,
      data?: D | undefined
    ): Promise<R> =>
      (mockTagExecutor.post[url]?.(data) ?? {}) as unknown as Promise<R>,

    put: <T = unknown, R = AxiosResponse<T>, D = unknown>(
      url: string,
      data?: D | undefined
    ): Promise<R> =>
      (mockTagExecutor.put[url]?.(data) ?? {}) as unknown as Promise<R>,
  };
};
