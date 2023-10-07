import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { GuardsModule } from 'src/chat/guards/guards.module';
import { Socket } from 'dgram';

@Module({
	imports: [GuardsModule],
	providers: [GameGateway],
	controllers: [GameController],
	exports: [GameGateway],
})
export class GameModule { }
