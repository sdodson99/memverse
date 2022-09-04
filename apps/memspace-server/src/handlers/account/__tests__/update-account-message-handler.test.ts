import { Request, Response } from 'express';
import functions from 'firebase-functions';
import { SaveMessageCommand } from '../../../services/save-message';
import { UpdateAccountMessageHandler } from '../update-account-message-handler';

describe('UpdateAccountMessageHandler', () => {
  let handler: UpdateAccountMessageHandler;

  let mockSaveMessageCommandExecute: jest.Mock;

  let req: Request;
  let res: Response;

  beforeEach(() => {
    mockSaveMessageCommandExecute = jest.fn();
    const saveMessageCommand = {
      execute: mockSaveMessageCommandExecute,
    } as unknown as SaveMessageCommand;

    handler = new UpdateAccountMessageHandler(
      saveMessageCommand,
      functions.logger
    );

    req = {} as Request;
    res = {
      sendStatus: jest.fn(),
    } as unknown as Response;
  });

  describe('when authenticated', () => {
    let message: string;

    beforeEach(async () => {
      req.user = {
        id: '123',
        isMember: () => true,
      };

      message = 'hello world';
      req.body = { content: message };
    });

    it('should save message for user', async () => {
      await handler.handle(req, res);

      expect(mockSaveMessageCommandExecute).toBeCalledWith(req.user?.id, {
        content: message,
      });
    });

    it('should send 204', async () => {
      await handler.handle(req, res);

      expect(res.sendStatus).toBeCalledWith(204);
    });
  });

  it('should send 401 when unauthenticated', async () => {
    await handler.handle(req, res);

    expect(res.sendStatus).toBeCalledWith(401);
  });
});
