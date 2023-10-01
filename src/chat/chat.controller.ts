import { Body, Controller, Delete, Get, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ConversationDto, Invitation, MuteDto, RoomDeleteInfos, RoomInfos, RoomUpdateInfos, RoomUserInfos } from 'src/dto/chat.dto';
import { ChatService } from './chat.service';
import { JwtGuard } from 'src/auth/guards/guards.jwtGuard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AllUserConversationsResponse, IndividualConversationResponse } from 'src/custom_types/custom_types.Individual-chat';

const chatController = 'chat'
const conversationEndpoint = 'individualConversations'
const individualConversation = 'individualConversations/:receiverId'
const roomConversation = 'room/Conversations/:roomId'
const roomConversations = 'room/Conversations'
const rooms = 'rooms'
const joinRoom = 'room/join'
const leaveRoom = 'room/leave/:roomId'
const updateRoom = 'room/update'
const deleteRoom = 'room/delete'
const inviteRoom = 'room/invite'
const kickRoom = 'room/kick'
const muteRoom = 'room/mute'
const RoomUserStatus = 'room/userStatus'
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
	@Post(joinRoom)
	async joinRoom(@Body() data: RoomInfos, @Req() req: Request) {
		const joinedRoom = await this.chatService.joinRoom((req as any).user.id, data);
		return await this.chatService.getRoomInfosById(joinedRoom.roomChatId);
	}

	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Patch(updateRoom)
	async updateRoom(@Body() data: RoomUpdateInfos, @Req() req: Request) {
		const loggedUserId = (req as any).user.id;
		return await this.chatService.updateRoomInfos(data, loggedUserId);
	}

	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Post(deleteRoom)
	async deleteRoom(@Body() data: RoomDeleteInfos, @Req() req: Request) {
		const loggedUserId = (req as any).user.id;
		return await this.chatService.deleteRoom(loggedUserId, data.channelId);
	}

	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Post(inviteRoom)
	async inviteRoom(@Body() data: Invitation, @Req() req: Request) {
		const loggedUserId = (req as any).user.id;
		await this.chatService.sendInvitation(loggedUserId, data.channelId, data.invitedId);
	}

	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Patch(RoomUserStatus)
	async changeUserStatus(@Body() data: RoomUserInfos, @Req() req: Request) {
		return await this.chatService.changeRoomUserStatus((req as any).user.id, data);
	}

	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Post(kickRoom)
	async kickUserFromRoom(@Body() data: Invitation, @Req() req: Request) {
		const loggedUserId = (req as any).user.id;
		return await this.chatService.kickUserFromRoom(loggedUserId, data);
	}

	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Post(leaveRoom)
	async leaveRoom(@Req() req: Request) {
		await this.chatService.leaveRoom((req as any).user.id, (req as any).params.roomId);
		return { message: 'You left the room' };
	}

	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Post(muteRoom)
	async muteUser(@Body() data: MuteDto, @Req() req: Request) {
		(data as any).mutedAat = Date.now();
		data.duration = data.duration * 60000;
		const loggedUserId = (req as any).user.id;
		return await this.chatService.muteUser(loggedUserId, data);
	}

	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Get(roomConversation)
	async getRoomConversation(@Query() data: ConversationDto, @Req() req: Request) {
		data.nbElements = (!data.nbElements) ? data.nbElements = undefined : Number(data.nbElements);
		data.nbPage = (!data.nbPage) ? data.nbPage = undefined : Number(data.nbPage);
		const loggedUserId = (req as any).user.id;
		const roomId = (req as any).params.roomId;
		const roomConversation = await this.chatService.getRoomIndividualConversationById(loggedUserId, roomId, data);
		const blockedUsers = await this.chatService.getBlckedUsers(loggedUserId);
		return { roomConversation, blockedUsers }
	}

	@UseGuards(JwtGuard)
	@Get(roomConversations)
	async getRoomConversations(@Req() req: Request) {
		const loggedUser: any = { avatar: (req as any).user.avatar, userName: (req as any).user.userName, level: (req as any).user.stat.level };
		const loggedUserId = (req as any).user.id;
		const roomsConversations = await this.chatService.getRoomConversations(loggedUserId);
		const blockedUsers = await this.chatService.getBlckedUsers(loggedUserId);
		const Conversationdata = { roomsConversations, blockedUsers }
		return { loggedUser, Conversationdata };
	}
	
	
	@UseGuards(JwtGuard)
	@Get(roomConversations)
	async exploreChannles() {
		return await this.chatService.exploreChannels();
	}
}
