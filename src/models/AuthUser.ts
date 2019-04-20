import { User } from './User';

export class AuthUser extends User {
  private pushToken: string = '';

  constructor(pushToken?: string) {
    super();
    this.pushToken = pushToken;
  }
}
