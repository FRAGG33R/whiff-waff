import { ApiProperty } from "@nestjs/swagger";
import { ChatRoomType } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsDate, IsDateString, IsISO8601, IsNotEmpty, IsNumber, IsOptional, Matches, ValidationOptions, isDateString } from "class-validator";
import * as values from 'src/shared/constants/constants.values'
import { isDate } from "util/types";
export class ConversationDto {
	@ApiProperty({ example: new Date().toISOString(), required: false })
	@IsOptional()
	startDate: string;

	@ApiProperty({ example: new Date().toISOString(), required: false })
	@IsOptional()
	endDate: string;

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
	@Matches(`^${values.CHANNEL_TYPES}$`, 'i', { message: `type must be ${values.CHANNEL_TYPES}` })
	@IsOptional()
	channelType: ChatRoomType;

	@ApiProperty()
	@IsOptional()
	channelPassword: string;
}

export class dtoWebSocketTset {
	@IsNotEmpty()
	receiverId: string;

	@IsNotEmpty()
	content: string;

	@IsNumber()
	currentDate: number;
}