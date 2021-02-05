export interface ChatRoom {
  _id: string;
  name: string;
}

export interface Message {
  _id: string;
  chatRoomId: string;
  message: string;
  user: User;
}

export interface User {
  name: string;
  email: string;
}
