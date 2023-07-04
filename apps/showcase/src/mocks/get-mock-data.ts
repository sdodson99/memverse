import { base } from './data/base';

const mockData: Record<string, typeof base> = {
  base,
};

export function getMockData(mock: string) {
  return mockData[mock.toLowerCase()] ?? mockData.base;
}
