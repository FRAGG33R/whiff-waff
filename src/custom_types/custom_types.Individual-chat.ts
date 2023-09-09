interface Sender {
	id: string;
	userName: string;
}

export interface Message {
	message: string;
	date: string;
	sender: Sender;
	type: string;
}

export class IndividualChatResponse {
	messages: Message[];
	nbElements: number;

	constructor(messages: Message[], nbElements: number) {
		this.messages = messages;
		this.nbElements = nbElements;
	}
}	