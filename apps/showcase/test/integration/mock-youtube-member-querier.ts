import { MockYouTubeMembersQuery } from '../../src/features/view-members/mock-youtube-members-query';
import { Mock } from 'vitest';
import { YouTubeMember, YouTubeMembersQuery } from 'youtube-member-querier';

vi.mock('youtube-member-querier');
const ViMockYouTubeMembersQuery = YouTubeMembersQuery as Mock;

export const mockYouTubeMembers = {
  data: [] as YouTubeMember[],
};

beforeEach(() => {
  ViMockYouTubeMembersQuery.mockImplementation(
    () => new MockYouTubeMembersQuery(mockYouTubeMembers.data)
  );
});

afterEach(() => {
  ViMockYouTubeMembersQuery.mockReset();
  mockYouTubeMembers.data = [];
});
