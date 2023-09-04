import { UsePipes } from '@nestjs/common';
import { MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { IsNotEmpty, IsOptional } from 'class-validator';
import {  CustomWebSocketValidationPipe } from 'src/shared/pipes/pipes.customValidation';

class dtoWebSocketTset {
	@IsNotEmpty()
	idSeder: string;
	@IsNotEmpty()
	idreceiver: string;
	@IsNotEmpty()
	content: string;
}

@WebSocketGateway({
	cors: {
		origin: "*"
	}
})
export class ChatGateway implements OnGatewayConnection {
	handleConnection(client: any) {
		console.log(client.id);

	}

	@UsePipes(new CustomWebSocketValidationPipe())
	@SubscribeMessage('message')
	handleMessage(@MessageBody() dto: dtoWebSocketTset, payload: any): string {
		console.log('commed data : ', dto);
		return 'Hello world!';
	}
}
