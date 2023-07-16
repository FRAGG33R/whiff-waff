import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AchievementService } from "./achievements.service";
@Module({
    imports: [],
    providers: [AchievementService, PrismaService],
    exports: [AchievementService]
})

export class AchievementModule { }