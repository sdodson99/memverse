import { Request, Response } from 'express';
import functions from 'firebase-functions';
import { AllMembersQuery } from '../../services/all-members';

export class GetAllMembersHandler {
  constructor(
    private allMembersQuery: AllMembersQuery,
    private logger: typeof functions.logger
  ) {}

  async handle(_req: Request, res: Response) {
    this.logger.info('Querying all members.');

    const members = await this.allMembersQuery.execute();

    this.logger.info('Successfully queried all members.', {
      memberCount: members?.length,
    });

    return res.send(members);
  }
}
