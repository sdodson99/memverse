import * as functions from 'firebase-functions';
import { Request, Response } from 'express';
import { YouTubeChannelQuery } from '../queries/youtube-channel';
import { IsYouTubeMemberQuery } from '../queries/is-youtube-member';
import { AccessTokenGenerator } from '../services/access-tokens/access-token-generator';

export class LoginHandler {
  constructor(
    private youTubeChannelQuery: YouTubeChannelQuery,
    private isYouTubeMemberQuery: IsYouTubeMemberQuery,
    private accessTokenGenerator: AccessTokenGenerator,
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

    const { id: channelId } = youTubeChannel;

    this.logger.info("Found user's YouTube channel.", { channelId });

    const isMember = await this.isYouTubeMemberQuery.execute(channelId);

    if (!isMember) {
      this.logger.info('User is not a channel member.', { channelId });
      return res.sendStatus(403);
    }

    this.logger.info('Verified user is a channel member.', { channelId });

    const accessToken = this.accessTokenGenerator.generate(channelId);

    this.logger.info('Signed access token for user.', { channelId });

    return res.send(accessToken);
  }
}
