import supertest from 'supertest';
import { setupFirebase, generateAccessToken } from './utilities';

const functionsTest = setupFirebase();

describe('GET /account', () => {
  let app: any;

  beforeAll(() => {
    app = require('../../src/index').memspaceApi;
  });

  afterEach(() => {
    functionsTest.cleanup();
  });

  it('should return account when authorized', async () => {
    const token = generateAccessToken({ id: '123' });

    const { statusCode, body } = await supertest(app)
      .get('/account')
      .set('Authorization', `Bearer ${token}`);

    expect(statusCode).toBe(200);
    expect(body).toEqual({ id: '123' });
  });

  it('should return 401 when unauthorized', async () => {
    const { statusCode } = await supertest(app).get('/account');

    expect(statusCode).toBe(401);
  });
});
