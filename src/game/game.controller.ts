import { Body, Controller, Post } from '@nestjs/common';
import { GameDto, GameHistoryDto } from 'src/dto';
import { SaveGameService } from './game.saveService';

@Controller('game')
export class GameController {
	constructor(private readonly saveGameService: SaveGameService) { }
	@Post('save')
	async savegame(@Body() data: GameDto) {
		return await this.saveGameService.saveGame(data);
	}

	@Post('history')
	async setHistory(@Body() data: GameHistoryDto) {
		return await this.saveGameService.setHistory(data);
	}
}
