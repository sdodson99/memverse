import { authenticate } from '../authenticate';
import { Request, Response } from 'express';
import { auth } from 'firebase-admin';

jest.mock('firebase-admin', () => ({
  ...jest.requireActual('firebase-admin'),
  auth: jest.fn(),
}));
const mockFirebaseAuth = auth as jest.Mock;

describe('authenticate middleware', () => {
  let req: Request;
  let res: Response;
  let next: jest.Mock;

  let mockStatus: jest.Mock;
  let mockSend: jest.Mock;

  let mockVerifyIdToken: jest.Mock;

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

    mockVerifyIdToken = jest.fn();
    mockFirebaseAuth.mockReturnValue({
      verifyIdToken: mockVerifyIdToken,
    });
  });

  afterEach(() => {
    mockFirebaseAuth.mockReset();
  });

  it('should return 401 when no access token provided', () => {
    req.headers = {
      authorization: undefined,
    };

    authenticate(req, res, next);

    expect(mockStatus).toBeCalledWith(401);
    expect(mockSend).toBeCalledWith('No access token provided.');
  });

  it('should return 401 when bearer scheme not specified', () => {
    req.headers = {
      authorization: '123',
    };

    authenticate(req, res, next);

    expect(mockStatus).toBeCalledWith(401);
    expect(mockSend).toBeCalledWith('Must provide authentication scheme.');
  });

  it('should return 401 when access token invalid', () => {
    req.headers = {
      authorization: 'Bearer 123',
    };
    mockVerifyIdToken.mockImplementation(() => {
      throw new Error();
    });

    authenticate(req, res, next);

    expect(mockStatus).toBeCalledWith(401);
    expect(mockSend).toBeCalledWith('Invalid access token.');
  });

  describe('with verified token', () => {
    beforeEach(() => {
      req.headers = {
        authorization: 'Bearer 123',
      };
      mockVerifyIdToken.mockResolvedValue({
        uid: 'user_id',
        memberAsOf: '123',
      });
    });

    it('should set user on request', async () => {
      await authenticate(req, res, next);

      expect(req.user?.id).toBe('user_id');
    });

    it('should execute next middleware', async () => {
      await authenticate(req, res, next);

      expect(next).toBeCalled();
    });
  });
});
