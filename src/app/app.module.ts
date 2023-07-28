import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from 'src/users/users.module';
import { AchievementModule } from 'src/achievements/achievements.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [UsersModule, AchievementModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
