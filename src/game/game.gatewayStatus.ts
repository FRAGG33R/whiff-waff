import { ConfigService } from '@nestjs/config';
import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { GuardsService } from 'src/chat/guards/guards.service';
import { GameService } from './game.service';
import { EventService } from './game.emitter';
import { OnEvent } from '@nestjs/event-emitter';

@WebSocketGateway(8887, {
	cors: {
		origin: "*"
	}
})
export class GameGatewayStatus implements OnGatewayConnection {

	constructor(private readonly configService: ConfigService, private readonly guardService: GuardsService, private readonly eventService: EventService) { }

	//array connected users
	private readonly connectedUsers: Map<string, string> = new Map<string, string>();

	async handleConnection(@ConnectedSocket() client: any) {
		console.log('hello thre');
		const validUser = (client.handshake.headers.authorization) ?
			GuardsService.validateToken(client.handshake.headers?.authorization, this.configService.get('JWT_SECRET')) : false;
		const existsUser: any = (validUser) ? await this.guardService.validate(validUser) : false;
		if (!existsUser || this.connectedUsers.has((validUser as any).id) === true) {
			client.emit('exception', 'User not allowed to connect');
			client.disconnect();
		}
		else if (this.connectedUsers) {
			if (!this.connectedUsers.has((validUser as any).id))
				this.connectedUsers.set((validUser as any).id, client.id);
		}


		console.log('connect');
	}

	@SubscribeMessage('notifyUser')
	async notify(@MessageBody() data: { id: string }, @ConnectedSocket() client: any) {

		// let index = this.connectedUsers.get(data.id);
		// if (index) {
		// 	client.to(index).emit('notify', 'are you ready for a game ?');
		// }
		// console.log('la9la9la9');

	}

	@OnEvent('notifyUser')
	notifyUser() {
		const ter = this.connectedUsers.get('079b818f-a287-41ed-a9bc-9877527592a3');
	}



}
