import 'server-only';
import { YouTubeMembersQuery } from 'youtube-member-querier';

export async function getAllMembers() {
  const youtubeMembersQuery = new YouTubeMembersQuery({
    channelId: process.env.YOUTUBE_CHANNEL_ID ?? '',
    apiKey: process.env.YOUTUBE_API_KEY ?? '',
    onBehalfOfUser: process.env.YOUTUBE_ON_BEHALF_OF_USER ?? '',
    authorizationHeader: process.env.YOUTUBE_AUTHORIZATION_HEADER ?? '',
    cookieHeader: process.env.YOUTUBE_COOKIE_HEADER ?? '',
  });

  return youtubeMembersQuery.execute();
}
