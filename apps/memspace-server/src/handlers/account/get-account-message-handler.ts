import { Request, Response } from 'express';
import { MessageByMemberIdQuery } from '../../queries/message-by-member-id';

export class GetAccountMessageHandler {
  constructor(private messageByMemberIdQuery: MessageByMemberIdQuery) {}

  async handle(req: Request, res: Response) {
    if (!req.user) {
      return res.sendStatus(401);
    }

    const memberId = req.user.id;

    const message = await this.messageByMemberIdQuery.execute(memberId);

    const messageResponse = {
      content: message?.content ?? '',
    };

    return res.send(messageResponse);
  }
}
