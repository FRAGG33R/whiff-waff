import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../app/strategies/local.strategy';
import { FourtyTwoStrategy } from '../app/strategies/fourtyTwo.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';

const host = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASSWORD;

@Module({
  imports: [PrismaModule, UsersModule, PassportModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, FourtyTwoStrategy],
})
export class AuthModule { }
