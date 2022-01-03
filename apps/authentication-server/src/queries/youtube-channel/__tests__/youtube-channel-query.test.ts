import { YouTubeChannelQuery } from '../youtube-channel-query';
import axios, { AxiosRequestConfig } from 'axios';
import { when } from 'jest-when';

jest.mock('axios');
const mockAxiosGet = axios.get as jest.Mock;

describe('YouTubeChannelQuery', () => {
  let query: YouTubeChannelQuery;

  let requestEndpoint: string;
  let requestOptions: AxiosRequestConfig;

  let accessToken: string;

  beforeEach(() => {
    query = new YouTubeChannelQuery();

    accessToken = 'access-token';

    requestEndpoint = 'https://www.googleapis.com/youtube/v3/channels';
    requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        part: 'snippet',
        mine: true,
      },
    };
  });

  afterEach(() => {
    mockAxiosGet.mockReset();
  });

  it("should return user's first YouTube channel", async () => {
    const expectedChannel = {
      id: '123',
    };
    when(mockAxiosGet)
      .calledWith(requestEndpoint, requestOptions)
      .mockReturnValue({
        data: {
          items: [expectedChannel],
        },
      });

    const channel = await query.execute(accessToken);

    expect(channel).toBe(expectedChannel);
  });

  it('should return null if user has no YouTube channel', async () => {
    when(mockAxiosGet)
      .calledWith(requestEndpoint, requestOptions)
      .mockReturnValue({
        data: {},
      });

    const channel = await query.execute(accessToken);

    expect(channel).toBeNull();
  });
});
