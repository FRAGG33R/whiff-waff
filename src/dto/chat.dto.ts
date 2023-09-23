import { ApiProperty } from "@nestjs/swagger";
import { ChatRoomType } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsOptional, IsUppercase, Matches, ValidationOptions, isDateString } from "class-validator";
import * as values from 'src/shared/constants/constants.values'
export class ConversationDto {
	@ApiProperty({ required: false })
	@IsOptional()
	startDate: number;

	@ApiProperty({ required: false })
	@IsOptional()
	endDate: number;

	@ApiProperty()
	@IsOptional()
	nbElements: Number;

	@ApiProperty()
	@IsOptional()
	nbPage: Number;
}

export class RoomInfos {
	@ApiProperty()
	@IsNotEmpty()
	channelName: string;

	@ApiProperty()
	@IsUppercase()
	@Matches(`^${values.CHANNEL_TYPES}$`, 'i', { message: `type must be ${values.CHANNEL_TYPES}` })
	@IsOptional()
	channelType: ChatRoomType;

	@ApiProperty()
	@IsOptional()
	channelPassword: string;
}
export class Invitation {
	@ApiProperty()
	@IsNotEmpty()
	adminId: string;

	@ApiProperty()
	@IsNotEmpty()
	invitedId: ChatRoomType;

	@ApiProperty()
	@IsNotEmpty()
	channelId: string;
}

export class dtoWebSocketTset {
	@IsNotEmpty()
	receiverId: string;

	@IsNotEmpty()
	content: string;

	@IsNumber()
	currentDate: number;
}