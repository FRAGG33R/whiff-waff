import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { AchievementService } from "src/achievements/achievements.service";
import { JwtStrategy } from "src/auth/strategies/jwt.strategy";
import { PrismaModule } from "src/prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { AchievementModule } from "src/achievements/achievements.module";
import { BucketModule } from "src/bucket/bucket.module";
@Module({
    imports: [PrismaModule, AchievementModule, BucketModule],
    controllers: [UsersController],
    providers: [UsersService, JwtStrategy],
    exports: [UsersService]
})
export class UsersModule { }