import supertest from 'supertest';
import { setupFirebase, generateAccessToken } from './utilities';
import { SaveMessageCommand } from '../../src/commands/save-message';

const functionsTest = setupFirebase();

jest.mock('../../src/commands/save-message');
const mockSaveMessageCommand = SaveMessageCommand as jest.Mock;

describe('PUT /account/message', () => {
  let app: any;

  let mockSaveMessageCommandExecute: jest.Mock;

  beforeAll(() => {
    mockSaveMessageCommandExecute = jest.fn();
    mockSaveMessageCommand.mockReturnValue({
      execute: mockSaveMessageCommandExecute,
    });

    app = require('../../src/index').memspaceApi;
  });

  afterEach(() => {
    mockSaveMessageCommandExecute.mockReset();

    functionsTest.cleanup();
  });

  it('should update message when authorized', async () => {
    const token = generateAccessToken();

    const { statusCode } = await supertest(app)
      .put('/account/message')
      .send({
        content: 'hello world',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(statusCode).toBe(204);
    expect(mockSaveMessageCommandExecute).toBeCalledWith('123', {
      content: 'hello world',
    });
  });

  it('should clear message when no message content specified', async () => {
    const token = generateAccessToken();

    const { statusCode } = await supertest(app)
      .put('/account/message')
      .send({})
      .set('Authorization', `Bearer ${token}`);

    expect(statusCode).toBe(204);
    expect(mockSaveMessageCommandExecute).toBeCalledWith('123', {
      content: '',
    });
  });

  it('should clear message when message body not provided', async () => {
    const token = generateAccessToken();

    const { statusCode } = await supertest(app)
      .put('/account/message')
      .set('Authorization', `Bearer ${token}`);

    expect(statusCode).toBe(204);
    expect(mockSaveMessageCommandExecute).toBeCalledWith('123', {
      content: '',
    });
  });

  it('should return 400 when message content too long', async () => {
    const token = generateAccessToken();

    const { statusCode } = await supertest(app)
      .put('/account/message')
      .send({
        content: new Array(102).join('a'),
      })
      .set('Authorization', `Bearer ${token}`);

    expect(statusCode).toBe(400);
  });

  it('should return 401 when unauthorized', async () => {
    const { statusCode } = await supertest(app).put('/account/message');

    expect(statusCode).toBe(401);
  });
});
