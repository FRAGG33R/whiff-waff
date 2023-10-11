import { ApiProperty, PartialType } from "@nestjs/swagger";
import { ChatRoomType, UserStatus } from "@prisma/client";
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

export class RoomUserInfos {
	@ApiProperty()
	@IsNotEmpty()
	roomId: string;

	@ApiProperty()
	@IsNotEmpty()
	userId: string;

	@ApiProperty()
	@Matches(`^${values.USER_STATUS}$`, 'i', { message: `type must be ${values.USER_STATUS}` })
	@IsNotEmpty()
	newStatus: UserStatus;
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

export class RoomUpdateInfos extends RoomInfos {
	@ApiProperty()
	@IsNotEmpty()
	channelId: string;
}
export class RoomDeleteInfos {
	@ApiProperty()
	@IsNotEmpty()
	channelId: string;
}
export class Invit {
	@ApiProperty()
	@IsNotEmpty()
	userName: string;

	@ApiProperty()
	@IsNotEmpty()
	channelId: string;
}
export class Kick {
	@ApiProperty()
	@IsNotEmpty()
	invitedId: string;

	@ApiProperty()
	@IsNotEmpty()
	channelId: string;
}

export class MuteDto {
	@ApiProperty()
	@IsNotEmpty()
	userId: string;

	@ApiProperty()
	@IsNotEmpty()
	roomId: string;

	@ApiProperty()
	@IsNotEmpty()
	mute: boolean;

	@ApiProperty()
	@IsNotEmpty()
	duration: number;
}

export class dtoIndividualChat {
	@IsNotEmpty()
	receiverId: string;

	@IsNotEmpty()
	content: string;

	@IsNumber()
	currentDate: bigint;
}

export class dtoRoomChat {
	@IsNotEmpty()
	roomId: string;

	@IsNotEmpty()
	content: string;

	@IsNumber()
	currentDate: bigint;
}