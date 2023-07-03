import 'server-only';
import { YouTubeMember } from 'youtube-member-querier';

type YouTubeMembersQuery = {
  execute: () => Promise<YouTubeMember[]>;
};

export class GetAllMembersQuery {
  constructor(private youTubeMembersQuery: YouTubeMembersQuery) {}

  execute() {
    return this.youTubeMembersQuery.execute();
  }
}
