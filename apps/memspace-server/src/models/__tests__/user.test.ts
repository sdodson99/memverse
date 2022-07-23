import { User } from '../user';
import { DateTime } from 'luxon';

describe('User', () => {
  let id: string;

  beforeEach(() => {
    id = 'user123';
  });

  describe('isMember', () => {
    it('should return false when member as of time is unknown', () => {
      const user = new User(id);

      const isMember = user.isMember();

      expect(isMember).toBeFalsy();
    });

    it('should return false when user is no longer known to be a member', () => {
      const user = new User(
        id,
        DateTime.now().minus({ hours: 49 }).toSeconds()
      );

      const isMember = user.isMember();

      expect(isMember).toBeFalsy();
    });

    it('should return true when user is recently known to be a member', () => {
      const user = new User(
        id,
        DateTime.now().minus({ hours: 47 }).toSeconds()
      );

      const isMember = user.isMember();

      expect(isMember).toBeTruthy();
    });

    it('should return true when user is known to be a member in the far future', () => {
      const user = new User(id, DateTime.now().plus({ hours: 49 }).toSeconds());

      const isMember = user.isMember();

      expect(isMember).toBeTruthy();
    });
  });
});
