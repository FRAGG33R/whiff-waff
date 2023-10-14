import { channelType, channelUsersType } from "./chatType";

export interface SingleConversationHistoryType {
	userName : string, 
	lastMessage : string,
	messagePrefix : boolean,
	avatar : string,
	onClick : () => void;
	selected : boolean
}

export interface SingleMembreType {
	userName : string,
	avatar : string,
	type : string,
	userId : string,
	selectedChannel : channelType,
	channelUsers : channelUsersType[],
	setChannelUsers : Function,
}