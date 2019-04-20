import { ImageURISource } from 'react-native';
import { Chatroom } from './Chatroom';

export class User {
  public uid: string = '';
  public displayName: string = '';
  public photoURL: string;
  public statusMsg: string = '';
  public isOnline?: boolean = false;
  public friends?: User[] = [];
  public chatrooms?: Chatroom[] = [];
  public created?: Date;
  public updated?: Date;

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
