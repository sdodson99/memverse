import 'server-only';

const YOUTUBE_CHANNEL_ENDPOINT =
  'https://www.googleapis.com/youtube/v3/channels';

type YouTubeChannel = {
  id: string;
};

type YouTubeChannelQueryResponse = {
  items: YouTubeChannelResponse[];
};

type YouTubeChannelResponse = {
  id: string;
  snippet: {
    title: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
  };
};

export class GetYouTubeChannelQuery {
  constructor(private fetch: typeof global.fetch) {}

  async execute(accessToken: string): Promise<YouTubeChannel | null> {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const youTubeChannelUrl = new URL(YOUTUBE_CHANNEL_ENDPOINT);

    youTubeChannelUrl.searchParams.set('part', 'snippet');
    youTubeChannelUrl.searchParams.set('mine', 'true');

    try {
      const response = await this.fetch(youTubeChannelUrl.toString(), {
        headers,
      });

      if (!response.ok) {
        return null;
      }

      const data: YouTubeChannelQueryResponse = await response.json();

      const youTubeChannels = data?.items;
      const hasYouTubeChannels = youTubeChannels?.length > 0;

      if (!hasYouTubeChannels) {
        return null;
      }

      const firstYouTubeChannel = youTubeChannels[0];

      return {
        id: firstYouTubeChannel.id,
      };
    } catch (error) {
      return null;
    }
  }
}
