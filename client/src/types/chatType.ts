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
  isError: boolean;
}

export interface channelMessageType {
  roomSender: {
    user: {
      id: string;
      userName: string;
    };
  };
  message: string;
  type: "receiver" | "sender";
  date: string;
  isError: boolean;
}

export interface conversationType {
  receiver: receivertype;
  messages: messageType[];
}

export interface individualChatComponentType {
  selectedConversation: conversationType;
  handleSelectedConversation: Function;
  conversations: conversationType[];
}

export interface channelBarType {
  channelName: string;
}

export interface roomType {
  id: string;
  name: string;
}

export interface channelType {
  roomChat: roomType;
  message: channelMessageType[];
  avatars: string[];
}
