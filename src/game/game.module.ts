import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';
import { GameController } from './game.controller';

@Module({
  providers: [GameGateway, GameService],
  controllers: [GameController]
})
export class GameModule {}
