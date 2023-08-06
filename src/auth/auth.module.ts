import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { FourtyTwoStrategy } from './strategies/fourtyTwo.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, UsersModule, PassportModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, FourtyTwoStrategy],
})
export class AuthModule { }
