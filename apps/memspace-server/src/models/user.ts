import { DateTime } from 'luxon';

const MEMBER_THRESHOLD_HOURS = 48;

export class User {
  constructor(private _id: string, private _memberAsOf?: number) {}

  get id() {
    return this._id;
  }

  isMember() {
    if (!this._memberAsOf) {
      return false;
    }

    const memberAsOfDate = DateTime.fromSeconds(this._memberAsOf);
    const hoursSinceConfirmedMember = DateTime.now().diff(
      memberAsOfDate,
      'hours'
    ).hours;

    return hoursSinceConfirmedMember < MEMBER_THRESHOLD_HOURS;
  }
}
