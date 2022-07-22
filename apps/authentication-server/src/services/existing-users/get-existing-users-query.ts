import admin from 'firebase-admin';

export class GetExistingUsersQuery {
  /**
   * Get many existing users by IDs.
   * @param userIds The user IDs to query for.
   * @returns The users representing the user IDs.
   */
  async execute(userIds: string[]): Promise<admin.auth.UserRecord[]> {
    const identifiers = userIds.map((id) => ({ uid: id }));
    const { users } = await admin.auth().getUsers(identifiers);

    return users;
  }
}
