import { ConfigService } from '@nestjs/config';
import { OnGatewayConnection, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { GuardsService } from 'src/chat/guards/guards.service';



@WebSocketGateway(6080, {
	cors: {
		origin: "*"
	}
})
export class GameGateway implements OnGatewayConnection {

	constructor(private readonly configService: ConfigService, private readonly guardService: GuardsService) { }

	async handleConnection(client: any) {
		const validUser = (client.handshake.headers.authorization) ?
			GuardsService.validateToken(client.handshake.headers?.authorization, this.configService.get('JWT_SECRET')) : false;
		const existsUser = (validUser) ? await this.guardService.validate(validUser) : false;
		if (!existsUser) {
			client.emit('exception', 'User not allowed to connect');
			client.disconnect();
		}
		client.emit('status', { status: 'online' });
	}

	
}
