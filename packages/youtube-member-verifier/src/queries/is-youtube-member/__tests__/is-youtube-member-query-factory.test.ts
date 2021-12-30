import { YouTubeMembersQueryOptions } from '../../youtube-members/youtube-members-query-options';
import { createIsYouTubeMemberQuery } from '../is-youtube-member-query-factory';

describe('createIsYouTubeMemberQuery', () => {
  let options: YouTubeMembersQueryOptions;

  beforeEach(() => {
    options = {} as YouTubeMembersQueryOptions;
  });

  it('should return IsYouTubeMemberQuery', () => {
    const query = createIsYouTubeMemberQuery(options);

    expect(query).toBeDefined();
  });
});
