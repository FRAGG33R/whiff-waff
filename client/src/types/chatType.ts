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
	user : {
		id: string;
		avatar: string;
		email: string;
		userName: string;
	};
	message: {
		content: string;
		date: string;
		type: string;
	};
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
  channelId: string;
  avatars: string[];
  selectedChannel: channelType;
  setSelectedChannel: Function;
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

export interface channelUsersType {
  user: {
    id: string;
    userName: string;
    avatar: string;
  };
  status: string;
  mutedAmout: string;
  mutedAt: string;
}

export interface expoloreChannelListType {
  id: string;
  name: string;
  type: string;
  avatars: string[];
}
