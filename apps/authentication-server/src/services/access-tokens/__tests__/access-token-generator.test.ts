import { when } from 'jest-when';
import { AccessTokenGenerator } from '../access-token-generator';
import * as jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');
const mockJwtSign = jwt.sign as jest.Mock;

describe('AccessTokenGenerator', () => {
  let tokenGenerator: AccessTokenGenerator;

  let secretKey: string;
  let expiresIn: number;

  let userId: string;

  beforeEach(() => {
    secretKey = 'secret-key';
    expiresIn = 3600;

    tokenGenerator = new AccessTokenGenerator(secretKey, expiresIn);

    userId = '123';
  });

  afterEach(() => {
    mockJwtSign.mockReset();
  });

  it('should return signed JWT', () => {
    const expectedToken = 'token';
    when(mockJwtSign)
      .calledWith({ id: userId }, secretKey, { expiresIn })
      .mockReturnValue(expectedToken);

    const accessToken = tokenGenerator.generate(userId);

    expect(accessToken.token).toBe(expectedToken);
    expect(accessToken.expiresIn).toBe(expiresIn);
  });
});
