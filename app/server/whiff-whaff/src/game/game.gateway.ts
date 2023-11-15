import { ConfigService } from '@nestjs/config';
import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket, SocketType } from 'dgram';
import { GuardsService } from 'src/chat/guards/guards.service';
import { GameService } from './game.service';
import { Vector, Body } from 'matter-js';
import { EventService } from './game.emitter';
import { GameGatewayStatus } from './game.gatewayStatus';
import axios from 'axios';
import { PlayerStatus } from '@prisma/client';

interface RandomGame {
	game: GameService;
	p1: string;
	p2: string;
	map: string;
	mode: string;
	started: boolean;
	gameId?: string;
}

@WebSocketGateway(8888, {
	cors: {
		origin: "*"
	}
})
export class GameGateway implements OnGatewayConnection {

	constructor(private readonly configService: ConfigService, private readonly guardService: GuardsService, private readonly eventService: EventService, private zeb: GameGatewayStatus) { }

	inviteFriendsArray: GameService[] = [];
	queueArray: RandomGame[] = [];
	connectedUsers: Map<string, { socket: Socket, id: string, username: string }> = new Map<string, { socket: Socket, id: string, username: string }>();

	async handleConnection(@ConnectedSocket() client: any) {
		const validUser = (client.handshake.headers.authorization) ?
			GuardsService.validateToken(client.handshake.headers?.authorization, this.configService.get('JWT_SECRET')) : false;
		const existsUser: any = (validUser) ? await this.guardService.validate(validUser) : false;
		if (!existsUser || this.connectedUsers.has((validUser as any).id) === true) {
			client.emit('exception', 'User not allowed to connect');
			this.connectedUsers.set(client.id, { id: '', socket: client, username: '' })
			client.disconnect();
		}
		else {
			this.connectedUsers.set(client.id, { id: (validUser as any).id, socket: client, username: (validUser as any).user });
			const Status = { id: (validUser as any).id, status: PlayerStatus.IN_GAME };
			axios.post('http://localhost:4000/api/v1/game/status', Status).then((res) => { }).catch((err) => { });
		}
	}

	findRandomGame(map: string, mode: string, started: boolean): RandomGame | null {
		let index: number = this.queueArray.findIndex((element: RandomGame) => element.map === map && element.mode === mode && element.started === started && element.p2 === '');
		if (index >= 0)
			return this.queueArray[index];
		return (null);
	}


	@SubscribeMessage('play')
	async play(@ConnectedSocket() client: Socket, @MessageBody() data: { map: string, mode: string, type: string }) {
		let username: string = this.connectedUsers.get((client as any).id)?.username;
		let id: string = this.connectedUsers.get((client as any).id)?.id;
		let gameInfo: RandomGame | null = this.findRandomGame(data.map, 'data.mode', false);
		if (gameInfo === null) {
			gameInfo = {
				game: new GameService(client, data.map),
				p1: (client as any).id,
				p2: '',
				map: data.map,
				mode: 'data.mode',
				started: false,
				gameId: username
			};
			gameInfo.game.setPlayer1(client);
			gameInfo.game.tableOptions = data.map;
			gameInfo.game.id1 = username;
			gameInfo.game.user1ID = id;
			this.queueArray.push(gameInfo);
		} else {
			gameInfo.game.setPlayer2(client);
			gameInfo.game.ready = true;
			gameInfo.p2 = (client as any).id;
			gameInfo.started = true;
			gameInfo.gameId += " " + username;
			gameInfo.game.getPlayer1().emit('joined', { username: username });
			client.emit('joined', { username: gameInfo.game.id1 });
			gameInfo.game.id2 = username;
			gameInfo.game.user2ID = id;
		}
	}

	@SubscribeMessage('notify')
	async notify(@ConnectedSocket() client: Socket, @MessageBody() data: { id: string, type: string, mode: string, map: string }) {
		let username: string = this.connectedUsers.get((client as any).id)?.username;
		let index = this.inviteFriendsArray.findIndex((element: GameService) => element.id2 === username && element.id1 === data.id);
		if (index >= 0) {
			let game: GameService = this.inviteFriendsArray[index];
			game.setPlayer2(client);
			game.ready = true;
			game.user2ID = this.connectedUsers.get((client as any).id)?.id;
			game.getPlayer1().emit('joined', { username: game.id2 });
			game.getPlayer2().emit('joined', { username: game.id1 });
		}
		else {
			let game: GameService = new GameService(client, data.map);
			game.tableOptions = data.map;
			game.setPlayer1(client);
			game.setPlayer2(null);
			game.id1 = username;
			game.id2 = data.id;
			game.user1ID = this.connectedUsers.get((client as any).id)?.id;
			this.inviteFriendsArray.push(game);
		}
	}

