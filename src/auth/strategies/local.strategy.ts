import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private readonly authService: AuthService) {
        super({ usernameField: 'email' });
    }

    async validate(email: string, password: string): Promise<string> {
        const user = await this.authService.validateUser(email, password);
        if (!user) {
            throw new ForbiddenException('Incorrect email or password')
        }
        if (user)
            return (user);
    }
}
