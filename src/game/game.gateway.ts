import { ConfigService } from '@nestjs/config';
import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket, SocketType } from 'dgram';
import { GuardsService } from 'src/chat/guards/guards.service';
import { GameService } from './game.service';
import Matter, { Vector, Body } from 'matter-js';
import { User } from '@prisma/client';

interface RandomGame {
	game: GameService;
	p1: string;
	p2: string;
	map: string;
	mode: string;
	started: boolean;
}

@WebSocketGateway(3389, {
	cors: {
		origin: "*"
	}
})
export class GameGateway implements OnGatewayConnection {

	constructor(private readonly configService: ConfigService, private readonly guardService: GuardsService) { }

	inviteFriendsArray: GameService[] = [];
	queueArray: RandomGame[] = [];
	connectedUsers: Map<string, { socket: Socket, id: string, username: string }> = new Map<string, { socket: Socket, id: string, username: string }>();

	findRandomGame(map: string, mode: string, started: boolean): RandomGame | null {
		let index: number = this.queueArray.findIndex((element: RandomGame) => element.map === map && element.mode === mode && element.started === started);
		if (index >= 0)
			return this.queueArray[index];
		return (null);
	}

	async handleConnection(@ConnectedSocket() client: any) {
		const validUser = (client.handshake.headers.authorization) ?
			GuardsService.validateToken(client.handshake.headers?.authorization, this.configService.get('JWT_SECRET')) : false;
		const existsUser: any = (validUser) ? await this.guardService.validate(validUser) : false;
		if (!existsUser || this.connectedUsers.has((validUser as any).id) === true) {
			client.emit('exception', 'User not allowed to connect');
			this.connectedUsers.set(client.id, { id: '', socket: client, username: ''})
			client.disconnect();
		}
		else{
			this.connectedUsers.set(client.id, { id: (validUser as any).id, socket: client, username: (validUser as any).user});
		}
		// client.emit('status', { status: 'online' });
		console.log('connect');
	}

	@SubscribeMessage('play')
	async play(@ConnectedSocket() client: Socket, @MessageBody() data: { map: string, mode: string, type: string, id: string }) {
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
			let gameInfo: RandomGame | null = this.findRandomGame(data.map, data.mode, false);
			if (gameInfo === null) {
				gameInfo = {
					game: new GameService(client, data.map),
					p1: (client as any).id,
					p2: '',
					map: data.map,
					mode: data.mode,
					started: false
				};
				gameInfo.game.id1 = gameInfo.p1;
				this.queueArray.push(gameInfo);
			} else {
				gameInfo.game.setPlayer2(client);
				gameInfo.game.ready = true;
				gameInfo.p2 = (client as any).id;
				gameInfo.started = true;
				gameInfo.game.getPlayer1().emit('joined', { username: this.connectedUsers.get(gameInfo.p2).username});
				gameInfo.game.getPlayer2().emit('joined', { username: this.connectedUsers.get(gameInfo.p1).username});
				gameInfo.game.id2 = gameInfo.p2;
			}
		}
	}

	@SubscribeMessage('notify')
	async notify(@ConnectedSocket() client: Socket, @MessageBody() data: { id: string, type: string }) {
		let socket: any = this.connectedUsers.get(data.id);
		let game: GameService = new GameService(client, "map");
		game.setPlayer1(client);
		game.setPlayer2(null);
		game.id1 = (client as any).id;
		game.id2 = data.id;
		this.inviteFriendsArray.push(game);
		socket?.emit('notification', { data: 'notification' });
	}

	@SubscribeMessage('left')
	async left(@ConnectedSocket() client: Socket, @MessageBody() data: { id: string, type: string }) {

	}

	@SubscribeMessage('start')
	async start(@ConnectedSocket() client: any, @MessageBody() data: { type: string }) {
		console.log(data.type);
		if (data.type === 'friend') {
			let index: number = this.inviteFriendsArray.findIndex((element: GameService) => element.id2 === client.id || element.id1 === client.id);
			if (index >= 0) {
				this.inviteFriendsArray[index].getPlayer2()?.emit('start', { data: 'start' });
				this.inviteFriendsArray[index].getPlayer1()?.emit('start', { data: 'start' });
				this.inviteFriendsArray[index].spownBall();
			}
		} else {
			let index: number = this.queueArray.findIndex((element: RandomGame) => (element.p1 === client.id || element.p2 === client.id) && (element.game.ready === true));
			if (index >= 0) {
				this.queueArray[index].game.getPlayer2()?.emit('start', { data: 'start' });
				this.queueArray[index].game.getPlayer1()?.emit('start', { data: 'start' });
				this.queueArray[index].game.spownBall();
			}
		}
	}

	async handleDisconnect(client: any) {
		this.connectedUsers.delete(client.id);
		let index: number = this.inviteFriendsArray.findIndex((element: GameService) => element.id2 === client.id || element.id1 === client.id);
		if (index >= 0) {
			let game: GameService = this.inviteFriendsArray[index];
			game.getPlayer1()?.emit('left', { msg: "your friend has left the game" });
			game.getPlayer2()?.emit('left', { msg: "your friend has left the game" });
			game.stop();
			if (client.id === game.id1) game.setPlayer1(null);
			else if (client.id === game.id2) game.setPlayer2(null);
			if (game.getPlayer1() === null && game.getPlayer2() === null)
				this.inviteFriendsArray.splice(index, 1);
		}
		index = this.queueArray.findIndex((element: RandomGame) => element.p1 === client.id || element.p2 === client.id);
		if (index >= 0) {
			let game: RandomGame = this.queueArray[index];
			game.game.getPlayer1()?.emit('left', { msg: "your friend has left the game" });
			game.game.getPlayer2()?.emit('left', { msg: "your friend has left the game" });
			game.game.stop();
			if (client.id === game.game.id1) game.game.setPlayer1(null);
			else if (client.id === game.game.id2) game.game.setPlayer2(null);
			if (game.game.getPlayer1() === null && game.game.getPlayer2() === null)
				this.queueArray.splice(index, 1);
		}
		console.log("disconnected ", client.id)
	}

	@SubscribeMessage('move')
	async move(@ConnectedSocket() client: any, @MessageBody('position') position: Vector) {
		let index: number = this.inviteFriendsArray.findIndex((element: GameService) => element.id2 === client.id || element.id1 === client.id);
		if (index >= 0) {
			let game: GameService = this.inviteFriendsArray[index];
			if (client.id === game.id1) {
				console.log(position);
				Body.setPosition(game.p1, position);
			}
			else
				Body.setPosition(game.p2, position);
		}
		index = this.queueArray.findIndex((element: RandomGame) => element.p1 === client.id || element.p2 === client.id);
		if (index >= 0) {
			let game: RandomGame = this.queueArray[index];
			if (client.id === game.p1)
				Body.setPosition(game.game.p1, {x: position.x, y: game.game.p1.position.y});
			else
				Body.setPosition(game.game.p2, {x: game.game.width - position.x, y: game.game.p2.position.y});
		}
	}
}
