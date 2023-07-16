import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from '@prisma/client'
@Injectable()
export class AchievementService implements OnModuleInit {

    constructor(private readonly prismaService: PrismaService) { }

    private async create() {
        const achievementdata: Prisma.AchievementCreateInput[] = [
            { name: "WHIF-WHAF ROOKIE", description: "win the first match" },
            { name: "WHIF-WHAF LEGEND", description: "win 100 natch" },
            { name: "COMPOLITIONIST", description: "collect all in-game achievements" },
            { name: "PERFECT GAME", description: "wins 4 matches without losing any points" }];

        for (let i: number = 0; i < achievementdata.length; i++)
            await this.prismaService.achievement.create({
                data: {
                    name: achievementdata[i].name,
                    description: achievementdata[i].description
                }
            })
    }

    async onModuleInit() {
        const existsData: Prisma.AchievementCreateInput[] = await this.prismaService.achievement.findMany();
        if (existsData.length == 0) {
            console.log("time to paint the tape")
            await this.create()
        }
    }

}
