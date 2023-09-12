import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsDateString, IsNotEmpty, IsOptional } from "class-validator";

export class ConversationDto {
	@ApiProperty()
	@IsNotEmpty()
	receiverId: string;

	@ApiProperty({ example: new Date().toISOString(), required: false })
	@IsOptional()
	startDate: string;

	@ApiProperty({ example: new Date().toISOString(), required: false })
	@IsOptional()
	endDate: string;

	@ApiProperty({ example: new Date().toISOString(), required: false })
	@IsOptional()
	nbElements: Number;
	@ApiProperty({ example: new Date().toISOString(), required: false })
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