import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { ChatModule } from 'src/chat/chat.module';
import { GuardsModule } from 'src/chat/guards/guards.module';
import { GameModule } from 'src/game/game.module';
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
	}), ChatModule, GuardsModule, GameModule],
})

export class AppModule { }
