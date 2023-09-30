import { Logger, UseFilters, UseGuards, UsePipes, ValidationPipe, } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { CustomWebSocketValidationPipe } from 'src/shared/pipes/pipes.customValidation';
import { GuardsService } from './guards/guards.service';
import { dtoIndividualChat, dtoRoomChat } from 'src/dto/chat.dto';
import { ChatService } from './chat.service';

const chatGateway = 'ChatGateway';
@WebSocketGateway(6080, {
	cors: {
		origin: "*"
	}
})

export class ChatGateway implements OnGatewayConnection {
	private readonly loggedUsers: Map<string, string[]> = new Map<string, string[]>();
	logger = new Logger(chatGateway);
	constructor(private readonly configService: ConfigService, private readonly guardService: GuardsService, private readonly chatService: ChatService) { }

	async handleConnection(client: Socket) {
		const validUser = (client.handshake.headers.authorization) ?
			GuardsService.validateToken(client.handshake.headers?.authorization, this.configService.get('JWT_SECRET')) : false;
		const existsUser = (validUser) ? await this.guardService.validate(validUser) : false;
		if (!existsUser)
			client.disconnect();
		else if (this.loggedUsers) {
			if (!this.loggedUsers.has((validUser as any).id))
				this.loggedUsers.set((validUser as any).id, [client.id]);
			else if (!this.loggedUsers.get((validUser as any).id).includes(client.id))
				this.loggedUsers.get((validUser as any).id).push(client.id);
		}
	}

	@UseGuards(GuardsService)
	@SubscribeMessage('message')
	async handleMessage(@MessageBody(new CustomWebSocketValidationPipe()) dto: dtoIndividualChat, @ConnectedSocket() client: Socket): Promise<void> {
		const receiverIsFriend = await this.chatService.checkFriendship((client as any).user.id, dto.receiverId);
		if (!receiverIsFriend)
			throw new WsException('user not a friend');
		const receiver = this.loggedUsers.get(dto.receiverId);
		const checkFriendship = await this.chatService.checkFriendship((client as any).user.id, dto.receiverId);
		if (!checkFriendship)
			throw new WsException('user not a friend');
		if (receiver) {
			receiver.forEach(element => {
				let sended: boolean = client.to(element).emit('message', dto);
				if (!sended) {
					this.logger.error('emit method faild to send message');
					throw new WsException('internal server error');
				}
			});
		}
		try {
			await this.chatService.saveMessage((client as any).user.id, dto);
		} catch (error) {
			console.log(error);
		}
	}

	@UseGuards(GuardsService)
	@SubscribeMessage('room')
	async handelRoomMessage(@MessageBody(new CustomWebSocketValidationPipe()) dto: dtoIndividualChat, @ConnectedSocket() client: Socket) {
		const existsRoom = await this.chatService.getRoomInfosById(dto.receiverId);
		console.log(existsRoom);
	}
}
