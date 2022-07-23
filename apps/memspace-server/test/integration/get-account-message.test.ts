import supertest from 'supertest';
import { setupFirebase } from './utilities';
import { MessageByMemberIdQuery } from '../../src/services/message-by-member-id';
import { mockAuthenticate } from './utilities';

const functionsTest = setupFirebase();

jest.mock('../../src/services/message-by-member-id');
const mockMessageByMemberIdQuery = MessageByMemberIdQuery as jest.Mock;

describe('GET /account/message', () => {
  let app: any;

  let mockMessageByMemberIdQueryExecute: jest.Mock;

  beforeAll(() => {
    mockMessageByMemberIdQueryExecute = jest.fn();
    mockMessageByMemberIdQuery.mockReturnValue({
      execute: mockMessageByMemberIdQueryExecute,
    });

    app = require('../../src/index').memspaceApi;
  });

  afterEach(() => {
    mockMessageByMemberIdQueryExecute.mockReset();

    functionsTest.cleanup();
  });

  it('should return user message when authorized', async () => {
    mockMessageByMemberIdQueryExecute.mockReturnValue({
      content: 'my-message',
    });
    const token = 'token123';
    mockAuthenticate(token);

    const { statusCode, body } = await supertest(app)
      .get('/account/message')
      .set('Authorization', `Bearer ${token}`);

    expect(statusCode).toBe(200);
    expect(body).toEqual({ content: 'my-message' });
  });

  it('should return empty message when authorized but user has no message saved', async () => {
    mockMessageByMemberIdQueryExecute.mockReturnValue(null);
    const token = 'token123';
    mockAuthenticate(token);

    const { statusCode, body } = await supertest(app)
      .get('/account/message')
      .set('Authorization', `Bearer ${token}`);

    expect(statusCode).toBe(200);
    expect(body).toEqual({ content: '' });
  });

  it('should return 401 when unauthorized', async () => {
    const { statusCode } = await supertest(app).get('/account/message');

    expect(statusCode).toBe(401);
  });
});
