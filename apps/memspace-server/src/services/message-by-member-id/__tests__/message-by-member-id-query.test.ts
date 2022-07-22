import * as firebase from 'firebase-admin';
import { when } from 'jest-when';
import { MessageByMemberIdQuery } from '../message-by-member-id-query';

describe('MessageByMemberIdQuery', () => {
  let query: MessageByMemberIdQuery;

  let mockGet: jest.Mock;

  let memberId: string;

  beforeEach(() => {
    const messagesPath = 'messagesPath';

    memberId = 'memberId';

    mockGet = jest.fn();
    const mockChild = jest.fn();
    when(mockChild).calledWith(memberId).mockReturnValue({ get: mockGet });
    const mockRef = jest.fn();
    when(mockRef)
      .calledWith(messagesPath)
      .mockReturnValue({ child: mockChild });

    const mockFirebaseApp = {
      database: () => ({
        ref: mockRef,
      }),
    } as unknown as firebase.app.App;

    query = new MessageByMemberIdQuery(mockFirebaseApp, messagesPath);
  });

  it('should return message for member', async () => {
    const expected = {
      content: 'hello world',
    };
    mockGet.mockReturnValue({
      exists: () => true,
      val: () => expected,
    });

    const result = await query.execute(memberId);

    expect(result).toEqual(expected);
  });

  it('should return null when member message not found', async () => {
    mockGet.mockReturnValue({
      exists: () => false,
    });

    const result = await query.execute(memberId);

    expect(result).toBeNull();
  });
});
