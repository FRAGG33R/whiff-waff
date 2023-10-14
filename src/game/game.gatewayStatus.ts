import { ConfigService } from '@nestjs/config';
import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WsException } from '@nestjs/websockets';
import { GuardsService } from 'src/chat/guards/guards.service';
import { GameService } from './game.service';
import { EventService } from './game.emitter';
import { OnEvent } from '@nestjs/event-emitter';
import { PlayerStatus } from '@prisma/client';
import axios from 'axios';


@WebSocketGateway(8887, {
	cors: {
		origin: "*"
	}
})
export class GameGatewayStatus implements OnGatewayConnection {

	constructor(private readonly configService: ConfigService, private readonly guardService: GuardsService, private readonly eventService: EventService) { }

	//array connected users
	private readonly connectedUsers: Map<string, string> = new Map<string, string>();
	private readonly usersIds: Map<string, string> = new Map<string, string>();

	async handleConnection(@ConnectedSocket() client: any) {
		const validUser = (client.handshake.headers.authorization) ?
			GuardsService.validateToken(client.handshake.headers?.authorization, this.configService.get('JWT_SECRET')) : false;
		const existsUser: any = (validUser) ? await this.guardService.validate(validUser) : false;
		if (!existsUser || this.connectedUsers.has((validUser as any).id) === true) {
			client.emit('exception', 'User not allowed to connect');
			client.disconnect();
		}
		else if (this.connectedUsers) {
			this.connectedUsers.set((validUser as any).user, client.id);
			this.usersIds.set(client.id, (validUser as any).id);
			const Status = { id: (validUser as any).id, status: PlayerStatus.ONLINE };
			console.log('start connetion from game global : ', (validUser as any).user, 'with id : ', client.id);
			axios.post('http://e3r10p16.1337.ma:3001/api/v1/game/status', Status).then((res) => { }).catch((err) => {console.log(err)});
			console.log('end connetion from game global');
		}
	}

	@SubscribeMessage('notification')
	async notify(@MessageBody() data: { username: string, inviter: string, map: string, mode: string }, @ConnectedSocket() client: any) {
		let socketId: string = this.connectedUsers.get(data.username);
		if (!socketId || "" === socketId)
			throw new WsException('your friend is not connected');
		client.to(socketId).emit('notification', { username: data.username, inviter: data.inviter, map: data.map, mode: data.mode });
	}

	async handleDisconnect(@ConnectedSocket() client: any) {
		const Status = { id: this.usersIds.get(client.id), status: PlayerStatus.OFFLINE };
		console.log('start disconnect from game global : ', client.id);
		axios.post('http://e3r10p16.1337.ma:3001/api/v1/game/status', Status).then((res) => { }).catch((err) => {
			console.log(err);
		});
		console.log('end disconnect from game global');
	}
}
