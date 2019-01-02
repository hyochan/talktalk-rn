export type Friend = {
  uid: string;
  img: string | null;
  displayName: string;
  statusMsg: string;
};

export type Chatroom = {
  id: string,
  img: string | null,
  displayName: string,
  msg: string,
  count: number,
  date: Date | null,
  status: boolean,
  read: boolean,
};

export type Chat = {
  id: string,
  sender: string,
  img: string | null,
  message: string,
  date: Date,
  isPeer: boolean,
}
