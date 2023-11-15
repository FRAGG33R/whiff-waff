import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PlayerStatus, Rank } from "@prisma/client";
import { GameDto } from "src/dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as achivements from "src/shared/constants/constants.achievements";


@Injectable()
export class SaveGameService {
	constructor(private readonly prismaService: PrismaService) { }

	async saveGame(data: GameDto) {
		try {
			const existsGAme = await this.prismaService.play.findUnique({
				where: {
					leftUserId_rightUserId: {
						rightUserId: data.rightUserId,
						leftUserId: data.leftUserId,
					}
				}
			})
			if (!existsGAme) {
				const NewGame = await this.prismaService.play.create({
					data: {
						rightUserId: data.rightUserId,
						leftUserId: data.leftUserId,
					}
				})
			}
			const alreadyPlayed = await this.getHistoryPlayerById(data.rightUserId);
			if (alreadyPlayed.length === 0) {
				await this.setRookieAchievement(data.rightUserId);
			}
			const legend = await this.setLegendAchievement(data.rightUserId);
			const perfect = await this.setPerfectAchievement(data.rightUserId, true);
			const compilitions = await this.setCompilitionistAchievement(data.rightUserId);
			const loser = await this.setPerfectAchievement(data.leftUserId, false);
			const history = await this.prismaService.gameHistory.create({
				data: {
					rightUserId: data.rightUserId,
					leftUserId: data.leftUserId,
					scoreRight: data.rightScore,
					scoreLeft: data.leftScore,
					gameMode: data.mode,
					gameMap: data.map,
					accepted: data.isAccept,
				}
			});
			const updateWinnerStat = await this.prismaService.stats.update({
				where: {
					userId: data.rightUserId,
				},
				data: {
					wins: {
						increment: 1,
					},
					level: {
						increment: 0.1,
					},
				}
			});
			if (updateWinnerStat.level >= 8) {
				await this.prismaService.stats.update({
					where: {
						userId: data.rightUserId,
					},
					data: {
						rank: Rank.GRANDMASTER
					}
				})
			}
			else if (updateWinnerStat.level >= 6) {
				await this.prismaService.stats.update({
					where: {
						userId: data.rightUserId,
					},
					data: {
						rank: Rank.LEGEND
					}
				})
			}
			else if (updateWinnerStat.level >= 4) {
				await this.prismaService.stats.update({
					where: {
						userId: data.rightUserId,
					},
					data: {
						rank: Rank.EXPERT
					}
				})
			}
			else if (updateWinnerStat.level >= 2) {
				await this.prismaService.stats.update({
					where: {
						userId: data.rightUserId,
					},
					data: {
						rank: Rank.CHALLENGER
					}
				})
			}
			else {
				await this.prismaService.stats.update({
					where: {
						userId: data.rightUserId,
					},
					data: {
						rank: Rank.ROOKIE
					}
				})
			}
			const updateLoserStat = await this.prismaService.stats.update({
				where: {
					userId: data.leftUserId,
				},
				data: {
					loses: {
						increment: 1,
					}
				}
			});
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}

	async setRookieAchievement(id: string) {
		const RookieAchievement = await this.prismaService.achievement.findUnique({
			where: {
				name: achivements.ACHIEVEMENT_CATEGORY_1.name,
			}
		})
		return await this.prismaService.haveAchievement.update({
			where: {
				achievementId_userId: {
					achievementId: RookieAchievement.id,
					userId: id,
				}
			},
			data: {
				level: 100,
			}
		});
	}

	async setLegendAchievement(id: string) {
		const LegendAchievement = await this.prismaService.achievement.findUnique({
			where: {
				name: achivements.ACHIEVEMENT_CATEGORY_2.name,
			}
		})
		const achievement = await this.prismaService.haveAchievement.findUnique({
			where: {
				achievementId_userId: {
					achievementId: LegendAchievement.id,
					userId: id,
				}
			}
		});
		if (achievement.level < 100) {
			return await this.prismaService.haveAchievement.update({
				where: {
					achievementId_userId: {
						achievementId: LegendAchievement.id,
						userId: id,
					}
				},
				data: {
					level: achievement.level + 1,
				}
			})
		}
		return achievement;
	}

	async setPerfectAchievement(id: string, isWin: boolean) {
		const perfectgame = await this.prismaService.achievement.findUnique({
			where: {
				name: achivements.ACHIEVEMENT_CATEGORY_4.name,
			}
		});
		const achievement = await this.prismaService.haveAchievement.findUnique({
			where: {
				achievementId_userId: {
					achievementId: perfectgame.id,
					userId: id,
				}
			}
		});
		let level = achievement.level;
		if (isWin)
			level += 25;
		else
			level = 0;
		if (achievement.level < 100) {
			return await this.prismaService.haveAchievement.update({
				where: {
					achievementId_userId: {
						achievementId: perfectgame.id,
						userId: id,
					}
				},
				data: {
					level: level,
				}
			})
		}
		return achievement;
	}

	async setCompilitionistAchievement(id: string) {
		const CompilitionistAchievement = await this.prismaService.achievement.findUnique({
			where: {
				name: achivements.ACHIEVEMENT_CATEGORY_3.name,
			}
		})
		const allAchievements = await this.prismaService.achievement.findMany();
		const userAchievements = await this.prismaService.haveAchievement.findMany({
			where: {
				userId: id,
			}
		})
		let isCompilitionist = true;
		userAchievements.forEach(async (achievement) => {
			let name = allAchievements.find((a) => a.id == achievement.achievementId).name;
			if (name === achivements.ACHIEVEMENT_CATEGORY_1.name && achievement.level < 1) {
				isCompilitionist = false;
			}
			else if (name === achivements.ACHIEVEMENT_CATEGORY_2.name && achievement.level < 100) {
				isCompilitionist = false;
			}
			else if (name === achivements.ACHIEVEMENT_CATEGORY_4.name && achievement.level < 4) {
				isCompilitionist = false;
			}
		});
		if (isCompilitionist) {
			return await this.prismaService.haveAchievement.update({
				where: {
					achievementId_userId: {
						achievementId: CompilitionistAchievement.id,
						userId: id,
					}
				},
				data: {
					level: 1,
				}
			})
		}
		return null;
	}

	async getHistoryPlayerById(id: string) {
		return await this.prismaService.gameHistory.findMany({
			where: {
				OR: [
					{
						leftUserId: id
					},
					{
						rightUserId: id
					}
				]
			}
		});
	}

	async setStatus(id: string, status: PlayerStatus) {
		try {
			return await this.prismaService.user.update({
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