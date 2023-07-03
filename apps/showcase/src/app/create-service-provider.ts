import {
  GetAllMembersQuery,
  MockYouTubeMembersQuery,
} from '@/features/view-members';
import { NextPageRequest } from '@/shared/http';
import { YouTubeMembersQuery } from 'youtube-member-querier';

export function createServiceProvider(request: NextPageRequest) {
  const youTubeMembersQuery = createYouTubeMembersQuery(request);
  const getAllMembersQuery = new GetAllMembersQuery(youTubeMembersQuery);

  return {
    getAllMembersQuery,
  };
}

function createYouTubeMembersQuery(request: NextPageRequest) {
  if (request.searchParams.mock) {
    return new MockYouTubeMembersQuery();
  }

  return new YouTubeMembersQuery({
    channelId: process.env.YOUTUBE_CHANNEL_ID ?? '',
    apiKey: process.env.YOUTUBE_API_KEY ?? '',
    onBehalfOfUser: process.env.YOUTUBE_ON_BEHALF_OF_USER ?? '',
    authorizationHeader: process.env.YOUTUBE_AUTHORIZATION_HEADER ?? '',
    cookieHeader: process.env.YOUTUBE_COOKIE_HEADER ?? '',
  });
}
