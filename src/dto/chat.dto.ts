import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

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