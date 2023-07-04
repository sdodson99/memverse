import 'server-only';
import * as firebase from 'firebase-admin';
import { Message } from './message';
import { MESSAGES_DATABASE_PATH } from './messages-database-path';

export class GetMessageByMemberIdQuery {
  constructor(private firebaseApp: firebase.app.App) {}

  async execute(memberId: string): Promise<Message> {
    const messageData = await this.firebaseApp
      .database()
      .ref(MESSAGES_DATABASE_PATH)
      .child(memberId)
      .get();

    if (!messageData.exists()) {
      return {
        content: null,
      };
    }

    const messageValue = messageData.val();

    return {
      content: messageValue.content,
    };
  }
}
