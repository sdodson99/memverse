import { YouTubeChannelQuery } from '../youtube-channel-query';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { when } from 'jest-when';

jest.mock('axios');
const mockAxiosGet = axios.get as jest.Mock;
const mockAxiosIsAxiosError = axios.isAxiosError as unknown as jest.Mock;

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
    mockAxiosIsAxiosError.mockReset();
  });

  it("should return user's first YouTube channel", async () => {
    const id = '123';
    const displayName = 'displayName123';
    const photoUrl = 'photoUrl123';
    when(mockAxiosGet)
      .calledWith(requestEndpoint, requestOptions)
      .mockReturnValue({
        data: {
          items: [
            {
              id: id,
              snippet: {
                title: displayName,
                thumbnails: {
                  default: {
                    url: photoUrl,
                  },
                },
              },
            },
          ],
        },
      });

    const channel = await query.execute(accessToken);

    expect(channel).toEqual({
      id,
      displayName,
      photoUrl,
    });
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

  it('should return null if YouTube API request returns unauthorized', async () => {
    const axiosError = {
      response: {
        status: 401,
      },
    } as unknown as AxiosError;
    when(mockAxiosIsAxiosError).calledWith(axiosError).mockReturnValue(true);
    when(mockAxiosGet)
      .calledWith(requestEndpoint, requestOptions)
      .mockImplementation(() => {
        throw axiosError;
      });

    const channel = await query.execute(accessToken);

    expect(channel).toBeNull();
  });

  it('should throw error if YouTube API request throws error', async () => {
    const errorMessage = 'error-message';
    when(mockAxiosGet)
      .calledWith(requestEndpoint, requestOptions)
      .mockImplementation(() => {
        throw new Error(errorMessage);
      });

    await expect(query.execute(accessToken)).rejects.toThrow(errorMessage);
  });
});
