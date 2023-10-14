import { IsNotEmpty, IsOptional, Matches } from "class-validator";
import { Map, Mode, PlayerStatus } from "@prisma/client";


export class GameDto {
	@IsNotEmpty()
	rightUserId: string;
	@IsNotEmpty()
	leftUserId: string;
	@IsNotEmpty()
	rightScore: number;
	@IsNotEmpty()
	leftScore: number;
	@IsNotEmpty()
	map: Map;
	@IsNotEmpty()
	mode: Mode;
	@IsNotEmpty()
	isAccept: boolean;
}
export class StatusDto {
	@IsNotEmpty()
	id: string;

	@Matches(Object.values(PlayerStatus).filter(v => typeof v !== "number").join('|'))
	@IsNotEmpty()
	status: PlayerStatus;
}