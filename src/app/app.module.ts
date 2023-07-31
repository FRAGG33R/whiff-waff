import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AchievementModule } from 'src/achievements/achievements.module';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, AuthModule, ConfigModule.forRoot({isGlobal: true})],
})
export class AppModule { }
