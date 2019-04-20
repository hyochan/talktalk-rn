import { User } from './User';

export class Chat {
  public id: string;
  public sender: User = new User();
  public message: string = '';
  public created: Date;
  public updated: Date;

  constructor(id: string, sender?: User, message?: string, created?: Date, updated?: Date) {
    this.id = id;
    this.sender = sender;
    this.message = message;
    this.created = created;
    this.updated = updated;
  }
}
