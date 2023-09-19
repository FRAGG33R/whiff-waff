import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { FriendshipStatus, ChatRoomType, UserStatus } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AllUserConversationsResponse, IndividualConversationResponse, Message } from 'src/custom_types/custom_types.Individual-chat';
import { ConversationDto, RoomInfos, dtoWebSocketTset } from 'src/dto/chat.dto';
import { PrismaService } from 'src/prisma/prisma.service';

import * as ErrorCode from '../shared/constants/constants.code-error';
import * as  CodeMessages from 'src/shared/constants/constants.messages';
import { type } from 'os';

const senderType = 'sender';
const receiverType = 'receiver';
const refactoringAll = 'allConversations'
const refactoringOne = 'individualConversation'
@Injectable()
export class ChatService {
	constructor(private readonly prismaService: PrismaService) { }

	async checkFriendship(sender: string, receiver: string): Promise<boolean> {
		const isFriend = await this.prismaService.friendship.findFirst({
			where: {
				OR:
					[{
						AND: [{ senderId: sender },
						{ receivedId: receiver }]
					}, {
						AND: [{ senderId: receiver },
						{ receivedId: sender }]
					}]
			}
		});
		if (!isFriend || isFriend.status != FriendshipStatus.ACCEPTED)
			return false;
		return true;
	}

	private formatConversationResponse(sender: string, conversationdata: any, refactorType: string): IndividualConversationResponse | AllUserConversationsResponse {
		let messages: Message[] = [];
		let receiver: any;
		let allConversations: AllUserConversationsResponse[] = [];
		conversationdata.forEach((element: any) => {
			const type = ((element as any).originalSender.id === sender) ? senderType : receiverType;
			receiver = ((element as any).sender.id === sender) ? (element as any).receiver : (element as any).sender;
			messages.push({
				content: element.message,
				date: element.date.toString(),
				type: type
			} as Message);
			delete element.message;
			delete element.date;
			delete element.originalSender;
			delete element.sender;
			delete element.receiver;
			if (refactorType === refactoringAll) {
				element.receiver = receiver;
				element.messages = messages;
				allConversations.push(new AllUserConversationsResponse(new IndividualConversationResponse(element.messages, element.receiver)));
				messages = [];
			}
		});
		if (refactorType === refactoringOne) {
			const individualConvesartion = { receiver, messages };
			return new IndividualConversationResponse(individualConvesartion.messages, individualConvesartion.receiver);
		}
		return conversationdata;
	}

	async getAllConversationsById(loggedUserId: string, data: ConversationDto): Promise<AllUserConversationsResponse> {
		try {
			const skip = ((data as any).nbElements && (data as any).nbPage) ? (data as any).nbPage * (data as any).nbElements : 0;
			let conversation = await this.prismaService.chat.findMany({
				select: {
					originalSender: {
						select: {
							id: true,
							avatar: true,
							email: true,
							userName: true
						}
					},
					sender: {
						select: {
							id: true,
							avatar: true,
							email: true,
							userName: true
						}
					},
					receiver: {
						select: {
							id: true,
							avatar: true,
							email: true,
							userName: true
						}
					},
					message: true,
					date: true,
				},
				where  : {
					OR: [{ senderId: loggedUserId }, { receiverId: loggedUserId }]
				},
				take: (data as any).nbElements,
				skip: skip,
				orderBy: {
					date: 'desc',
				},
				distinct: ['senderId', 'receiverId'],
			})
			const allConversation = this.formatConversationResponse(loggedUserId, conversation, refactoringAll) as AllUserConversationsResponse;
			(allConversation[0] as any) = await this.getIndividualConversationById(loggedUserId, conversation[0].receiver.id, data);
			return allConversation;
		} catch (error) {
			throw new ForbiddenException(error);
		}
	}

