import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { GuardsModule } from 'src/chat/guards/guards.module';
import { Socket } from 'dgram';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SaveGameService } from './game.saveService';

@Module({
	imports: [GuardsModule, PrismaModule],
	providers: [GameGateway, SaveGameService],
	controllers: [GameController],
	exports: [GameGateway, SaveGameService],
})
export class GameModule { }
