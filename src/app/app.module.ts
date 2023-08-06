import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

// const defaultHost = 'smtp.gmail.com';
// const defaultUser = 'whiffwhaff4@gmail.com';
// const defaultPassword = 'qseobdkqfgmnxkxs';

@Module({
  imports: [UsersModule, AuthModule, ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
  }), MailerModule.forRoot({
    transport: {
      host: process.env.DEFAULT_MAIL_HOST,
      auth: {
        user: process.env.DEFAULT_MAIL_USER,
        pass: process.env.DEFAULT_MAIL_PASSWORD
      }
    }
  })],
})

export class AppModule { }
