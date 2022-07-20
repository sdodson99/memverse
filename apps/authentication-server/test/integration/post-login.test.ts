import supertest from 'supertest';
import { setupFirebase } from './utilities';
import { YouTubeMembersQuery } from 'youtube-member-querier';
import axios from 'axios';
import { when } from 'jest-when';
import { auth } from 'firebase-admin';

const functionsTest = setupFirebase();

jest.mock('youtube-member-querier');
const mockYouTubeMembersQuery = YouTubeMembersQuery as jest.Mock;

jest.mock('axios');
const mockAxiosGet = axios.get as jest.Mock;

jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn(),
  auth: jest.fn(),
}));
const mockFirebaseAuth = auth as jest.Mock;

describe('POST /login', () => {
  let app: any;

  let mockYouTubeMembersQueryExecute: jest.Mock;
  let mockGetUsers: jest.Mock;
  let mockCreateCustomToken: jest.Mock;

  beforeAll(() => {
    mockYouTubeMembersQueryExecute = jest.fn();
    mockYouTubeMembersQuery.mockReturnValue({
      execute: mockYouTubeMembersQueryExecute,
    });

    mockGetUsers = jest.fn();
    mockCreateCustomToken = jest.fn();
    mockFirebaseAuth.mockReturnValue({
      getUsers: mockGetUsers,
      setCustomUserClaims: jest.fn(),
      createCustomToken: mockCreateCustomToken,
    });

    app = require('../../src/index').authenticationApi;
  });

  afterEach(() => {
    mockYouTubeMembersQuery.mockReset();
    mockAxiosGet.mockReset();
    mockGetUsers.mockReset();

    functionsTest.cleanup();
  });

  it('should return access token when user is a member', async () => {
    const accessToken = 'access-token';
    const channelId = 'channel-1';
    when(mockAxiosGet)
      .calledWith('https://www.googleapis.com/youtube/v3/channels', {
        params: {
          part: 'snippet',
          mine: true,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .mockReturnValue({
        data: {
          items: [
            {
              id: channelId,
            },
          ],
        },
      });
    mockYouTubeMembersQueryExecute.mockReturnValue([
      { channelId: 'channel-1' },
    ]);
    when(mockGetUsers)
      .calledWith([{ uid: 'channel-1' }])
      .mockReturnValue({ users: ['1'] });
    const customToken = 'custom-token123';
    when(mockCreateCustomToken)
      .calledWith('channel-1')
      .mockReturnValue(customToken);

    const { statusCode, body } = await supertest(app)
      .post('/login')
      .send({ accessToken });

    expect(statusCode).toBe(200);
    expect(body.token).toBeDefined();
    expect(body.accessToken).toBe(customToken);
    expect(body.expiresIn).toBe(3600);
  });

  it('should return 401 when no Google access token sent', async () => {
    const { statusCode } = await supertest(app).post('/login');

    expect(statusCode).toBe(401);
  });

  it('should return 401 when user has no YouTube channels', async () => {
    const accessToken = 'access-token';
    when(mockAxiosGet)
      .calledWith('https://www.googleapis.com/youtube/v3/channels', {
        params: {
          part: 'snippet',
          mine: true,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .mockReturnValue({ data: { items: [] } });

    const { statusCode } = await supertest(app)
      .post('/login')
      .send({ accessToken });

    expect(statusCode).toBe(401);
  });

  it('should return 403 when user is not a member', async () => {
    const accessToken = 'access-token';
    const channelId = 'channel-1';
    when(mockAxiosGet)
      .calledWith('https://www.googleapis.com/youtube/v3/channels', {
        params: {
          part: 'snippet',
          mine: true,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .mockReturnValue({
        data: {
          items: [
            {
              id: channelId,
            },
          ],
        },
      });
    mockYouTubeMembersQueryExecute.mockReturnValue([
      { channelId: 'channel-2' },
    ]);

    const { statusCode } = await supertest(app)
      .post('/login')
      .send({ accessToken });

    expect(statusCode).toBe(403);
  });
});
