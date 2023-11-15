import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Achievement, Prisma, User, haveAchievement } from '@prisma/client'
import { DEFAULT_LEVEL_ACHIEVEMENT_USER } from "src/shared/constants/constants.values";

export interface AchievementData {
	name: string;
	description: string;
}
@Injectable()
export class AchievementService {

	constructor(private readonly prismaService: PrismaService) { }

	async createAchievement(achivements: AchievementData[]) {
		for (let i: number = 0; i < achivements.length; i++)
			await this.prismaService.achievement.create({
				data: {
					name: achivements[i].name,
					description: achivements[i].description
				}
			})
	}

	async findManyAchivement(): Promise<Achievement[]> {
		const achievements = await this.prismaService.achievement.findMany();
		return (achievements);
	}

	async addAchievementsToUser(user: User): Promise<haveAchievement[]> {
		const achievements = await this.findManyAchivement();
		let createdAchievements = [];
		for (let i = 0; i < achievements.length; i++) {
			const createdAchievement = await this.prismaService.haveAchievement.create({
				data: {
					userId: user.id,
					achievementId: achievements[i].id,
					level: DEFAULT_LEVEL_ACHIEVEMENT_USER
				}
			})
			createdAchievements.push(createdAchievement);
		}
		return (createdAchievements);
	}
}
