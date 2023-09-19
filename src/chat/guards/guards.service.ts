import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import * as env from 'src/shared/constants/constants.name-variables'
import * as jwt from 'jsonwebtoken';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class GuardsService implements CanActivate {
	constructor(private readonly configService: ConfigService, private readonly prismaService: PrismaService) { }

	static validateToken(token: any, secret: string): string | jwt.JwtPayload {
		const [type, tokenValue] = token.split(' ') ?? [];
		if (!tokenValue || type !== 'Bearer')
			return null;
		try {
			const payload = jwt.verify(tokenValue, secret);
			return payload;
		} catch (error) {
			return null;
		}
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToWs().getClient();
		const [type, token] = request.handshake.headers?.authorization.split(' ') ?? [];
		if (!token || type !== 'Bearer')
			return false;
		try {
			const payload = jwt.verify(token, this.configService.get('JWT_SECRET'));
			const valid =  await this.validate(payload);
			request['user'] = payload;
			return (valid);
		} catch (error) {
			throw new WsException('Unauthorized');
		}
	}

	async validate(payload: any): Promise<boolean> {
		const user = await this.prismaService.user.findUnique({ where: { id: payload.id } });
		if (user)
			return true;
		return false;
	}
}
