import * as jwt from 'jsonwebtoken';
import { authenticate } from '../authenticate';
import { Request, Response } from 'express';

jest.mock('jsonwebtoken');
const mockTokenVerify = jwt.verify as jest.Mock;

describe('authenticate middleware', () => {
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

  afterEach(() => {
    mockTokenVerify.mockReset();
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
    mockTokenVerify.mockImplementation((_token, _key, cb) => {
      cb(new Error());
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
      mockTokenVerify.mockImplementation((_token, _key, cb) => {
        cb(null, {
          id: 'user_id',
        });
      });
    });

    it('should set user on request', () => {
      authenticate(req, res, next);

      expect(req.user).toEqual({
        id: 'user_id',
      });
    });

    it('should execute next middleware', () => {
      authenticate(req, res, next);

      expect(next).toBeCalled();
    });
  });
});
