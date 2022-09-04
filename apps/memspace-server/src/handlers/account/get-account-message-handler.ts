import { Request, Response } from 'express';
import functions from 'firebase-functions';
import { MessageByMemberIdQuery } from '../../services/message-by-member-id';

export class GetAccountMessageHandler {
  constructor(
    private messageByMemberIdQuery: MessageByMemberIdQuery,
    private logger: typeof functions.logger
  ) {}

  async handle(req: Request, res: Response) {
    if (!req.user) {
      this.logger.warn('Unable to query message for unknown user.');
      return res.sendStatus(401);
    }

    const memberId = req.user.id;

    this.logger.info('Querying message for user.', {
      id: memberId,
    });

    const message = await this.messageByMemberIdQuery.execute(memberId);
    const messageContent = message?.content;

    this.logger.info('Successfully queried message for user.', {
      id: memberId,
      message: messageContent,
    });

    const messageResponse = {
      content: messageContent ?? '',
    };

    return res.send(messageResponse);
  }
}
