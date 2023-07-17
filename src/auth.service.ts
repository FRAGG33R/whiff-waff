import { Injectable } from "@nestjs/common";
import { UserService } from "./user.service";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username);
        if (user && password === user.passwordHash) {
            const { passwordHash, passwordSalt, ...rest } = user;
            return rest;
        }
        return null;
    }
}