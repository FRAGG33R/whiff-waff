import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { GuardsModule } from 'src/chat/guards/guards.module';

@Module({
	imports: [GuardsModule],
	providers: [GameGateway, GameService],
	controllers: [GameController],
	exports: [GameService, GameGateway],
})
export class GameModule { }
