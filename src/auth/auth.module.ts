import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { FourtyTwoStrategy } from './strategies/fourtyTwo.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailerModule } from '@nestjs-modules/mailer';


const defaultHost = 'smtp.gmail.com';
const defaultUser = 'whiffwhaff4@gmail.com';
const defaultPassword = 'qseobdkqfgmnxkxs';
// const defaultPassword = 'K#$%(FD12#$#TimeToPaintTheTapeComonShhutAAAA~+_)(*';


const host = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASSWORD;//TODO check this

@Module({
  imports: [PrismaModule, UsersModule, PassportModule, JwtModule, MailerModule.forRoot({
    transport: {
      host: defaultHost,
      auth: {
        user: defaultUser,
        pass: defaultPassword
      }
    }
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, FourtyTwoStrategy],
})
export class AuthModule { }
