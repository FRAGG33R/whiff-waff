import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class SaveGameService {
	constructor(private readonly prismaSErvice: PrismaService) { }

	async saveGame(data: any) {
		try {
			const newgame = await this.prismaSErvice.play.create({
				data: {
					rightUserId: data.rightUserId,
					leftUserId: data.leftUserId,
					gameMode: data.gameMode,
					gameMap: data.gameMap,
				}
			})
			return newgame
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}


	async setHistory(data: any) {
		try {
			
		} catch (error) {
			
		}
	}
}