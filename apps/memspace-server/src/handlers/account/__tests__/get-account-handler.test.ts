import { Request, Response } from 'express';
import { GetAccountHandler } from '../get-account-handler';

describe('GetAccountHandler', () => {
  let handler: GetAccountHandler;

  let req: Request;
  let res: Response;

  beforeEach(() => {
    handler = new GetAccountHandler();

    req = {} as Request;
    res = {
      send: jest.fn(),
      sendStatus: jest.fn(),
    } as unknown as Response;
  });

  it('should return account when authenticated', async () => {
    req.user = {
      id: '123',
    };

    await handler.handle(req, res);

    expect(res.send).toBeCalledWith({
      id: '123',
    });
  });

  it('should return 401 when unauthenticated', async () => {
    await handler.handle(req, res);

    expect(res.sendStatus).toBeCalledWith(401);
  });
});
