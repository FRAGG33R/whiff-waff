import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ConversationDto, Kick,Invit, MuteDto, RoomDeleteInfos, RoomInfos, RoomUpdateInfos, RoomUserInfos } from 'src/dto/chat.dto';
import { ChatService } from './chat.service';
import { JwtGuard } from 'src/auth/guards/guards.jwtGuard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AllUserConversationsResponse, IndividualConversationResponse } from 'src/custom_types/custom_types.Individual-chat';
import { toObject } from 'src/shared/responses/responses.sucess-response';

const chatController = 'chat'
const conversationEndpoint = 'individualConversations'
const individualConversation = 'individualConversations/:receiverId'
const roomConversation = 'room/Conversations/:roomId'
const roomConversations = 'room/Conversations'
const exploreChannels = 'exploreChannels'
const usersOfRoom = 'usersOfRoom/:roomId'
const joinRoom = 'room/join'
const leaveRoom = 'room/leave'
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
		const blockedUsers = toObject.call(await this.chatService.getBlckedUsers(loggedUserId));
		return toObject.call({ allConversation, loggedUser, blockedUsers } as any);
	}

	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Get(individualConversation)
	async getIndividualConversation(@Query() data: ConversationDto, @Req() req: Request): Promise<IndividualConversationResponse> {
		data.nbElements = (!data.nbElements) ? data.nbElements = undefined : Number(data.nbElements);
		data.nbPage = (!data.nbPage) ? data.nbPage = undefined : Number(data.nbPage);
		const loggedUserId = (req as any).user.id;
		const receivedId = (req as any).params.receiverId;
		return toObject.call(await this.chatService.getIndividualConversationById(loggedUserId, receivedId, data));
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
	async inviteRoom(@Body() data: Invit, @Req() req: Request) {
		const loggedUserId = (req as any).user.id;
		await this.chatService.sendInvitation(loggedUserId, data.channelId, data.userName);
	}

	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Patch(RoomUserStatus)
	async changeUserStatus(@Body() data: RoomUserInfos, @Req() req: Request) {
		return toObject.call(await this.chatService.changeRoomUserStatus((req as any).user.id, data));
	}

	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Post(kickRoom)
	async kickUserFromRoom(@Body() data: Kick, @Req() req: Request) {
		const loggedUserId = (req as any).user.id;
		return toObject.call(await this.chatService.kickUserFromRoom(loggedUserId, toObject.call(data)));
	}

	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Post(leaveRoom)
	async leaveRoom(@Req() req: Request, @Body() data: RoomDeleteInfos) {
		await this.chatService.leaveRoom((req as any).user.id, data.channelId);
		return { message: 'You left the room' };
	}

	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Post(muteRoom)
	async muteUser(@Body() data: MuteDto, @Req() req: Request) {
		(data as any).mutedAat = Date.now();
		data.duration = data.duration * 60000;
		const loggedUserId = (req as any).user.id;
		return toObject.call(await this.chatService.muteUser(loggedUserId, toObject.call(data)));
	}

	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Get(roomConversation)
	async getRoomConversation(@Query() data: ConversationDto, @Req() req: Request) {
		data.nbElements = (!data.nbElements) ? data.nbElements = undefined : Number(data.nbElements);
		data.nbPage = (!data.nbPage) ? data.nbPage = undefined : Number(data.nbPage);
		const loggedUserId = (req as any).user.id;
		const roomId = (req as any).params.roomId;
		const roomConversation = toObject.call(await this.chatService.getRoomIndividualConversationById(loggedUserId, roomId, data));
		const blockedUsers = toObject.call(await this.chatService.getBlckedUsers(loggedUserId));
		return { roomConversation, blockedUsers }
	}

	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Get(roomConversations)
	async getRoomConversations(@Req() req: Request) {
		const loggedUser: any = { id: (req as any).user.id, avatar: (req as any).user.avatar, userName: (req as any).user.userName, level: (req as any).user.stat.level };
		const loggedUserId = (req as any).user.id;
		const roomsConversations = toObject.call(await this.chatService.getRoomConversations(loggedUserId));
		const blockedUsers = toObject.call(await this.chatService.getBlckedUsers(loggedUserId));
		const Conversationdata = { roomsConversations, blockedUsers }
		return { loggedUser, Conversationdata };
	}

	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Get(exploreChannels)
	async exploreChannles() {
		return await this.chatService.exploreChannels();
	}

	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Get(usersOfRoom)
	async getUsersOfRoom(@Param('roomId') roomId: string) {
		return await this.chatService.getUsersOfRoom(roomId);
	}
}
