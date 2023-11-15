import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-42";
import * as path from 'src/shared/constants/constants.paths'

type Profile = {
	userName: string,
	firstName: string,
	lastName: string,
	email: string,
	avatar: string
}

const fourtyTwoStrategy = 'FourtyTwoStrategy'
@Injectable()
export class FourtyTwoStrategy extends PassportStrategy(Strategy, '42') {
	logger = new Logger(fourtyTwoStrategy);
    constructor(private readonly config: ConfigService) {
        super({
            clientID: config.get('API42_CLIENT_ID'),
            clientSecret: config.get('API42_CLIENT_SECRET'),
            callbackURL: path.API42_CALLBACKURL
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any): Promise<Profile> {
        try {
            const user: Profile = {
                userName: profile._json.login,
                firstName: profile._json.first_name,
                lastName: profile._json.last_name,
                email: profile._json.email,
                avatar: profile._json.image.link,
            }
            return (user);
        } catch (error) {
            this.logger.error(error.message);
        }
    }
}
