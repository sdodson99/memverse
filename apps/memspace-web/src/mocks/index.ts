import { base } from './tags/base';

const MOCK_TAG_DATA_MAP: Record<string, typeof base> = {
  base,
};

export const getMockData = (mockTag: string) => {
  const mockTagData = MOCK_TAG_DATA_MAP[mockTag] ?? base;

  return {
    get: (url: string) => mockTagData.get[url] ?? {},
  };
};