	async getIndividualConversationById(loggedUserId: string, receiverId: string, data: ConversationDto): Promise<IndividualConversationResponse> {
		const skip = ((data as any).nbElements && (data as any).nbPage) ? (data as any).nbPage * (data as any).nbElements : 0;
		const sorted = Array(loggedUserId, receiverId).sort();

		const conversation = await this.prismaService.chat.findMany({
			select: {
				originalSender: {
					select: {
						id: true,
						avatar: true,
						email: true,
						userName: true
					}
				},
				sender: {
					select: {
						id: true,
						avatar: true,
						email: true,
						userName: true
					}
				},
				receiver: {
					select: {
						id: true,
						avatar: true,
						email: true,
						userName: true
					}
				},
				message: true,
				date: true,
			},
			take: (data as any).nbElements,
			skip: skip,
			orderBy: {
				date: 'asc',
			},
			where: {
				OR: [{ AND: [{ senderId: loggedUserId }, { receiverId: receiverId }] }, { AND: [{ receiverId: loggedUserId }, { senderId: receiverId }] }]
			}
		})
		return this.formatConversationResponse(loggedUserId, conversation, refactoringOne) as IndividualConversationResponse;
	}

	async saveMessage(loggedUserId: string, receiverInfo: dtoWebSocketTset) {
		try {
			const sortedUsers: string[] = Array(loggedUserId, receiverInfo.receiverId).sort();
			await this.prismaService.chat.create({
				data: {
					senderId: sortedUsers[0],
					receiverId: sortedUsers[1],
					originalSenderId: loggedUserId,
					message: receiverInfo.content,
					date: BigInt(receiverInfo.currentDate),
				}
			});
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}

	async joinRoom(loggedUserId: string, data: RoomInfos) {
		try {
			const existRoom = await this.getRoomByName(data.channelName);
			if (!existRoom) {
				const newRoom = await this.creatRoom(data);
				await this.joinUserToRomm(loggedUserId, newRoom.id, UserStatus.ADMIN);
			}
			else {
				// const alreadyExists = await this.prismaService.join.findUnique({
				// 	where: {
				// 		userId_roomChatId: {
				// 			userId: loggedUserId,
				// 			roomChatId: existRoom.id
				// 		}
				// 	}
				// })
				// if (alreadyExists)
				// 	throw { type: 'alreadyExists' }
				if (existRoom.type === ChatRoomType.PRIVATE) {
					const invitedUsersIds = await this.getInvitedUserOnChannelById(loggedUserId, existRoom.id)
					if (!invitedUsersIds)
						throw { type: 'forbiden', message: `The user does not have an invitation to join the room : ${existRoom.name}` }
					await this.joinUserToRomm(loggedUserId, existRoom.id, UserStatus.DEFLAULT);
				}
				else if (existRoom.type === ChatRoomType.PROTECTED) {
					if (data.channelPassword != existRoom.password)
						throw { type: 'forbiden' }
					await this.joinUserToRomm(loggedUserId, existRoom.id, UserStatus.DEFLAULT);
				}
				else
					await this.joinUserToRomm(loggedUserId, existRoom.id, UserStatus.DEFLAULT);
			}
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === ErrorCode.DUPLICATE_ENTRY_ERROR_CODE)
					throw new ForbiddenException(`user${CodeMessages.P2002_MSG}`)
			}
			if (error.type === 'forbiden') {
				throw new ForbiddenException('incorrect password');
			}
			if (error.type === 'alreadyExists')
				throw new ForbiddenException(`user${CodeMessages.P2002_MSG}`)
			throw new InternalServerErrorException(error);
		}
	}

	async getInvitedUserOnChannelById(invitedUserId: string, roomChatId: string) {
		return await this.prismaService.invitedRoomChat.findUnique({
			where: {
				invitedUserId_roomChatId: {
					invitedUserId: invitedUserId,
					roomChatId: roomChatId
				}
			}
		})
	}

	async joinUserToRomm(loggedUserId: string, roomId: string, typeUser: UserStatus) {
		await this.prismaService.join.create({
			data: {
				userId: loggedUserId,
				roomChatId: roomId,
				statut: typeUser
			}
		})
	}

	async creatRoom(data: RoomInfos) {
		try {
			data.channelType = (!data.channelType) ? ChatRoomType.PUBLIC : data.channelType;
			data.channelPassword = (data.channelType === ChatRoomType.PRIVATE) ? undefined : data.channelPassword;
			return await this.prismaService.roomChat.create({
				data: {
					name: data.channelName,
					type: data.channelType,
					password: data.channelPassword
				}
			})
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}

	async getRoomByName(roomName: string) {
		try {
			return await this.prismaService.roomChat.findUnique({
				where: {
					name: roomName
				}
			})
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}
}