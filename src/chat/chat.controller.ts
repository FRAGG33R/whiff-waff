import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ConversationDto, Invitation, RoomInfos } from 'src/dto/chat.dto';
import { ChatService } from './chat.service';
import { JwtGuard } from 'src/auth/guards/guards.jwtGuard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AllUserConversationsResponse, IndividualConversationResponse } from 'src/custom_types/custom_types.Individual-chat';

const chatController = 'chat'
const conversationEndpoint = 'individualConversations'
const individualConversation = 'individualConversations/:receiverId'
const roomConversation = 'room/Conversations/:roomId'
const roomConversations = 'room/Conversations'
const createRoom = 'room/create'
const inviteRoom = 'room/invite'
@Controller(chatController)
export class ChatController {
	constructor(private readonly chatService: ChatService) { }

	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Get(conversationEndpoint)
	async getConversations(@Query() data: ConversationDto, @Req() req: Request): Promise<AllUserConversationsResponse> {
		data.nbElements = (!data.nbElements) ? data.nbElements = undefined : Number(data.nbElements);
		data.nbPage = (!data.nbPage) ? data.nbPage = undefined : Number(data.nbPage);
		const loggedUserId = (req as any).user.id;
		const loggedUser: any = { avatar: (req as any).user.avatar, userName: (req as any).user.userName, level: (req as any).user.stat.level };
		const allConversation = await this.chatService.getAllConversationsById(loggedUserId, data);
		return { allConversation, loggedUser } as any;
	}

	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Get(individualConversation)
	async getIndividualConversation(@Query() data: ConversationDto, @Req() req: Request): Promise<IndividualConversationResponse> {
		data.nbElements = (!data.nbElements) ? data.nbElements = undefined : Number(data.nbElements);
		data.nbPage = (!data.nbPage) ? data.nbPage = undefined : Number(data.nbPage);
		const loggedUserId = (req as any).user.id;
		const receivedId = (req as any).params.receiverId;
		return await this.chatService.getIndividualConversationById(loggedUserId, receivedId, data);
	}

	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Get(roomConversation)
	async getRoomConversation(@Query() data: ConversationDto, @Req() req: Request) {
		data.nbElements = (!data.nbElements) ? data.nbElements = undefined : Number(data.nbElements);
		data.nbPage = (!data.nbPage) ? data.nbPage = undefined : Number(data.nbPage);
		const loggedUserId = (req as any).user.id;
		const roomId = (req as any).params.roomId;
		return await this.chatService.getRoomIndividualConversationById(loggedUserId, roomId, data);
	}


	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Post(createRoom)
	async joinRoom(@Body() data: RoomInfos, @Req() req: Request) {
		await this.chatService.joinRoom((req as any).user.id, data);
		return 'success' //TODO return success
	}

	@Post(inviteRoom)
	async inviteRoom(@Body() data: Invitation, @Req() req: Request) {
		await this.chatService.sendInvitation(data.adminId, data.channelId, data.invitedId);
	}
}
