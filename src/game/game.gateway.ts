import { ConfigService } from '@nestjs/config';
import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket, SocketType } from 'dgram';
import { GuardsService } from 'src/chat/guards/guards.service';
import { GameService } from './game.service';



@WebSocketGateway(8888, {
	cors: {
		origin: "*"
	}
})
export class GameGateway implements OnGatewayConnection {

	constructor(private readonly configService: ConfigService, private readonly guardService: GuardsService) { }

	inviteFriendsArray: GameService[] = [];
	connectedUsers: Map<string, Socket> = new Map<string, Socket>();

	async handleConnection(@ConnectedSocket() client: any) {
		const validUser = (client.handshake.headers.authorization) ?
			GuardsService.validateToken(client.handshake.headers?.authorization, this.configService.get('JWT_SECRET')) : false;
		const existsUser: any = (validUser) ? await this.guardService.validate(validUser) : false;
		if (!existsUser || this.connectedUsers.has((validUser as any).id) === true) {
			client.emit('exception', 'User not allowed to connect');
			// client.disconnect();
		}
		else
			this.connectedUsers.set((validUser as any).id, client);
		// client.emit('status', { status: 'online' });
		console.log('connect');
	}

	@SubscribeMessage('play')
	async play(@ConnectedSocket() client: Socket, @MessageBody() data: { map: string, host: boolean, mode: string, type: string, id: string }) {
		if (data.type === 'friend') {
			let socket: any = this.connectedUsers.get((client as any).id);
			let index: number = this.inviteFriendsArray.findIndex((element: GameService) => element.id2 === socket.id);
			if (index < 0)
				client.emit('exception', 'You have no invitations');
			else {
				this.inviteFriendsArray[index].setPlayer2(socket);
				this.inviteFriendsArray[index].getPlayer1().emit('joined', { data: 'joined' });
				this.inviteFriendsArray[index].ready = true;
			}
		} else {

		}
	}

	@SubscribeMessage('notify')
	async notify(@ConnectedSocket() client: Socket, @MessageBody() data: { id: string, type: string }) {
		let socket: any = this.connectedUsers.get(data.id);
		let game: GameService = new GameService(client);
		game.setPlayer1(client);
		game.setPlayer2(null);
		game.id1 = (client as any).id;
		game.id2 = data.id;
		this.inviteFriendsArray.push(game);
		// socket.emit('notification', { data: 'notification' });
	}

	@SubscribeMessage('left')
	async left(@ConnectedSocket() client: Socket, @MessageBody() data: { id: string, type: string }) {

	}

	@SubscribeMessage('start')
	async start(@ConnectedSocket() client: any, @MessageBody() data: { id: string, type: string }) {
		let index: number = this.inviteFriendsArray.findIndex((element: GameService) => element.id2 === client.id || element.id1 === client.id);
		if (index >= 0 && this.inviteFriendsArray[index].ready) {
			this.inviteFriendsArray[index].getPlayer1().emit('start', { data: 'start' });
			this.inviteFriendsArray[index].getPlayer2().emit('start', { data: 'start' });
		}
	}

	async handleDisconnect(client: any) {
		const validUser = (client.handshake.headers.authorization) ?
			GuardsService.validateToken(client.handshake.headers?.authorization, this.configService.get('JWT_SECRET')) : false;
		console.log('disconnect');
		this.connectedUsers.delete((validUser as any).id);
		// client.emit('status', { status: 'offline' });
	}
}
