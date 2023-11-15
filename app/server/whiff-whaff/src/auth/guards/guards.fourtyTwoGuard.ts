import { UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

export class FourtyTwoGuad extends AuthGuard('42') {
	handleRequest(err: unknown, user: unknown): any {
		if (err || !user) throw new UnauthorizedException();
		return user;
	}
 }