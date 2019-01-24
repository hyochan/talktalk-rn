import { Chat } from './Chat';
import { User } from './User';

export class Chatroom {
  id: string;
  lastChat: Chat = new Chat();
  lastChatCnt: number = 0;
  chats: Chat[] = [];
  users: User[] = [];
  created: Date = Date(0);
  updated: Date = Date(0);

  constructor(
    id?: string,
    lastChat?: Chat,
    lastChatCnt: number,
    chats?: Chat[],
    users?: User[],
    created?: Date,
    updated?: Date
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
