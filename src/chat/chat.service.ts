import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { FriendshipStatus } from '@prisma/client';
import { AllUserConversationsResponse, IndividualConversationResponse, Message } from 'src/custom_types/custom_types.Individual-chat';
import { ConversationDto, dtoWebSocketTset } from 'src/dto/chat.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as message from 'src/shared/constants/constants.messages'
import { IndentStyle } from 'typescript';

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
				date: element.date,
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
				date: 'desc',
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
				data : {
					senderId: sortedUsers[0],
					receiverId: sortedUsers[1],
					originalSenderId: loggedUserId,
					message: receiverInfo.content,
					date: receiverInfo.currentDate,
					messageId: 'null'
				}
			});
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}
}