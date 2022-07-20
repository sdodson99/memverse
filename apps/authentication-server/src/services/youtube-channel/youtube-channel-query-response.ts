export type YouTubeChannelQueryResponse = {
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
