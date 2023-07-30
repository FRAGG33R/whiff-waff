import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SignUpDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { SUBJECT } from 'src/shared/constants/constants.emailValidation';
import { TOKEN_EXPIRATION_TIME } from 'src/shared/constants/constants.emailValidation';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SuccessResponse } from 'src/shared/responses/responses.sucess-response';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import emailVlidationContent from '../shared/constants/constants.emailValidation'
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import * as bcrytpt from 'bcrypt';
import * as  messages from 'src/shared/constants/constants.messages';
import * as  values from 'src/shared/constants/constants.values';
import * as os from 'os';
import * as env from 'src/shared/constants/constants.name-variables'
@Injectable()
export class AuthService {
    constructor(
        @Inject(REQUEST) private request,
        private readonly prismaService: PrismaService,
        private readonly userService: UsersService,
        private readonly jwt: JwtService,
        private readonly mailerService: MailerService,
        private readonly config: ConfigService) { }

    async singUp(dto: SignUpDto): Promise<SuccessResponse> {
        dto.status = values.PlayerStatus.INACTIVE;
        dto.twoFactorAuth = false;
        dto.verfiedEmail = false;
        dto.avatar = "default";//TODO add image to database
        const salt: string = await bcrytpt.genSalt(values.SALT_ROUNDS);
        dto.password = await bcrytpt.hash(dto.password, salt);
        const userInfos = await this.userService.createUser(dto);
        const email_jwt = await this.signToken(userInfos, this.config.get(env.JWT_EMAIL_SECRET), TOKEN_EXPIRATION_TIME);
        const fullName = `${dto.firstName} ${dto.lastName}`;
        await this.sendEmail(dto.email, SUBJECT, email_jwt, fullName);
        return new SuccessResponse(HttpStatus.CREATED, messages.SUCESSFULL_MSG);
    }

    async signToken(user: User, secretKey: string, expire: string): Promise<string> {
        const jwt = await this.jwt.signAsync(user, { secret: secretKey, expiresIn:  '1d'});
        return (jwt);
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findOneUser(email);
        if (user) {
            const expectedPassword = await bcrytpt.compare(password, user.password)
            if (expectedPassword) {
                const token = await this.signToken(user, this.config.get(env.JWT_SECRET), values.JWT_EXPIRATION_TIME);
                const { firstName, lastName } = await this.prismaService.user.findUnique({
                    where: {
                        email: email
                    }
                });
                const fullName = `${firstName} ${lastName}`;
                if (user.verfiedEmail == false) {
                    await this.sendEmail(user.email, SUBJECT, token, fullName);
                    return (null);
                }
                return { token: token };
            }
        }
        return (null);
    }

    async sendEmail(receiver: string, subject: string, token: any, fullName: string) {
        const hostname = os.hostname();
        const confirmationLink: string = `http://${hostname}:3000/api/v1/auth/verified/${token}`;//TODO hardcode this
        const fileContent: string = await emailVlidationContent(confirmationLink, fullName);
        await this.mailerService.sendMail({
            to: receiver,
            subject: subject,
            html: fileContent
        });
    }

    async verfyEmail(token: string) {
        try {
            const value = await this.jwt.verify(token, { secret: this.config.get(env.JWT_EMAIL_SECRET) });
            if (value) {
                await this.prismaService.user.update({
                    where: {
                        id: value.id
                    },
                    data: {
                        verfiedEmail: true
                    }
                });
            }
            console.log(value);//TODO throw the error if the value not valide
        } catch (error) {
            console.log(error.code, ' ', error.message);//TODO check errors
        }
    }

    async insertIntraUser(dto: SignUpDto) {
        try {
            let existsUser = await this.prismaService.user.findUnique({
                where: {
                    email: dto.email
                }
            })
            if (!existsUser) {
                existsUser = await this.userService.createUser(dto);
            }
            const token = await this.signToken(existsUser, this.config.get(env.JWT_SECRET), values.JWT_EXPIRATION_TIME);
            return (token);
        } catch (error) {
            console.log('error on insertIntraUser method');
        }
    }
}