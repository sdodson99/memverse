import axios from 'axios';
import { YouTubeChannel } from './youtube-channel';
import { YouTubeChannelQueryResponse } from './youtube-channel-query-response';

const YOUTUBE_CHANNEL_ENDPOINT =
  'https://www.googleapis.com/youtube/v3/channels';

export class YouTubeChannelQuery {
  async execute(userAccessToken: string): Promise<YouTubeChannel | null> {
    const headers = {
      Authorization: `Bearer ${userAccessToken}`,
    };
    const params = {
      part: 'snippet',
      mine: true,
    };

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

    return youTubeChannels[0];
  }
}