	// @SubscribeMessage('left')
	// async left(@ConnectedSocket() client: Socket, @MessageBody() data: { id: string, type: string }) {

	// }

	@SubscribeMessage('start')
	async start(@ConnectedSocket() client: any, @MessageBody() data: { type: string }) {
		let username: string = this.connectedUsers.get((client as any).id)?.username;
		let index: number = this.inviteFriendsArray.findIndex((element: GameService) => (element.id2 === username || element.id1 === username) && element.ready === true);
		let game: GameService;
		if (index >= 0) {
			game = this.inviteFriendsArray[index];
			game.getPlayer2()?.emit('start', { data: 'start' });
			game.getPlayer1()?.emit('start', { data: 'start' });
			game.spownBall();
			return;
		}
		index = this.queueArray.findIndex((element: RandomGame) => (element.p1 === client.id || element.p2 === client.id) && (element.game.ready === true));
		if (index >= 0) {
			game = this.queueArray[index].game;
			game.getPlayer2()?.emit('start', { data: 'start' });
			game.getPlayer1()?.emit('start', { data: 'start' });
			game.spownBall();
		}
	}

	async handleDisconnect(client: any) {
		let username: string = this.connectedUsers.get((client as any).id)?.username;
		const Status = { id: this.connectedUsers.get((client as any).id)?.id, status: PlayerStatus.ONLINE };
		if (Status.id) {
			axios.post('http://localhost:4000/api/v1/game/status', Status).then((res) => { }).catch((err) => {});
		}
		this.connectedUsers.delete(client.id);
		let index: number = this.inviteFriendsArray.findIndex((element: GameService) => element.id2 === username || element.id1 === username);
		if (index >= 0) {
			let game: GameService = this.inviteFriendsArray[index];
			game.getPlayer1()?.emit('left', { msg: "your friend has left the game" });
			game.getPlayer2()?.emit('left', { msg: "your friend has left the game" });
			game.stop();
			this.inviteFriendsArray.splice(index, 1);
			if (username === game.id1)
				game.getPlayer2()?.disconnect();
			else if (username === game.id2)
				game.getPlayer1()?.disconnect();
		}
		index = this.queueArray.findIndex((element: RandomGame) => (element.p1 === client.id || element.p2 === client.id));
		if (index >= 0) {
			let game: GameService = this.queueArray[index].game;
			game.getPlayer1()?.emit('left', { msg: "your friend has left the game" });
			game.getPlayer2()?.emit('left', { msg: "your friend has left the game" });
			game.stop();
			this.queueArray.splice(index, 1);
			if (username === game.id1) {
				game.getPlayer2()?.disconnect;
				game.setPlayer1(null)
			} else if (username === game.id2) {
				game.getPlayer1()?.disconnect();
				game.setPlayer2(null)
			}
		}
	}

	@SubscribeMessage('move')
	async move(@ConnectedSocket() client: any, @MessageBody('position') position: Vector) {
		let username: string = this.connectedUsers.get((client as any).id)?.username;
		let index: number = this.inviteFriendsArray.findIndex((element: GameService) => element.id2 === username || element.id1 === username);
		if (index >= 0) {
			let game: GameService = this.inviteFriendsArray[index];
			if (username === game.id1) {
				Body.setPosition(game.p1, { x: position.x, y: game.p1.position.y });
			}
			else
				Body.setPosition(game.p2, { x: game.width - position.x, y: game.p2.position.y });
		}
		index = this.queueArray.findIndex((element: RandomGame) => element.p1 === client.id || element.p2 === client.id);
		if (index >= 0) {
			let game: RandomGame = this.queueArray[index];
			if (client.id === game.p1)
				Body.setPosition(game.game.p1, { x: position.x, y: game.game.p1.position.y });
			else
				Body.setPosition(game.game.p2, { x: game.game.width - position.x, y: game.game.p2.position.y });
		}
	}
}

