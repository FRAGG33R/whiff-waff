import { ApiProperty, PartialType } from "@nestjs/swagger";
import { SignUpDto } from "./auth.dto";
import { IsNotEmpty, IsOptional, IsUppercase, Matches } from "class-validator";
import { FriendshipStatus } from "@prisma/client";

export class UpdateUserDto extends PartialType(SignUpDto) { }

export class UpdateFriendshipDto {

	@ApiProperty({ example: '3ab94ff0-3450-45d8-afdc' })
	@IsNotEmpty()
	id: string;

	@ApiProperty({ example: 'ACCEPTED' })
	@IsNotEmpty()
	@IsUppercase()
	@Matches(`^${Object.values(FriendshipStatus).filter(v => typeof v !== "number").join('|')}$`, 'i', { message: 'status must be ACCEPTED, REFUSED or BLOCKED' })
	status: FriendshipStatus;
}

export class SendFriendshipDto {
	@ApiProperty({ example: '3ab94ff0-3450-45d8-afdc' })
	@IsNotEmpty()
	id: string;
}
export class UserSearchDto {
	@ApiProperty({ example: 'JohnDoe' })
	@IsOptional()
	userName: string;
}
