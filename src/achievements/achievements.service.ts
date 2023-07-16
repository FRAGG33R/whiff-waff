import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AchievementService implements OnModuleInit {

    constructor(private readonly prismaService: PrismaService) { }

    async onModuleInit() {
        console.log('time to paint the tape');
        await this.prismaService.achievement.create({
            data: {
                name: "WHIF-WHAF ROOKIE",
                description: "win the first match",
            }
        });
    }
}
