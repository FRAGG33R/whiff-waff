import { Logger, LoggerService, Module, OnModuleInit } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AchievementData, AchievementService } from "./achievements.service";
import * as achievementsData from 'src/shared/constants/constants.achievements'
import { PrismaClientInitializationError, PrismaClientRustPanicError, PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import { PrismaModule } from "src/prisma/prisma.module";
import * as ErrorCode from '../shared/constants/constants.code-error';
@Module({
	imports: [PrismaModule],
	providers: [AchievementService],
	exports: [AchievementService]
})

export class AchievementModule implements OnModuleInit {
	private readonly logger = new Logger();
	constructor(private readonly achievementService: AchievementService) { }

	async onModuleInit() {
		try {
			const achievementdata: AchievementData[] = [
				achievementsData.ACHIEVEMENT_CATEGORY_1,
				achievementsData.ACHIEVEMENT_CATEGORY_2,
				achievementsData.ACHIEVEMENT_CATEGORY_3,
				achievementsData.ACHIEVEMENT_CATEGORY_4,];
			const existsAchievement = await this.achievementService.findManyAchivement();
			if (existsAchievement.length == 0) {
				await this.achievementService.createAchievement(achievementdata);
			}
		} catch (error) {
			if (error instanceof PrismaClientInitializationError) {
				if (error.errorCode === ErrorCode.CONNECTION_DB_ERROR_CODE) {
					this.logger.error(`${error.errorCode} : ${error.message}`);
				}
			}
		}
	}
}