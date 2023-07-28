import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { AchievementService } from "src/achievements/achievements.service";
import { JwtStrategy } from "src/auth/strategies/jwt.strategy";
import { PrismaModule } from "src/prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
@Module({
    imports: [PrismaModule,ConfigModule],
    controllers: [UsersController],
    providers: [UsersService, AchievementService, JwtStrategy],
    exports: [UsersService]
})
export class UsersModule { }