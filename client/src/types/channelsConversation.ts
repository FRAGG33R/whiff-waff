export interface ChannelsConversationHistoryType {
	channelName : string, 
	lastMessage : string,
    lastUser: string;
	avatars: string[];
}

export interface ModelChannelsType{
	channelName : string, 
	avatars: string[];
	channelType: string;
}