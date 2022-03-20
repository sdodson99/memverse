import dotenv from 'dotenv';
import { YouTubeMembersQuery } from '../src'

dotenv.config({ path: './e2e/.env.e2e' });

describe('YouTubeMembersQuery', () => {
  let query: YouTubeMembersQuery;

  beforeEach(() => {
    query = new YouTubeMembersQuery({
      apiKey: process.env.API_KEY ?? '',
      channelId: process.env.CHANNEL_ID ?? '',
      onBehalfOfUser: process.env.USER_BEHALF_ID ?? '',
      authorizationHeader: process.env.AUTHORIZATION_HEADER ?? '',
      cookieHeader: process.env.COOKIE_HEADER ?? '',
    });
  });

  it('should return YouTube members', async () => {
    const youTubeMembers = await query.execute();

    expect(youTubeMembers.length).toBeGreaterThan(0);
  });
});
