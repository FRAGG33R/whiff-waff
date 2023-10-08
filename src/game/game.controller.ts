import { Body, Controller, Post } from '@nestjs/common';
import { GameDto } from 'src/dto';

@Controller('game')
export class GameController {
	
	@Post('save')
	async savegame(@Body() data: GameDto ) {
		console.log('tayji yahya');
	}

	@Post('history')
	async setHistory(@Body() data: any ) {
		console.log('tayji yahya');
	}
}
