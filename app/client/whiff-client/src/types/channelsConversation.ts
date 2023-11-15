import { channelType } from "./chatType";

export interface ChannelsConversationHistoryType {
	channelName : string, 
	lastMessage : string,
    lastUser: string;
	avatars: string[];
	selected :boolean
	onClick: () => void;
}

export interface ModelChannelsType{
	channelName : string, 
	avatars: string[];
	channelType: string;
	handleJoinChannel: () => void;
}