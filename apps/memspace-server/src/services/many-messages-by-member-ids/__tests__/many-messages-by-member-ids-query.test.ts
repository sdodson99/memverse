import { when } from 'jest-when';
import { MessageByMemberIdQuery } from '../../message-by-member-id';
import { ManyMessagesByMemberIdsQuery } from '../many-messages-by-member-ids-query';

describe('ManyMessagesByMemberIdsQuery', () => {
  let query: ManyMessagesByMemberIdsQuery;

  let mockMessageByMemberIdQueryExecute: jest.Mock;

  let memberIds: string[];

  beforeEach(() => {
    memberIds = ['1', '2', '3'];

    mockMessageByMemberIdQueryExecute = jest.fn();
    const messageByMemberIdQuery = {
      execute: mockMessageByMemberIdQueryExecute,
    } as unknown as MessageByMemberIdQuery;

    query = new ManyMessagesByMemberIdsQuery(messageByMemberIdQuery);
  });

  it('should return messages for members', async () => {
    mockMessageByMemberIdQueryExecute.mockResolvedValue(null);
    when(mockMessageByMemberIdQueryExecute).calledWith('1').mockResolvedValue({
      content: 'content',
    });

    const result = await query.execute(memberIds);

    expect(result['1']).toEqual({ content: 'content' });
    expect(result['2']).toBeNull();
    expect(result['3']).toBeNull();
  });
});
