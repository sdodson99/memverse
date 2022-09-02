import * as functions from 'firebase-functions';
import { Request, Response } from 'express';
import { YouTubeChannelQuery } from '../services/youtube-channel';
import { IsYouTubeMemberQuery } from '../services/is-youtube-member';
import { CreateUserIfNotExistsCommand } from '../services/create-user-if-not-exists';
import { UpdateUserClaimsCommand } from '../services/update-user-claims';
import { GenerateAccessTokenCommand } from '../services/generate-access-token';

export class LoginHandler {
  constructor(
    private youTubeChannelQuery: YouTubeChannelQuery,
    private isYouTubeMemberQuery: IsYouTubeMemberQuery,
    private createUserIfNotExistsCommand: CreateUserIfNotExistsCommand,
    private updateUserClaimsCommand: UpdateUserClaimsCommand,
    private generateAccessTokenCommand: GenerateAccessTokenCommand,
    private logger: typeof functions.logger
  ) {}

  async handle(req: Request, res: Response) {
    this.logger.info('Received login request.');

    const userAccessToken = req.body.accessToken;

    if (!userAccessToken) {
      this.logger.warn('User did not provide an access token.');
      return res.sendStatus(401);
    }

    const youTubeChannel = await this.youTubeChannelQuery.execute(
      userAccessToken
    );

    if (!youTubeChannel) {
      this.logger.warn("Unable to find user's YouTube channel.");
      return res.sendStatus(401);
    }

    const { id: channelId, displayName, photoUrl } = youTubeChannel;

    this.logger.info("Found user's YouTube channel.", { channelId });

    const isMember = await this.isYouTubeMemberQuery.execute(channelId);

    if (!isMember) {
      this.logger.info('User is not a channel member.', { channelId });
      return res.sendStatus(403);
    }

    this.logger.info('Verified user is a channel member.', { channelId });

    await this.createUserIfNotExistsCommand.execute(channelId, {
      displayName,
      photoUrl,
    });

    this.logger.info('Ensured user exists.', { channelId });

    // Need to update member claim after login in case user became member after the
    // daily CRON job executed. Also, need to update member claim for new and existing
    // users in case existing user was previously a member long ago.
    await this.updateUserClaimsCommand.execute(channelId, {
      memberAsOf: Date.now(),
    });

    this.logger.info('Updated user claims.', { channelId });

    const accessToken = await this.generateAccessTokenCommand.execute(
      channelId
    );

    this.logger.info(
      'Successfully authenticated and created access token for user.'
    );

    return res.send({ accessToken });
  }
}
