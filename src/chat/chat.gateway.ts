import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, UseFilters, UseGuards, UsePipes, } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WsException } from '@nestjs/websockets';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Socket } from 'socket.io';
import { JwtGuard } from 'src/auth/guards/guards.jwtGuard';
import { CustomWebSocketValidationPipe } from 'src/shared/pipes/pipes.customValidation';

import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { GuardsService } from './guards/guards.service';
import { log } from 'console';
import { dtoWebSocketTset } from 'src/dto/chat.dto';
import { ChatService } from './chat.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@WebSocketGateway(80, {
	cors: {
		origin: "*"
	}
})
export class ChatGateway implements OnGatewayConnection {
	private readonly loggedUsers: Map<string, string[]> = new Map<string, string[]>();

	constructor(private readonly configService: ConfigService, private readonly guardService: GuardsService, private readonly chatService: ChatService) { }

	async handleConnection(client: Socket) {
		const validUser = (client.handshake.headers.authorization) ?
			GuardsService.validateToken(client.handshake.headers?.authorization, this.configService.get('JWT_SECRET')) : false;
		if (!validUser)
			client.disconnect();
		else if (this.loggedUsers) {
			if (!this.loggedUsers.has((validUser as any).id))
				this.loggedUsers.set((validUser as any).id, [client.id]);
			else if (!this.loggedUsers.get((validUser as any).id).includes(client.id))
				this.loggedUsers.get((validUser as any).id).push(client.id);
		}
	}

	@UseGuards(GuardsService)
	@UsePipes(new CustomWebSocketValidationPipe())
	@SubscribeMessage('mess age')
	async handleMessage(@MessageBody() dto: dtoWebSocketTset, @ConnectedSocket() client: Socket): Promise<void> {
		const receiverIsFriend = await this.chatService.checkFriendship((client as any).user.id, dto.receiverId);
		if (!receiverIsFriend)
			throw new WsException('user not a friend');
		const receiver = this.loggedUsers.get(dto.receiverId);
		client.to(receiver[0]).emit('message', dto);
	}
}
