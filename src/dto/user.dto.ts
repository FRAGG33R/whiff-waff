import { PartialType } from "@nestjs/swagger";
import { SignUpDto } from "./auth.dto";
import { IsNotEmpty, Matches } from "class-validator";

export class UpdateUserDto extends PartialType(SignUpDto) { }

enum Status {
	ACCEPTED,
	REFUSED,
	BLOCKED,
}

export class UpdateFriendshipDto {
	@IsNotEmpty()
	id: string;

	@IsNotEmpty()
	@Matches(`^${Object.values(Status).filter(v => typeof v !== "number").join('|')}$`, 'i', { message: 'status must be ACCEPTED, REFUSED or BLOCKED' })//TODO change array to just message in response
	status: Status;
}