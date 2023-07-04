import { YouTubeMember } from 'youtube-member-querier';

export class MockYouTubeMembersQuery {
  constructor(private mockYouTubeMembers: YouTubeMember[]) {}

  async execute() {
    return this.mockYouTubeMembers;
  }
}
