import { when } from 'jest-when';
import { YouTubeMembersQuery } from '../youtube-members-query';
import { YouTubeMembersQueryOptions } from '../youtube-members-query-options';
import axios, { AxiosRequestConfig } from 'axios';

jest.mock('axios');
const mockAxiosPost = axios.post as jest.Mock;

describe('YouTubeMembersQuery', () => {
  let query: YouTubeMembersQuery;
  let options: YouTubeMembersQueryOptions;

  let requestEndpoint: string;
  let requestBody: any;
  let requestOptions: AxiosRequestConfig;

  beforeEach(() => {
    options = {
      apiKey: 'api-key',
      authorizationHeader: 'auth-header',
      channelId: 'channel-id',
      cookieHeader: 'cookie-header',
      onBehalfOfUser: 'user-id',
    };

    query = new YouTubeMembersQuery(options);

    requestEndpoint =
      'https://studio.youtube.com/youtubei/v1/sponsors/creator_sponsorships_sponsors';
    requestBody = {
      context: {
        client: {
          clientName: 62,
          clientVersion: '1.20211213.02.00',
        },
        user: {
          onBehalfOfUser: options.onBehalfOfUser,
        },
      },
      externalChannelId: options.channelId,
      sponsorsOptions: {
        pageSize: 1000,
      },
    };
    requestOptions = {
      headers: {
        'x-origin': 'https://studio.youtube.com',
        authorization: options.authorizationHeader,
        cookie: options.cookieHeader,
      },
      params: {
        alt: 'json',
        key: options.apiKey,
      },
    };
  });

  afterEach(() => {
    mockAxiosPost.mockReset();
  });

  it('should return YouTube channel members when successful', async () => {
    when(mockAxiosPost)
      .calledWith(requestEndpoint, requestBody, requestOptions)
      .mockReturnValue({
        data: {
          sponsorsData: {
            sponsors: [
              {
                externalChannelId: '1',
              },
            ],
          },
        },
      });

    const members = await query.execute();

    expect(members).toEqual([
      {
        channelId: '1',
      },
    ]);
  });

  it('should return empty array when unsuccessful', async () => {
    when(mockAxiosPost)
      .calledWith(requestEndpoint, requestBody, requestOptions)
      .mockReturnValue({
        data: {},
      });

    const members = await query.execute();

    expect(members).toEqual([]);
  });
});
