import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { FriendshipStatus, ChatRoomType, UserStatus } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AllUserConversationsResponse, IndividualConversationResponse, Message } from 'src/custom_types/custom_types.Individual-chat';
import { ConversationDto, Invit, Kick, MuteDto, RoomInfos, RoomUpdateInfos, RoomUserInfos, dtoIndividualChat } from 'src/dto/chat.dto';
import { PrismaService } from 'src/prisma/prisma.service';

import * as ErrorCode from '../shared/constants/constants.code-error';
import * as  CodeMessages from 'src/shared/constants/constants.messages';
import * as message from 'src/shared/constants/constants.messages';
import { type } from 'os';
import { toObject } from 'src/shared/responses/responses.sucess-response';

const senderType = 'sender';
const receiverType = 'receiver';
const refactoringAll = 'allConversations'
const refactoringOne = 'individualConversation'
@Injectable()
export class ChatService {
	constructor(private readonly prismaService: PrismaService) { }

	async saveMessageInRoom(loggeduserId: string, data: dtoIndividualChat) {
		try {
			const existRoom = await this.getJoinedRoomByIds(loggeduserId, data.receiverId);
			if (!existRoom)
				throw { type: 'notFound' }
			if (existRoom.status === UserStatus.BANNED)
				throw { type: 'banned' }
			if (existRoom.status === UserStatus.MUTED)
				throw { type: 'muted' }
			await this.prismaService.message.create({
				data: {
					roomChatId: data.receiverId,
					message: data.content,
					senderId: loggeduserId,
					date: data.currentDate
				}
			})
			return true;
		} catch (error) {
			if (error.type === 'notFound')
				throw new NotFoundException('The channel specified, or the administrator does not exist');
			if (error.type === 'banned')
				throw new ForbiddenException('You are banned from this channel');
			if (error.type === 'muted')
				throw new ForbiddenException('You are muted in this channel');
			throw new InternalServerErrorException(error);
		}
	}

