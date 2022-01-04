export type YouTubeMembersQueryResponse = {
  sponsorsData: YouTubeSponsorsDataResponse;
};

type YouTubeSponsorsDataResponse = {
  sponsors: YouTubeSponsorResponse[];
};

type YouTubeSponsorResponse = {
  externalChannelId: string;
  displayName: string;
  profileImageUrl: string;
};
