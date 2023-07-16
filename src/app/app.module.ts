import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from 'src/users/users.module';
import { AchievementService } from 'src/achievements/achievements.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AchievementModule } from 'src/achievements/achievements.module';

@Module({
  imports: [UsersModule, AchievementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
