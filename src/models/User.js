import { Chatroom } from './Chatroom';

export class User {
  uid: string = '';
  displayName: string = '';
  photoURL: string = '';
  statusMsg: string = '';
  isOnline: boolean = false;
  friends: User[] = [];
  Chatrooms: Chatroom[] = [];
  created: Date = Date(0);
  updated: Date = Date(0);

  constructor(
    uid?: string,
    displayName?: string,
    photoURL?: string,
    statusMsg?: string,
    isOnline?: boolean,
    friends?: User[],
    chatrooms?: Chatroom[],
    created?: Date,
    updated?: Date,
  ) {
    this.uid = uid;
    this.displayName = displayName;
    this.photoURL = photoURL;
    this.statusMsg = statusMsg;
    this.isOnline = isOnline;
    this.friends = friends;
    this.chatrooms = chatrooms;
    this.created = created;
    this.updated = updated;
  }
}
