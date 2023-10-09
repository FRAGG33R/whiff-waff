import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GameDto, GameHistoryDto, StatusDto } from 'src/dto';
import { SaveGameService } from './game.saveService';
import { PlayerStatus } from '@prisma/client';
import { LocalGuard } from 'src/auth/guards/guards.localGuard';

@Controller('game')
export class GameController {
	constructor(private readonly saveGameService: SaveGameService) { }

	@UseGuards(LocalGuard)
	@Post('save')
	async savegame(@Body() data: GameDto) {
		return await this.saveGameService.saveGame(data);
	}

	@UseGuards(LocalGuard)
	@Post('history')
	async setHistory(@Body() data: GameHistoryDto) {
		return await this.saveGameService.setHistory(data);
	}

	@UseGuards(LocalGuard)
	@Post('status')
	async setStatus(@Body('status') data: StatusDto) {
		return await this.saveGameService.setStatus(data.id, data.status);
	}
}
