import { Body, Controller, Post, UseGuards, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/prisma.service';
import * as values from 'src/shared/constants/constants.values'
import * as path from 'src/shared/constants/constants.paths'
import { v4 as uuidv4 } from 'uuid';

const tagAuthenticationSwagger = 'authentication'
const AuthControllerEndPoint = 'auth'
const signupAuthEndPoint = 'signup'
const signinAuthEndPoint = 'signin'
const signin42AuthEndPoint = 'signin/42'
const verifiedAuthEndPoint = 'verified/:token'
@ApiTags(tagAuthenticationSwagger)
@Controller(AuthControllerEndPoint)
export class AuthController {
    constructor(private readonly authService: AuthService,
        private readonly local: LocalStrategy,
        private readonly prisma: PrismaService,
    ) { };

    @Post(signupAuthEndPoint)
    async signUp(@Body() dto: SignUpDto) {
        return (await this.authService.singUp(dto));
    }

    @UseGuards(AuthGuard('local'))
    @Post(signinAuthEndPoint)
    signIn(@Req() req: Request) {
        return (req.user);
    }

    @UseGuards(AuthGuard('42'))
    @Get(signin42AuthEndPoint)
    async signFortyTwoIn(@Req() req: { user: SignUpDto }, @Res() res: Response) {
        const generatedName = `${values.PREFIX_USERNAME}${uuidv4().slice(0, 8)}`;
        const dto: SignUpDto = {
            userName: generatedName, firstName: req.user.firstName, lastName: req.user.lastName,
            email: req.user.email, password: values.DEFAULT_PASSWORD_42_USER, avatar: req.user.avatar,
            twoFactorAuth: false, status: values.PlayerStatus.INACTIVE, verfiedEmail: false
        };
        const token = await this.authService.insertIntraUser(dto);
        res.cookie(values.NAME_KEY_KOOKIE_TOKEN, token);
        res.redirect(path.REDIRECTION_ENDPOINT);
    }

    @Get(verifiedAuthEndPoint)
    async verfyEmail(@Req() req: Request, @Res() res: Response) {
        const loginUrl = await this.authService.verfyEmail(req.params.token);
        res.redirect((loginUrl).toString());
    }
}
