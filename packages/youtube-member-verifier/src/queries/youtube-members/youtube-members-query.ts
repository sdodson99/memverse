import axios from 'axios';
import { YouTubeMember } from './youtube-member';
import { YouTubeMembersQueryOptions } from './youtube-members-query-options';
import { YouTubeMembersQueryResponse } from './youtube-members-query-response';

const YOUTUBE_MEMBERS_ENDPOINT =
  'https://studio.youtube.com/youtubei/v1/sponsors/creator_sponsorships_sponsors';

export class YouTubeMembersQuery {
  constructor(private options: YouTubeMembersQueryOptions) {}

  /**
   * Get YouTube channel members.
   * @returns The YouTube members for the configured channel. Empty if no members found.
   * @throws {Error} Thrown if query fails.
   */
  async execute(): Promise<YouTubeMember[]> {
    const headers = {
      'x-origin': 'https://studio.youtube.com',
      authorization: this.options.authorizationHeader,
      cookie: this.options.cookieHeader,
    };
    const params = {
      alt: 'json',
      key: this.options.apiKey,
    };
    const body = {
      context: {
        client: {
          clientName: 62,
          clientVersion: '1.20211213.02.00',
        },
        user: {
          onBehalfOfUser: this.options.onBehalfOfUser,
        },
      },
      externalChannelId: this.options.channelId,
      sponsorsOptions: {
        // TODO: Remove hardcoded value
        pageSize: 1000,
      },
    };

    const { data } = await axios.post<YouTubeMembersQueryResponse>(
      YOUTUBE_MEMBERS_ENDPOINT,
      body,
      {
        headers,
        params,
      }
    );

    return (
      data?.sponsorsData?.sponsors?.map((s) => ({
        channelId: s.externalChannelId,
      })) ?? []
    );
  }
}
