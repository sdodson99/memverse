import { useSearchParams } from 'next/navigation';
import { Mock } from 'vitest';

vi.mock('next/navigation');
const mockUseSearchParams = useSearchParams as Mock;

export const mockSearchParams = new URLSearchParams();

beforeEach(() => {
  mockUseSearchParams.mockImplementation(() => mockSearchParams);
});

afterEach(() => {
  mockUseSearchParams.mockReset();
});
