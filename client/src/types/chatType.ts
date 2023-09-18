interface receivertype {
  id: string;
  avatar: string;
  email: string;
  userName: string;
}

export interface messageType {
  content: string;
  type: "receiver" | "sender";
  date: string;
}

export interface conversationType {
  receiver: receivertype;
  messages: messageType[];
}
