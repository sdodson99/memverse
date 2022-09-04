import { Request, Response } from 'express';
import functions from 'firebase-functions';
import { SaveMessageCommand } from '../../services/save-message';

export class UpdateAccountMessageHandler {
  constructor(
    private saveMessageCommand: SaveMessageCommand,
    private logger: typeof functions.logger
  ) {}

  async handle(req: Request, res: Response) {
    if (!req.user) {
      this.logger.warn('Unable to update message for unknown user.');
      return res.sendStatus(401);
    }

    const memberId = req.user.id;

    const { content } = req.body;
    const message = {
      content,
    };

    this.logger.info('Updating message for user.', {
      id: memberId,
      message: content,
    });

    await this.saveMessageCommand.execute(memberId, message);

    this.logger.info('Successfully updated message for user.', {
      id: memberId,
    });

    return res.sendStatus(204);
  }
}
