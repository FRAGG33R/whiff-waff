import { IsNotEmpty, IsOptional, Matches } from "class-validator";
import { Map, Mode, PlayerStatus } from "@prisma/client";

export class GameDto {

	@IsNotEmpty()
	rightUserId: string;

	@IsNotEmpty()
	leftUserId: string;

	@IsNotEmpty()
	@Matches(Object.values(Map).filter(v => typeof v !== "number").join('|'))
	gameMode: Mode;

	@IsNotEmpty()
	gameMap: Map;

}

export class GameHistoryDto {

	@IsOptional()
	game: GameDto
	@IsNotEmpty()
	leftUserId: string;
	@IsNotEmpty()
    rightUserId: string;
	@IsNotEmpty()
    scoreLeft:   number;
	@IsNotEmpty()
    scoreRight:  number;
	@IsNotEmpty()
    accepted:    boolean;
}

export class StatusDto {
	@IsNotEmpty()
	id: string;

	@Matches(Object.values(PlayerStatus).filter(v => typeof v !== "number").join('|'))
	@IsNotEmpty()
	status: PlayerStatus;
}