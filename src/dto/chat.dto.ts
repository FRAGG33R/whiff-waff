import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsOptional } from "class-validator";

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

export class dtoWebSocketTset {
	@IsNotEmpty()
	receiverId: string;

	@IsNotEmpty()
	content: string;

	@IsNotEmpty()
	@IsDateString()
	currentDate: string;
}