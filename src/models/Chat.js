import { User } from './User';

export class Chat {
  id: string;
  sender: User = new User();
  message: String = '';
  created: Date = Date(0);
  updated: Date = Date(0);

  constructor(id: string, sender?: User, message?: string, created?: Date, updated?: Date) {
    this.id = id;
    this.sender = sender;
    this.message = message;
    this.created = created;
    this.updated = updated;
  }
}
