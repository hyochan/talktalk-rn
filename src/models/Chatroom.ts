import { Chat } from './Chat';
import { User } from './User';

export class Chatroom {
  public id: string;
  public lastChat: Chat;
  public lastChatCnt: number = 0;
  public chats: Chat[] = [];
  public users: User[] = [];
  public created: Date;
  public updated: Date;

  constructor(
    id?: string,
    lastChat?: Chat,
    lastChatCnt?: number,
    chats?: Chat[],
    users?: User[],
    created?: Date,
    updated?: Date,
  ) {
    this.id = id;
    this.lastChat = lastChat;
    this.lastChatCnt = lastChatCnt;
    this.chats = chats;
    this.users = users;
    this.created = created;
    this.updated = updated;
  }
}
