import { YouTubeMembersQuery } from 'youtube-member-querier';
import { ManyMessagesByMemberIdsQuery } from '../../many-messages-by-member-ids';
import { AllMembersQuery } from '../all-members-query';

describe('AllMembersQuery', () => {
  let query: AllMembersQuery;

  let mockYouTubeMembersQueryExecute: jest.Mock;
  let mockManyMessagesByMemberIdsQueryExecute: jest.Mock;

  beforeEach(() => {
    mockYouTubeMembersQueryExecute = jest.fn();
    const youTubeMembersQuery = {
      execute: mockYouTubeMembersQueryExecute,
    } as unknown as YouTubeMembersQuery;

    mockManyMessagesByMemberIdsQueryExecute = jest.fn();
    const manyMessagesByMemberIdsQuery = {
      execute: mockManyMessagesByMemberIdsQueryExecute,
    } as unknown as ManyMessagesByMemberIdsQuery;

    query = new AllMembersQuery(
      youTubeMembersQuery,
      manyMessagesByMemberIdsQuery
    );

    mockYouTubeMembersQueryExecute.mockReturnValue([
      {
        channelId: '1',
      },
      {
        channelId: '2',
      },
    ]);
    mockManyMessagesByMemberIdsQueryExecute.mockReturnValue({});
  });

  it('should return members with populated messages', async () => {
    mockManyMessagesByMemberIdsQueryExecute.mockReturnValue({
      '1': {
        content: 'content',
      },
    });

    const members = await query.execute();

    expect(members).toEqual([
      {
        id: '1',
        message: 'content',
      },
      {
        id: '2',
        message: '',
      },
    ]);
  });
});
