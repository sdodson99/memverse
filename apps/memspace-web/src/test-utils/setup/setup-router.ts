import { useRouter } from 'next/router';

jest.mock('next/router');
const mockUseRouter = useRouter as jest.Mock;

beforeEach(() => {
  mockUseRouter.mockReturnValue({});
});

afterEach(() => {
  mockUseRouter.mockReset();
});

export {};
