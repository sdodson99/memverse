import { Request, Response } from 'express';

export class GetAccountHandler {
  async handle(req: Request, res: Response) {
    if (!req.user) {
      return res.sendStatus(401);
    }

    const memberId = req.user.id;

    return res.send({
      id: memberId,
    });
  }
}
