import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { AchievementService } from "src/achievements/achievements.service";
import { JwtStrategy } from "src/app/strategies/jwt.strategy";
import { PrismaModule } from "src/prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { AchievementModule } from "src/achievements/achievements.module";
@Module({
    imports: [PrismaModule, AchievementModule],
    controllers: [UsersController],
    providers: [UsersService, JwtStrategy],
    exports: [UsersService]
})
export class UsersModule { }