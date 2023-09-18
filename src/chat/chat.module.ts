import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GuardsModule } from './guards/guards.module';
@Module({
	imports: [PrismaModule, GuardsModule],
	providers: [ChatGateway, ChatService],
	controllers: [ChatController],
})
export class ChatModule { }
