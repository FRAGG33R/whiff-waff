import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { GuardsModule } from 'src/chat/guards/guards.module';
import { Socket } from 'dgram';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SaveGameService } from './game.saveService';
import { GameGatewayStatus } from './game.gatewayStatus';
import { EventService } from './game.emitter';

@Module({
	imports: [GuardsModule, PrismaModule],
	providers: [GameGateway, SaveGameService, GameGatewayStatus, EventService],
	controllers: [GameController],
	exports: [GameGateway, SaveGameService],
})
export class GameModule { }
