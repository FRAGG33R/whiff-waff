import { ForbiddenException, Injectable } from '@nestjs/common';
import { Chat, FriendshipStatus, PrismaClient } from '@prisma/client';
import { table } from 'console';
import { take } from 'rxjs';
import { Message, IndividualChatResponse } from 'src/custom_types/custom_types.Individual-chat';
import { ConversationDto } from 'src/dto/chat.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as message from 'src/shared/constants/constants.messages'
@Injectable()
export class ChatService {
	constructor(private readonly prismaService: PrismaService) { }

	private refactorConversation(sender: string, conversationdata: any) {
		conversationdata.forEach((element: { sender: { id: string; }; type: string; }) => {
			if (element.sender.id === sender)
				element.type = 'sender'
			else
				element.type = 'receiver'
		});
		return conversationdata;
	}

	private transformToChatResponse(conversation: any): IndividualChatResponse {
		const messages: Message[] = [];
		const nbEkements = (conversation as any).length;
		for (const message of conversation) {
			messages.push({
				message: message.message,
				date: message.date,
				sender: {
					id: message.sender.id,
					userName: message.sender.userName
				},
				type: message.type
			})
		}
		return new IndividualChatResponse(messages, nbEkements);
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

	async getConversation(data: ConversationDto): Promise<IndividualChatResponse> {
		try {
			const skip = ((data as any).nbElements && (data as any).nbPage) ? (data as any).nbPage * (data as any).nbElements : 0;
			// const isFriend = await this.prismaService.friendship.findFirst({
			// 	where: {
			// 		OR:
			// 			[{
			// 				AND: [{ senderId: (data as any).senderId },
			// 				{ receivedId: (data as any).receiverId }]
			// 			}, {
			// 				AND: [{ senderId: (data as any).receiverId },
			// 				{ receivedId: (data as any).senderId }]
			// 			}]
			// 	}
			// });
			const isFriend = await this.checkFriendship((data as any).senderId, (data as any).receiverId);
			if (!isFriend || (isFriend as any).status != FriendshipStatus.ACCEPTED)
				throw message.NOT_FRIEND
			const conversation = await this.prismaService.chat.findMany({
				select: {
					message: true,
					date: true,
					sender: {
						select: {
							id: true,
							userName: true
						}
					},
				},
				where: {
					AND: [{
						OR: [{ AND: [{ senderId: (data as any).senderId, receiverId: (data as any).receiverId }] },
						{
							AND: [{ receiverId: (data as any).senderId },
							{ senderId: (data as any).receiverId }]
						}]
					},
					{ AND: [{ date: { gte: (data as any).startDate } }, { date: { lte: (data as any).endDate } }] }]
				},
				take: (data as any).nbElements,
				skip: skip,
				orderBy: {
					date: 'asc',
				}
			})
			const responseChat = this.refactorConversation((data as any).senderId, conversation);
			return this.transformToChatResponse(responseChat);
		} catch (error) {
			throw new ForbiddenException(error);
		}
	}
}
