import { ConsoleLogger, ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrytpt from 'bcrypt';
import * as  messages from 'src/shared/constants/constants.messages';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SuccessResponse } from 'src/shared/responses/responses.sucess-response';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly userService: UsersService,
        private readonly jwt: JwtService,
        private readonly config: ConfigService) { }

    async singUp(dto: SignUpDto): Promise<SuccessResponse<string>> {
        const userInfos = await this.userService.createUser(dto);
        const jwt = await this.signToken(userInfos);
        return new SuccessResponse(HttpStatus.CREATED, messages.SUCESSFULL_MSG, jwt);
    }

    async signToken(user: User): Promise<string> {
        console.log('used secret : ', this.config.get('JWT_SECRET'));
        const jwt = await this.jwt.signAsync(user, { secret: this.config.get('JWT_SECRET') });
        return (jwt);
    }

    async validateUser(email: string, password: string): Promise<string> {
        const user = await this.userService.findOneUser(email);
        if (user) {
            const expectedPassword = await bcrytpt.compare(password, user.password)
            if (expectedPassword)
                return (delete user.password, delete user.email, this.signToken(user));
        }
        return (null);
    }
}
