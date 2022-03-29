import { Request, Response } from 'express';
import { SaveMessageCommand } from '../../commands/save-message';

export class UpdateAccountMessageHandler {
  constructor(private saveMessageCommand: SaveMessageCommand) {}

  async handle(req: Request, res: Response) {
    if (!req.user) {
      return res.sendStatus(401);
    }

    const memberId = req.user.id;

    const { content } = req.body;
    const message = {
      content,
    };

    await this.saveMessageCommand.execute(memberId, message);

    return res.sendStatus(204);
  }
}
