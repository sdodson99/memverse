import { authorizeIsMember } from '../authorize-is-member';
import { Request, Response } from 'express';

describe('authorizeIsMember middleware', () => {
  let req: Request;
  let res: Response;
  let next: jest.Mock;

  let mockStatus: jest.Mock;
  let mockSend: jest.Mock;

  beforeEach(() => {
    next = jest.fn();

    req = {} as Request;

    mockStatus = jest.fn();
    mockSend = jest.fn();
    mockStatus.mockReturnValue({
      send: mockSend,
    });
    res = {
      status: mockStatus,
    } as unknown as Response;
  });

  it('should return 401 when user not authenticated', () => {
    authorizeIsMember(req, res, next);

    expect(mockStatus).toBeCalledWith(401);
    expect(mockSend).toBeCalled();
  });

  it('should return 403 when user is not a member', () => {
    req.user = {
      id: '1',
      isMember: () => false,
    };

    authorizeIsMember(req, res, next);

    expect(mockStatus).toBeCalledWith(403);
    expect(mockSend).toBeCalledWith('User is not a member.');
  });

  it('should successfully continue when user is a member', () => {
    req.user = {
      id: '1',
      isMember: () => true,
    };

    authorizeIsMember(req, res, next);

    expect(next).toBeCalled();
  });
});
