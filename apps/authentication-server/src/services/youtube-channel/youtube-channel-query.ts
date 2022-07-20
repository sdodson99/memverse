import axios, { AxiosError } from 'axios';
import { YouTubeChannel } from './youtube-channel';
import { YouTubeChannelQueryResponse } from './youtube-channel-query-response';

const YOUTUBE_CHANNEL_ENDPOINT =
  'https://www.googleapis.com/youtube/v3/channels';

export class YouTubeChannelQuery {
  /**
   * Get a user's YouTube channel.
   * @param userAccessToken The YouTube user access token.
   * @return The user's YouTube channel. Null if channel not found.
   * @throws {Error} Thrown if query fails.
   */
  async execute(userAccessToken: string): Promise<YouTubeChannel | null> {
    const headers = {
      Authorization: `Bearer ${userAccessToken}`,
    };
    const params = {
      part: 'snippet',
      mine: true,
    };

    try {
      const { data } = await axios.get<YouTubeChannelQueryResponse>(
        YOUTUBE_CHANNEL_ENDPOINT,
        {
          headers,
          params,
        }
      );

      const youTubeChannels = data?.items;
      const hasYouTubeChannels = youTubeChannels?.length > 0;

      if (!hasYouTubeChannels) {
        return null;
      }

      const firstYouTubeChannel = youTubeChannels[0];

      return {
        id: firstYouTubeChannel.id,
        displayName: firstYouTubeChannel.snippet?.title,
        photoUrl: firstYouTubeChannel.snippet?.thumbnails?.default?.url,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError = error;

        if (axiosError.response?.status === 401) {
          return null;
        }
      }

      throw error;
    }
  }
}
