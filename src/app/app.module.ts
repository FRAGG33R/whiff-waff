import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from 'src/users/users.module';
import { AchievementService } from 'src/achievements/achievements.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AchievementModule } from 'src/achievements/achievements.module';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [UsersModule, AchievementModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
