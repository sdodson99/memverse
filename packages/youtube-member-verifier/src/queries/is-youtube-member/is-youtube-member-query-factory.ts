import { YouTubeMembersQuery } from '../youtube-members';
import { YouTubeMembersQueryOptions } from '../youtube-members/youtube-members-query-options';
import { IsYouTubeMemberQuery } from './is-youtube-member-query';

export function createIsYouTubeMemberQuery(
  options: YouTubeMembersQueryOptions
) {
  const youTubeMembersQuery = new YouTubeMembersQuery(options);

  return new IsYouTubeMemberQuery(youTubeMembersQuery);
}
