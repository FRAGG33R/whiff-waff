import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { FriendshipStatus, ChatRoomType, UserStatus } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AllUserConversationsResponse, IndividualConversationResponse, Message } from 'src/custom_types/custom_types.Individual-chat';
import { ConversationDto, Invitation, RoomInfos, dtoWebSocketTset } from 'src/dto/chat.dto';
import { PrismaService } from 'src/prisma/prisma.service';

import * as ErrorCode from '../shared/constants/constants.code-error';
import * as  CodeMessages from 'src/shared/constants/constants.messages';
import * as message from 'src/shared/constants/constants.messages';
import { type } from 'os';

const senderType = 'sender';
const receiverType = 'receiver';
const refactoringAll = 'allConversations'
const refactoringOne = 'individualConversation'
@Injectable()
export class ChatService {
	constructor(private readonly prismaService: PrismaService) { }

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
				where: {
					OR: [{ senderId: loggedUserId }, { receiverId: loggedUserId }]
				},
				take: (data as any).nbElements,
				skip: skip,
				orderBy: {
					date: 'desc',
				},
				distinct: ['senderId', 'receiverId'],
			})
			if (conversation.length > 0) {
				const allConversation = this.formatConversationResponse(loggedUserId, conversation, refactoringAll) as AllUserConversationsResponse;
				(allConversation[0] as any) = await this.getIndividualConversationById(loggedUserId, conversation[0].receiver.id, data);
				return allConversation;
			}
			return conversation as any;
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
				AND: [{ senderId: sorted[0] }, { receiverId: sorted[1] }]
			}
		})
		if (conversation.length === 0)
			return conversation as any;
		return this.formatConversationResponse(loggedUserId, conversation, refactoringOne) as IndividualConversationResponse;
	}


	async joinRoom(loggedUserId: string, data: RoomInfos) {
		try {
			const existRoom = await this.getRoomByName(data.channelName);
			if (!existRoom) {
				const newRoom = await this.creatRoom(data);
				return await this.joinUserToRomm(loggedUserId, newRoom.id, UserStatus.ADMIN);
			}
			else {
				if (data.channelType && (data.channelType !== existRoom.type))
					throw { type: 'channelExists', channel: existRoom.type }
				const alreadyExists = await this.prismaService.join.findUnique({
					where: {
						userId_roomChatId: {
							userId: loggedUserId,
							roomChatId: existRoom.id
						}
					}
				})
				if (alreadyExists)
					throw { type: 'alreadyExists' }
				if (existRoom.type === ChatRoomType.PRIVATE) {
					const invitedUsersIds = await this.getInvitedUserOnChannelById(loggedUserId, existRoom.id)
					if (!invitedUsersIds)
						throw { type: 'Privateforbiden' }
					return await this.joinUserToRomm(loggedUserId, existRoom.id, UserStatus.DEFLAULT);
				}
				else if (existRoom.type === ChatRoomType.PROTECTED) {
					if (data.channelPassword != existRoom.password)
						throw { type: 'forbiden' }
					return await this.joinUserToRomm(loggedUserId, existRoom.id, UserStatus.DEFLAULT);
				}
				else
					return await this.joinUserToRomm(loggedUserId, existRoom.id, UserStatus.DEFLAULT);
			}
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === ErrorCode.DUPLICATE_ENTRY_ERROR_CODE)
					throw new ForbiddenException(`user${CodeMessages.P2002_MSG}`)
			}
			if (error.type === 'forbiden') {
				throw new ForbiddenException('incorrect password');
			}
			if (error.type === 'Privateforbiden') {
				throw new ForbiddenException(`The user is not authorized to access the room called : ${data.channelName}`);
			}
			if (error.type === 'alreadyExists')
				throw new ForbiddenException(`user${CodeMessages.P2002_MSG} in ${data.channelName}`)
			if (error.type === 'channelExists')
				throw new ForbiddenException(`${data.channelName}${CodeMessages.P2002_MSG} as a ${error.channel} type`)
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
		return await this.prismaService.join.create({
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
			data.channelPassword = (data.channelType === ChatRoomType.PROTECTED) ? data.channelPassword : undefined;
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



	async sendInvitation(adminId: string, roomId: string, invitedId: string) {
		try {
			const existRoom = await this.getJoinedRoomByIds(adminId, roomId);
			if (!existRoom)
				throw { type: 'notFound' }
			if (existRoom.statut !== UserStatus.ADMIN)
				throw { type: 'notAdmin' }
			if (existRoom.roomChat.type !== ChatRoomType.PRIVATE)
				throw { type: 'notPrivate' }
			const invitedUser = await this.getIvitedUsersByIds(invitedId, roomId);
			if (invitedUser)
				throw { type: 'alreadyExists' }
			await this.prismaService.invitedRoomChat.create({
				data: {
					adminId: adminId,
					roomChatId: roomId,
					invitedUserId: invitedId
				}
			});
		} catch (error) {
			if (error.type === 'notFound')
				throw new NotFoundException('The channel specified, or the administrator does not exist');
			if (error.type === 'notAdmin')
				throw new ForbiddenException('Only administrators are authorized to send invitations.')
			if (error.type === 'alreadyExists')
				throw new ForbiddenException('User already invited')
			if (error.type === 'notPrivate')
				throw new ForbiddenException('The channel should be in a private type')
			if (error instanceof PrismaClientKnownRequestError)
				if (error.code === ErrorCode.FOREIGN_KEY_CONSTRAINT_CODE)
					throw new NotFoundException(message.UNEXISTING_ID)
			throw new InternalServerErrorException();
		}

	}

	async getJoinedRoomByIds(adminId: string, roomId: string) {
		const room = await this.prismaService.join.findUnique({
			select: {
				statut: true,
				roomChat: {
					select: {
						type: true
					}
				}
			},
			where: {
				userId_roomChatId: {
					userId: adminId,
					roomChatId: roomId
				}
			}
		})
		return room;
	}

	async getIvitedUsersByIds(invitedId: string, roomId: string) {
		const invitedUser = await this.prismaService.invitedRoomChat.findUnique({
			where: {
				invitedUserId_roomChatId: {
					invitedUserId: invitedId,
					roomChatId: roomId
				}
			}
		})
		return invitedUser;
	}

	async getRoomIndividualConversationById(loggedUserId: string, roomId: string, data: ConversationDto) {
		try {
			const skip = ((data as any).nbElements && (data as any).nbPage) ? (data as any).nbPage * (data as any).nbElements : 0;
			const roomConversation = await this.prismaService.message.findMany({
				select: {
					roomSender: {
						select: {
							user: {
								select: {
									id: true,
									avatar: true,
									email: true,
									userName: true,
								}
							},
						}
					},
					date: true,
					message: true,
				},
				where: {
					roomChatId: roomId
				},
				take: (data as any).nbElements,
				skip: skip,
				orderBy: {
					date: 'asc'
				}
			})
			roomConversation.forEach(element => {
				element.date = element.date.toString() as any;
			})
			return this.fromatIndividualRoom(loggedUserId, roomConversation);
		} catch (error) {
			console.log(error);
			throw new InternalServerErrorException(error);

		}
	}

	async fromatIndividualRoom(loggedUserId: string, roomsConversations: any) {
		let message: Message;
		const roomConversations: any[] = [];

		roomsConversations.forEach((element: any) => {
			const type = ((element as any).roomSender.user.id === loggedUserId) ? senderType : receiverType;
			message = {
				content: element.message,
				date: element.date.toString(),
				type: type
			} as Message;
			element.user = element.roomSender.user;
			delete element.roomSender;
			delete element.message;
			delete element.date;
			element.message = message;
		});
		return roomsConversations;
	}


	async getRoomConversations(loggedUserId: string) {
		try {
			let roomsConversations = await this.getRoomsInfos(loggedUserId);
			roomsConversations = await this.structreRoomdata(roomsConversations); 
			roomsConversations[0] = await this.getRoomIndividualConversationById(loggedUserId, roomsConversations[0].roomSender.roomChatId, { nbElements: 10, nbPage: 0 } as any);
			roomsConversations = this.formmatRoomConversations(loggedUserId, roomsConversations);
			return roomsConversations;
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}


	async getRoomsInfos(loggedUserId: string) {
		return await this.prismaService.message.findMany({
			distinct: ['roomChatId'],
			where: {
				senderId: loggedUserId,
			},
			orderBy: {
				date: 'desc'
			},
			select: {
				roomSender: {
					select: {
						user: {
							select: {
								id: true,
								avatar: true,
								email: true,
								userName: true,
							}
						},
						roomChatId: true,
					}
				},
				message: true,
				date: true,
			}
		});
	}

	async structreRoomdata(roomsConversations: any) {
		for (let i = 0; i < roomsConversations.length; i++) {
			roomsConversations[i].date = roomsConversations[i].date.toString() as any;
			const avatars = await this.prismaService.join.findMany({
				select: {
					user: {
						select: {
							avatar: true,
						}
					}
				},
				where: {
					roomChatId: roomsConversations[i].roomSender.roomChatId,
				},
			});
			(roomsConversations[i] as any).avatars = avatars;
		}
		return roomsConversations;
	}

	formmatRoomConversations(loggedUserId: string, roomsConversations: any) {
		roomsConversations.forEach((element: any, index: number) => {
			if (index !== 0) {
				const type = ((element as any).roomSender.user.id === loggedUserId) ? senderType : receiverType;
				element.message = {
					content: element.message,
					date: element.date.toString(),
					type: type
				} as Message;
				element.user = element.roomSender.user;
				delete element.date;
				delete element.roomSender.roomChatId;
				delete element.roomSender;
			}
		});
		return roomsConversations;
	}
}