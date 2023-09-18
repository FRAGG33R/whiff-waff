export interface SingleConversationHistoryType {
	userName : string, 
	lastMessage : string,
	messagePrefix : boolean,
	avatar : string,
	onClick : () => void;
	selected : boolean
}