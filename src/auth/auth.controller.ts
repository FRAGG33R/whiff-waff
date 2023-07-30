import { Body, Controller, Post, UseGuards, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/prisma.service';
import * as values from 'src/shared/constants/constants.values'

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
        private readonly local: LocalStrategy,
        private readonly prisma: PrismaService,
    ) { };

    @Post('signup')
    async signUp(@Body() dto: SignUpDto) {
        return (await this.authService.singUp(dto));
    }

    @UseGuards(AuthGuard('local'))
    @Post('signin')
    signIn(@Req() req: Request) {
        return (req.user);
    }

    @UseGuards(AuthGuard('42'))
    @Get('signin/42')
    async signFortyTwoIn(@Req() req: { user: SignUpDto }, @Res() res: Response) {
        const dto: SignUpDto = {
            userName: req.user.userName, firstName: req.user.firstName, lastName: req.user.lastName,
            email: req.user.email, password: "", avatar: req.user.avatar,
            twoFactorAuth: false, status: values.PlayerStatus.INACTIVE, verfiedEmail: false
        };
        const token = await this.authService.insertIntraUser(dto);
        res.cookie('token', token, {maxAge: 90000, httpOnly: true});
        res.redirect('https://0a8a-197-230-30-146.ngrok-free.app/login');
    }
 
    @Get('verified/:token')
    async verfyEmail(@Req() req: Request, @Res() res: Response) {
        const loginUrl = 'https://0a8a-197-230-30-146.ngrok-free.app/login';
        // const loginUrl = 'http://localhost:3000/api/v1/auth/test'
        this.authService.verfyEmail(req.params.token);
        res.redirect(loginUrl);
    }

    @Get('/test')
    async test(@Req() req: Request) {
        console.log(req.cookies);
        return ('profile');
    }
}
