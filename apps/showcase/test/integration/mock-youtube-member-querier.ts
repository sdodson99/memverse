import { Mock } from 'vitest';
import { YouTubeMembersQuery } from 'youtube-member-querier';

vi.mock('youtube-member-querier');

const MockYouTubeMembersQuery = YouTubeMembersQuery as Mock;
const mockYouTubeMembersQueryExecute = vi.fn();

beforeEach(() => {
  MockYouTubeMembersQuery.mockReturnValue({
    execute: mockYouTubeMembersQueryExecute,
  });
  mockYouTubeMembersQueryExecute.mockReturnValue([]);
});

afterEach(() => {
  MockYouTubeMembersQuery.mockReset();
  mockYouTubeMembersQueryExecute.mockReset();
});

export { mockYouTubeMembersQueryExecute };
