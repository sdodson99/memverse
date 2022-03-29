import { Request, Response } from 'express';
import { AllMembersQuery } from '../../queries/all-members';

export class GetAllMembersHandler {
  constructor(private allMembersQuery: AllMembersQuery) {}

  async handle(_req: Request, res: Response) {
    const members = await this.allMembersQuery.execute();

    return res.send(members);
  }
}
