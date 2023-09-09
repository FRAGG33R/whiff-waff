import { Body, Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { ConversationDto } from 'src/dto/chat.dto';
import { ChatService } from './chat.service';
import { JwtGuard } from 'src/auth/guards/guards.jwtGuard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Message, IndividualChatResponse } from 'src/custom_types/custom_types.Individual-chat';

const chatController = 'chat'
const conversationEndpoint = 'IndivConversation'
@Controller(chatController)
export class ChatController {

	constructor(private readonly chatService: ChatService) { }

	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Get(conversationEndpoint)
	async getConversation(@Query() data: ConversationDto, @Req() req: Request): Promise<IndividualChatResponse> {
		data.nbElements = (!data.nbElements) ? data.nbElements = undefined : Number(data.nbElements);
		data.nbPage = (!data.nbPage) ? data.nbPage = undefined : Number(data.nbPage);
		return await this.chatService.getConversation(data);
	}

}