	async saveMessage(loggedUserId: string, receiverInfo: dtoIndividualChat) {
		try {
			const sortedUsers: string[] = Array(loggedUserId, receiverInfo.receiverId).sort();
			await this.prismaService.chat.create({
				data: {
					senderId: sortedUsers[0],
					receiverId: sortedUsers[1],
					originalSenderId: loggedUserId,
					message: receiverInfo.content,
					date: receiverInfo.currentDate,
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
	async checkBlocked(sender: string, receiver: string): Promise<any> {
		return await this.prismaService.friendship.findFirst({
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
			const individualConvesartion = { receiver, messages, status: conversationdata[0].status };
			return new IndividualConversationResponse(individualConvesartion.messages, individualConvesartion.receiver);
		}
		return conversationdata;
	}

	async getAllConversationsById(loggedUserId: string, data: ConversationDto): Promise<AllUserConversationsResponse> {
		try {
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
							userName: true,
						}
					},
					receiver: {
						select: {
							id: true,
							avatar: true,
							email: true,
							userName: true,
						},	
					},
					message: true,
					date: true,
				},
				where: {
					OR: [{ senderId: loggedUserId }, { receiverId: loggedUserId }]
				},
				orderBy: {
					date: 'asc',
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
		try {
			const skip = ((data as any).nbElements && (data as any).nbPage) ? (data as any).nbPage * (data as any).nbElements : 0;
			const sorted = Array(loggedUserId, receiverId).sort();
			// if (await this.checkFriendship(sorted[0], sorted[1]) === false)
			// 	throw { type: 'notFound' };
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
			});
			if (conversation.length === 0)
			return conversation as any;
			return this.formatConversationResponse(loggedUserId, conversation, refactoringOne) as IndividualConversationResponse;
		} catch (error) {
			if (error.type === 'notFound')
				throw new ForbiddenException(error.type);
			throw new InternalServerErrorException(error);
		}
	}

	async joinRoom(loggedUserId: string, data: RoomInfos) {
		try {
			if (data.channelPassword && (data.channelType && data.channelType === ChatRoomType.PRIVATE))
				throw { type: 'forbidenPrivate' }
			const existRoom = await this.getRoomByName(data.channelName);
			if (!existRoom) {
				const newRoom = await this.creatRoom(data);
				return await this.joinUserToRomm(loggedUserId, newRoom.id, UserStatus.OWNER);
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
				if (alreadyExists) {
					if (alreadyExists.status === UserStatus.BANNED)
						throw { type: 'banned' }
					throw { type: 'alreadyExists' }
				}
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
			if (error.type === 'forbiden')
				throw new ForbiddenException('incorrect password');
			if (error.type === 'Privateforbiden' || error.type === 'banned')
				throw new ForbiddenException(`The user is not authorized to access the room called : ${data.channelName}`);
			if (error.type === 'alreadyExists')
				throw new ForbiddenException(`user${CodeMessages.P2002_MSG} in ${data.channelName}`)
			if (error.type === 'channelExists')
				throw new ForbiddenException(`${data.channelName}${CodeMessages.P2002_MSG} as a ${error.channel} type`)
			if (error.type === 'forbidenPrivate')
				throw new ForbiddenException(`private channel should not have a password`)
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
				status: typeUser
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

	async sendInvitation(loggedUserId: string, roomId: string, userName: string) {
		try {
			const existsUser = await this.prismaService.user.findUnique({
				where: {
					userName: userName
				}
			});
			if (!existsUser)
				throw { type: 'userNotFound' }
			const invitedId = existsUser.id;
			const existRoom = await this.getJoinedRoomByIds(loggedUserId, roomId);
			if (!existRoom)
				throw { type: 'notFound' }
			if (existRoom.status !== UserStatus.ADMIN && existRoom.status !== UserStatus.OWNER)
				throw { type: 'notAdmin' }
			if (existRoom.roomChat.type !== ChatRoomType.PRIVATE)
				throw { type: 'notPrivate' }
			const invitedUser = await this.getIvitedUsersByIds(invitedId, roomId);
			if (invitedUser)
				throw { type: 'alreadyExists' }
			await this.prismaService.invitedRoomChat.create({
				data: {
					adminId: loggedUserId,
					roomChatId: roomId,
					invitedUserId: invitedId
				}
			});
		} catch (error) {
			if (error.type === 'notFound')
				throw new NotFoundException('The channel specified, or the administrator does not exist');
			if (error.type === 'userNotFound')
				throw new NotFoundException('User does not exist');
			if (error.type === 'notAdmin')
				throw new ForbiddenException('Only administrators are authorized to send invitations.')
			if (error.type === 'alreadyExists')
				throw new ForbiddenException('User already invited')
			if (error.type === 'notPrivate')
				throw new ForbiddenException('The channel should be  private')
			if (error instanceof PrismaClientKnownRequestError)
				if (error.code === ErrorCode.FOREIGN_KEY_CONSTRAINT_CODE)
					throw new NotFoundException(message.UNEXISTING_ID)
			throw new InternalServerErrorException();
		}
	}

	async getJoinedRoomByIds(adminId: string, roomId: string) {
		const room = await this.prismaService.join.findUnique({
			select: {
				status: true,
				mutedAt: true,
				mutedAmout: true,
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
		return toObject.call(room);
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
			const existsRoom = await this.getJoinedRoomByIds(loggedUserId, roomId);
			if (!existsRoom)
				throw { type: 'notFound' }
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
								},
							},
						}
					},
					date: true,
					message: true,
				},
				where: {
					roomChatId: roomId
				},
				orderBy: {
					date: 'asc'
				}
			})
			roomConversation.forEach(element => {
				element.date = element.date.toString() as any;
			})
			return this.fromatIndividualRoom(loggedUserId, roomConversation);
		} catch (error) {
			if (error.type === 'notFound')
				throw new NotFoundException('The channel specified, or the administrator does not exist');
			throw new InternalServerErrorException(error);

		}
	}

	async getBlckedUsers(loggedUserId: string) {
		try {
			const blockedUsers = await this.prismaService.friendship.findMany({
				select: {
					receivedId: true,
					senderId: true,
					sender: {
						select: {
							userName: true,
						}
					},
					receiver: {
						select: {
							userName: true,
						}
					}
				},
				where: {
					AND: [{ OR: [{ receivedId: loggedUserId }, { senderId: loggedUserId }] }, { status: FriendshipStatus.BLOCKED }]
				}
			})
			let blckedIds: any = [];
			blockedUsers.forEach(element => {
				if (element.receivedId === loggedUserId)
					blckedIds.push({ id: element.senderId, userName: element.sender.userName });
				else
					blckedIds.push({ id: element.receivedId, userName: element.receiver.userName });
			});
			return blckedIds;
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}

	async fromatIndividualRoom(loggedUserId: string, roomsConversations: any) {
		let message: Message;
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
			let newMessage: any[] = [];
			roomsConversations.forEach((element) => {
				if (element.messages.length > 0) {
					newMessage.push(element.messages[0]);
					(element as any).message = newMessage;
					(element as any).message[0].date = (element as any).message[0].date.toString();
					(element as any).message[0].type = ((element as any).message[0].roomSender.user.id === loggedUserId) ? senderType : receiverType;
				}
				else
					(element as any).message = [];
				delete element.messages;
			});
			roomsConversations = await this.structreRoomdata(roomsConversations);
			if (roomsConversations.length > 0)
				(roomsConversations[0] as any).message = await this.getRoomIndividualConversationById(loggedUserId, roomsConversations[0].roomChat.id, { nbElements: 10, nbPage: 0 } as any);
			// roomsConversations = this.formmatRoomConversations(loggedUserId, roomsConversations);
			return roomsConversations;
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}

	async getRoomsInfos(loggedUserId: string) {
		return await this.prismaService.join.findMany({
			select: {
				roomChat: {
					select: {
						id: true,
						name: true,
						type: true,
					}
				},
				messages: {
					select: {
						roomSender: {
							select: {
								user: {
									select: {
										id: true,
										userName: true
									}
								},
								status: true,
							}
						},
						message: true,
						date: true,
					},
					orderBy: {
						date: 'desc'
					}
				},

			},
			where: {
				AND: [{ status: { not: UserStatus.BANNED } }, { userId: loggedUserId }],
			},
		})
	}

	async structreRoomdata(roomsConversations: any) {
		for (let i = 0; i < roomsConversations.length; i++) {
			const avatars = await this.prismaService.join.findMany({
				select: {
					user: {
						select: {
							avatar: true,
						}
					},
					status: true,
				},
				where: {
					roomChatId: roomsConversations[i].roomChat.id,
				},
			});
			let avatarsarray = [];
			avatars.forEach(element => {
				if (element.status !== UserStatus.BANNED.toString())
					avatarsarray.push(element.user.avatar);
			});
			(roomsConversations[i] as any).avatars = avatarsarray;
		}
		return roomsConversations;
	}

	async getUsersInRoomById(roomId: string) {
		try {
			const users = await this.prismaService.join.findMany({
				select: {
					user: {
						select: {
							id: true,
							userName: true,
							avatar: true,
						}
					}
				},
				where: {
					AND: [{ status: { not: UserStatus.BANNED } }, { roomChatId: roomId }],
				},
			})
			return users;
		} catch (error) {

		}
	}

	async getRoomInfosById(roomId: string) {
		try {
			const newRoom = await this.prismaService.roomChat.findUnique({
				select: {
					id: true,
					name: true,
					type: true,
					joins: {
						select: {
							user: {
								select: {
									avatar: true,
								}
							}
						}
					}
				},
				where: {
					id: roomId
				}
			})
			if (newRoom) {
				let avatars: string[] = [];
				newRoom.joins.forEach(element => {
					avatars.push(element.user.avatar);
				});
				delete newRoom.joins;
				(newRoom as any).avatars = avatars;
			}
			return newRoom;
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
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

	async updateRoomInfos(data: RoomUpdateInfos, loggedUserId: string) {//TODO setting password make channel protected
		try {
			const existRoom = await this.getJoinedRoomByIds(loggedUserId, data.channelId);
			if (!existRoom)
				throw { type: 'notFound' }
			if (existRoom.status !== UserStatus.ADMIN && existRoom.status !== UserStatus.OWNER)
				throw { type: 'notAdmin' }
			if (data.channelPassword) {
				if (existRoom.roomChat.type === ChatRoomType.PRIVATE)
					throw { type: 'Privateforbiden' }
				data.channelType = ChatRoomType.PROTECTED;
			}
			const newRommInfos = await this.prismaService.roomChat.update({
				where: {
					id: data.channelId
				},
				data: {
					name: data.channelName,
					type: data.channelType,
					password: data.channelPassword
				}
			})
			return newRommInfos;
		} catch (error) {
			if (error.type === 'notFound')
				throw new NotFoundException('The channel specified, or the administrator does not exist');
			if (error.type === 'notAdmin')
				throw new ForbiddenException('Only administrators are authorized to update the room\'s information.');
			if (error.type === 'Privateforbiden')
				throw new ForbiddenException('private channel should not have a password');
			throw new InternalServerErrorException(error);
		}
	}

	async deleteRoom(loggedUserId: string, roomId: string) {
		try {
			const existRoom = await this.getJoinedRoomByIds(loggedUserId, roomId);
			if (!existRoom)
				throw { type: 'notFound' }
			if (existRoom.status !== UserStatus.OWNER)
				throw { type: 'notOwner' }
			return await this.prismaService.roomChat.delete({
				where: {
					id: roomId
				}
			})
		} catch (error) {
			if (error.type === 'notFound')
				throw new NotFoundException('The channel specified, or the administrator does not exist');
			if (error.type === 'notOwner')
				throw new ForbiddenException('Only owners are authorized to delete the room.');
			throw new InternalServerErrorException(error);
		}
	}

	async kickUserFromRoom(loggedUserId: string, data: Kick) {
		try {
			const existRoom = await this.getJoinedRoomByIds(loggedUserId, data.channelId);
			if (!existRoom)
				throw { type: 'notFound' }
			if (existRoom.status !== UserStatus.ADMIN && existRoom.status !== UserStatus.OWNER)
				throw { type: 'notAdmin' }
			const userStatus = await this.getJoinedRoomByIds(data.invitedId, data.channelId);
			if (!userStatus)
				throw { type: 'notFound' }
			if (userStatus.status === UserStatus.OWNER)
				throw { type: 'owner' }
			const kickedUser = await this.prismaService.join.delete({
				where: {
					userId_roomChatId: {
						userId: data.invitedId,
						roomChatId: data.channelId
					}
				}
			});
			return kickedUser;
		} catch (error) {
			if (error.type === 'notFound')
				throw new NotFoundException('The channel specified, or the administrator does not exist');
			if (error.type === 'notAdmin')
				throw new ForbiddenException('Only administrators are authorized to delete the room.');
			if (error.type === 'owner')
				throw new ForbiddenException('The owner cannot be kicked out of the room.');
			throw new InternalServerErrorException(error);
		}
	}

	async banUserFromRoom(loggedUserId: string, data: Kick) {
		try {
			const existRoom = await this.getJoinedRoomByIds(loggedUserId, data.channelId);
			if (!existRoom)
				throw { type: 'notFound' }
			if (existRoom.status !== UserStatus.ADMIN && existRoom.status !== UserStatus.OWNER)
				throw { type: 'notAdmin' }
			const userStatus = await this.getJoinedRoomByIds(data.invitedId, data.channelId);
			if (userStatus.status === UserStatus.OWNER)
				throw { type: 'owner' }
			const bannedUser = await this.prismaService.join.update({
				where: {
					userId_roomChatId: {
						userId: data.invitedId,
						roomChatId: data.channelId
					}
				},
				data: {
					status: UserStatus.BANNED
				}
			});
			return bannedUser;
		} catch (error) {
			if (error.type === 'notFound')
				throw new NotFoundException('The channel specified, or the administrator does not exist');
			if (error.type === 'notAdmin')
				throw new ForbiddenException('Only administrators are authorized to delete the room.');
			if (error.type === 'owner')
				throw new ForbiddenException('The owner cannot be banned from the room.');
			throw new InternalServerErrorException(error);
		}
	}

	async leaveRoom(loggedUserId: string, roomId: string) {//TODO send event to room sockets for removing user from room
		try {
			const existRoom = await this.getJoinedRoomByIds(loggedUserId, roomId);
			if (!existRoom)
				throw { type: 'notFound' }
			const leavedRoom = await this.prismaService.join.delete({
				where: {
					userId_roomChatId: {
						userId: loggedUserId,
						roomChatId: roomId
					}
				}
			});
			let newAdmin = await this.prismaService.join.findFirst({
				where: {
					roomChatId: roomId,
					status: UserStatus.ADMIN
				}
			});
			if (!newAdmin)
				newAdmin = await this.prismaService.join.findFirst({
					where: {
						roomChatId: roomId,
						status: UserStatus.DEFLAULT
					}
				});
			if (!newAdmin)
				await this.prismaService.roomChat.delete({
					where: {
						id: roomId
					}
				});
			else
				await this.prismaService.join.update({
					where: {
						userId_roomChatId: {
							userId: newAdmin.userId,
							roomChatId: roomId
						}
					},
					data: {
						status: UserStatus.OWNER
					}
				});
			return leavedRoom;
		} catch (error) {
			if (error.type === 'notFound')
				throw new NotFoundException('The channel specified, or the administrator does not exist');
			if (error.type === 'notAdmin')
				throw new ForbiddenException('Only administrators are authorized to delete the room.');
			throw new InternalServerErrorException(error);
		}
	}

	async changeRoomUserStatus(loggedUserId: string, data: RoomUserInfos) {
		try {
			const existRoom = await this.getJoinedRoomByIds(loggedUserId, data.roomId);
			if (!existRoom)
				throw { type: 'notFound' }
			if (existRoom.status !== UserStatus.ADMIN && existRoom.status !== UserStatus.OWNER)
				throw { type: 'notAdmin' }
			const userStatus = await this.getJoinedRoomByIds(data.userId, data.roomId);
			if (userStatus.status === UserStatus.OWNER)
				throw { type: 'owner' }
			const newUserStatus = await this.prismaService.join.update({
				where: {
					userId_roomChatId: {
						userId: data.userId,
						roomChatId: data.roomId
					}
				},
				data: {
					status: data.newStatus
				},
			});
			return newUserStatus;
		} catch (error) {
			if (error.type === 'notFound')
				throw new NotFoundException('The channel specified, or the administrator does not exist');
			if (error.type === 'notAdmin')
				throw new ForbiddenException('Only administrators are authorized to delete the room.');
			if (error.type === 'owner')
				throw new ForbiddenException('The owner cannot be banned from the room.');
			throw new InternalServerErrorException(error);
		}
	}

	async muteUser(loggedUserId: string, data: MuteDto) {
		try {
			if (!data.mute) {
				delete data.duration;
				delete (data as any).mutedAat;
			}
			const existRoom = await this.getJoinedRoomByIds(loggedUserId, data.roomId);
			if (!existRoom)
				throw { type: 'notFound' }
			if (existRoom.status !== UserStatus.ADMIN && existRoom.status !== UserStatus.OWNER)
				throw { type: 'notAdmin' }
			const userStatus = await this.getJoinedRoomByIds(data.userId, data.roomId);
			if (userStatus.status === UserStatus.OWNER)
				throw { type: 'owner' }
			const muteUser = (data.mute) ? UserStatus.MUTED : userStatus.status;
			if (!data.mute) {
				delete data.duration;
				delete (data as any).mutedAat;
			}
			const mutedUser = await this.prismaService.join.update({
				where: {
					userId_roomChatId: {
						userId: data.userId,
						roomChatId: data.roomId
					}
				},
				data: {
					status: muteUser,
					mutedAmout: Number(data.duration),
					mutedAt: BigInt((data as any).mutedAat)
				}
			});
			// mutedUser.mutedAt = mutedUser.mutedAt.toString() as any;
			return toObject.call(mutedUser);
		} catch (error) {
			if (error.type === 'notFound')
				throw new NotFoundException('The channel specified, or the administrator does not exist');
			if (error.type === 'notAdmin')
				throw new ForbiddenException('Only administrators are authorized to delete the room.');
			if (error.type === 'owner')
				throw new ForbiddenException('The owner cannot be banned from the room.');
			throw new InternalServerErrorException(error);
		}
	}

	async exploreChannels() {
		try {
			const data = await this.prismaService.roomChat.findMany({
				select: {
					id: true,
					name: true,
					type: true,
					joins: {
						select: {
							user: {
								select: {
									avatar: true,
								}
							}
						}
					}
				},
			})
			data.forEach(element => {
				let avatars: any[] = [];
				element.joins.forEach((element: any) => {
					avatars.push(element.user.avatar);
				});
				(element as any).avatars = avatars;
				delete element.joins;
			})
			return data;
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}

	async getUsersOfRoom(roomId: string) {
		const users = await this.prismaService.join.findMany({
			select: {
				user: {
					select: {
						id: true,
						userName: true,
						avatar: true,
					}
				},
				status: true,
			},
			where: {
				roomChatId: roomId,
			}
		});
		if (users.length !== 0) {
			for (let i = 0; i < users.length; i++) {
				if (users[i].status === UserStatus.BANNED)
					delete users[i];
			}
		}
		return users;
	}
}