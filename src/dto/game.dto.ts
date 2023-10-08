import { IsNotEmpty, Matches } from "class-validator";
import { Map } from "@prisma/client";

export class GameDto {

	@IsNotEmpty()
	rightUserId: string;

	@IsNotEmpty()
	leftUserId: string;

	@IsNotEmpty()
	@Matches(Object.values(Map).filter(v => typeof v !== "number").join('|'))
	gameMode: string;

	@IsNotEmpty()
	gameMap: string;
	
}

export class GameHistoryDto {
	@IsNotEmpty()
	leftUserId: string;
	@IsNotEmpty()
    rightUserId: string;
	@IsNotEmpty()
    scoreLeft:   number;
	@IsNotEmpty()
    scoreRight:  number;
	@IsNotEmpty()
    accepted:    Boolean;
}