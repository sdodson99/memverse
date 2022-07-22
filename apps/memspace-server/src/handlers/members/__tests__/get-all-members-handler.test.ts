import { Request, Response } from 'express';
import { AllMembersQuery } from '../../../services/all-members';
import { GetAllMembersHandler } from '../get-all-members-handler';

describe('GetAllMembersHandler', () => {
  let handler: GetAllMembersHandler;

  let mockAllMembersQueryExecute: jest.Mock;

  let req: Request;
  let res: Response;

  beforeEach(() => {
    mockAllMembersQueryExecute = jest.fn();
    const allMembersQuery = {
      execute: mockAllMembersQueryExecute,
    } as unknown as AllMembersQuery;

    handler = new GetAllMembersHandler(allMembersQuery);

    req = {} as Request;
    res = {
      send: jest.fn(),
    } as unknown as Response;
  });

  it('should return all members', async () => {
    const members = { id: '1' };
    mockAllMembersQueryExecute.mockReturnValue(members);

    await handler.handle(req, res);

    expect(res.send).toBeCalledWith(members);
  });
});
