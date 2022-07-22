import * as firebase from 'firebase-admin';
import { when } from 'jest-when';
import { Message } from '../../../models/message';
import { SaveMessageCommand } from '../save-message-command';

describe('SaveMessageCommand', () => {
  let command: SaveMessageCommand;

  let mockSet: jest.Mock;

  let memberId: string;
  let message: Message;

  beforeEach(() => {
    memberId = 'memberId';
    message = {
      content: 'hello world',
    };

    const messagesPath = 'messagesPath';

    mockSet = jest.fn();
    const mockChild = jest.fn();
    when(mockChild).calledWith(memberId).mockReturnValue({ set: mockSet });
    const mockRef = jest.fn();
    when(mockRef)
      .calledWith(messagesPath)
      .mockReturnValue({ child: mockChild });

    const mockFirebaseApp = {
      database: () => ({
        ref: mockRef,
      }),
    } as unknown as firebase.app.App;

    command = new SaveMessageCommand(mockFirebaseApp, messagesPath);
  });

  it('should save message for member', async () => {
    await command.execute(memberId, message);

    expect(mockSet).toBeCalledWith(message);
  });
});
