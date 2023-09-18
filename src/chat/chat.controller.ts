import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ConversationDto, RoomInfos } from 'src/dto/chat.dto';
import { ChatService } from './chat.service';
import { JwtGuard } from 'src/auth/guards/guards.jwtGuard';
import { ApiBearerAuth } from '@nestjs/swagger';

const chatController = 'chat'
const conversationEndpoint = 'individualConversations'
const individualConversation = 'individualConversations/:receiverId' //TODO
const createRoom = 'room/create'
@Controller(chatController)
export class ChatController {
	constructor(private readonly chatService: ChatService) { }

	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Get(conversationEndpoint)
	async getConversations(@Query() data: ConversationDto, @Req() req: Request) {
		data.nbElements = (!data.nbElements) ? data.nbElements = undefined : Number(data.nbElements);
		data.nbPage = (!data.nbPage) ? data.nbPage = undefined : Number(data.nbPage);
		const loggedUserId = (req as any).user.id;
		return await this.chatService.getAllConversationsById(loggedUserId, data);
	}

	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Get(individualConversation)
	async getIndividualConversation(@Query() data: ConversationDto, @Req() req: Request) {
		data.nbElements = (!data.nbElements) ? data.nbElements = undefined : Number(data.nbElements);
		data.nbPage = (!data.nbPage) ? data.nbPage = undefined : Number(data.nbPage);
		const loggedUserId = (req as any).user.id;
		const receivedId = (req as any).params.receiverId;
		return await this.chatService.getIndividualConversationById(loggedUserId, receivedId, data);
	}

	@UseGuards(JwtGuard)
	@Post(createRoom)
	async joinRoom(@Body() data: RoomInfos, @Req() req: Request) {
		return this.chatService.joinRoom((req as any).user.id, data);
	}
}
