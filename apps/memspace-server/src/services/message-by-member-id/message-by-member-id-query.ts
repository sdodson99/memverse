import { Message } from '../../models/message';
import * as firebase from 'firebase-admin';

export class MessageByMemberIdQuery {
  constructor(
    private firebaseApp: firebase.app.App,
    private messagesPath: string
  ) {}

  async execute(memberId: string): Promise<Message | null> {
    const messageData = await this.firebaseApp
      .database()
      .ref(this.messagesPath)
      .child(memberId)
      .get();

    if (!messageData.exists()) {
      return null;
    }

    const messageValue = messageData.val();

    return {
      content: messageValue.content,
    };
  }
}
