import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

const defaultHost = 'smtp.gmail.com';
const defaultUser = 'whiffwhaff4@gmail.com';
const defaultPassword = 'qseobdkqfgmnxkxs';
// const defaultPassword = 'K#$%(FD12#$#TimeToPaintTheTapeComonShhutAAAA~+_)(*';
@Module({
  imports: [UsersModule, AuthModule, ConfigModule.forRoot({isGlobal: true,
    cache: true,
  }), MailerModule.forRoot({
    transport: {
      host: defaultHost,
      auth: {
        user: defaultUser,
        pass: defaultPassword
      }
    }
  })],
})

export class AppModule { }
