interface Sender {
	id: string;
	avatar: string;
	email: string;
	userName: string;
}

export interface Message {
	content: string;
	date: string;
	type: string;
}

export class IndividualConversationResponse {
	private receiver: Sender;
	private messages: Message[];

	constructor(messages: Message[], receiver: Sender) {
		this.receiver = receiver;
		this.messages = messages;
	}
}

export class AllUserConversationsResponse {
	private conversations: IndividualConversationResponse;

	constructor(conversations: IndividualConversationResponse) {
		this.conversations = conversations;
	}
}