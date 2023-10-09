import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PlayerStatus } from "@prisma/client";
import { GameDto, GameHistoryDto } from "src/dto";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class SaveGameService {
	constructor(private readonly prismaSErvice: PrismaService) { }

	async saveGame(data: GameDto) {
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

	async setHistory(data: GameHistoryDto) {
		try {
			let existsdata: any;
			if (data.game)
				existsdata = await this.prismaSErvice.gameHistory.findFirst({});
			if (!existsdata) {
				let sorted = [data.game.leftUserId, data.game.rightUserId].sort();
				const newGame: GameDto = { rightUserId: sorted[0], leftUserId: sorted[1], gameMode: data.game.gameMode, gameMap: data.game.gameMap }
				await this.saveGame(newGame);
			};
			let sorted = [data.leftUserId, data.rightUserId].sort();
			if (sorted[0] !== data.leftUserId) {
				let score = data.scoreLeft;
				data.scoreLeft = data.scoreRight;
				data.scoreRight = score;
			}
			return await this.prismaSErvice.gameHistory.create({
				data: {
					leftUserId: sorted[0],
					rightUserId: sorted[1],
					scoreLeft: data.scoreLeft,
					scoreRight: data.scoreRight,
					accepted: data.accepted
				}
			});
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}

	async setStatus(id: string, status: PlayerStatus) {
		try {
			return await this.prismaSErvice.user.update({
				where: {
					id: id
				},
				data: {
					status: status
				}
			})
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}
}