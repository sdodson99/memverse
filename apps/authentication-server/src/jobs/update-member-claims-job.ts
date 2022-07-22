import { YouTubeMembersQuery } from 'youtube-member-querier';
import { UpdateUserClaimsCommand } from '../services/update-user-claims';
import { GetExistingUsersQuery } from '../services/existing-users';
import functions from 'firebase-functions';

export class UpdateMemberClaimsJob {
  constructor(
    private youTubeMembersQuery: YouTubeMembersQuery,
    private getExistingUsersQuery: GetExistingUsersQuery,
    private updateUserClaimsCommand: UpdateUserClaimsCommand,
    private logger: typeof functions.logger
  ) {}

  /**
   * Execute job to update member claims for each member
   * that has previously logged in.
   */
  async run() {
    this.logger.info('Starting update member claims job.');

    const members = await this.youTubeMembersQuery.execute();

    this.logger.info('Fetched channel members.');

    const memberIds = members.map((m) => m.channelId);
    const memberUsers = await this.getExistingUsersQuery.execute(memberIds);

    this.logger.info('Fetched channel members who have existing accounts.');

    const updateUserClaims = memberUsers.map((m) =>
      this.updateUserClaimsCommand.execute(m.uid, {
        memberAsOf: Date.now(),
      })
    );

    await Promise.all(updateUserClaims);

    this.logger.info(
      'Successfully updated member claim status of each existing member.'
    );
  }
}
