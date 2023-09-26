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
	admin : boolean,
	member : boolean,
}