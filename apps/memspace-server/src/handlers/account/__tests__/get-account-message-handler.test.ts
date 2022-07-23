import { Request, Response } from 'express';
import { when } from 'jest-when';
import { MessageByMemberIdQuery } from '../../../services/message-by-member-id';
import { GetAccountMessageHandler } from '../get-account-message-handler';

describe('GetAccountMessageHandler', () => {
  let handler: GetAccountMessageHandler;

  let mockMessageByMemberIdQueryExecute: jest.Mock;

  let req: Request;
  let res: Response;

  beforeEach(() => {
    mockMessageByMemberIdQueryExecute = jest.fn();
    const messageByMemberIdQuery = {
      execute: mockMessageByMemberIdQueryExecute,
    } as unknown as MessageByMemberIdQuery;

    handler = new GetAccountMessageHandler(messageByMemberIdQuery);

    req = {} as Request;
    res = {
      send: jest.fn(),
      sendStatus: jest.fn(),
    } as unknown as Response;
  });

  describe('when authenticated', () => {
    beforeEach(() => {
      req.user = {
        id: '123',
        isMember: () => true,
      };
    });

    it('should return message when user has message', async () => {
      const message = 'hello world';
      when(mockMessageByMemberIdQueryExecute)
        .calledWith(req.user?.id)
        .mockReturnValue({ content: message });

      await handler.handle(req, res);

      expect(res.send).toBeCalledWith({
        content: message,
      });
    });

    it('should return empty message when user has no message', async () => {
      when(mockMessageByMemberIdQueryExecute)
        .calledWith(req.user?.id)
        .mockReturnValue(null);

      await handler.handle(req, res);

      expect(res.send).toBeCalledWith({
        content: '',
      });
    });
  });

  it('should send 401 when unauthenticated', async () => {
    await handler.handle(req, res);

    expect(res.sendStatus).toBeCalledWith(401);
  });
});
