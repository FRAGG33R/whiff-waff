import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { AuthModule } from './auth.module';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [UserController],
})
export class AppModule {}
