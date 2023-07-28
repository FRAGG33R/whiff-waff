import { Body, Controller, Post, UseGuards, Get, Req, Res, Redirect, HttpCode, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { Request, Response } from 'express';
import { ApiHeader, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { APP_FILTER } from '@nestjs/core';
import { PrismaService } from 'src/prisma/prisma.service';


@ApiTags('authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly local: LocalStrategy, private prisma: PrismaService) { };

    @Post('signup')
    async signUp(@Body() dto: SignUpDto) {
        console.log(dto);
        return (await this.authService.singUp(dto));
    }

    @UseGuards(AuthGuard('local'))
    @Post('signin')
    signIn(@Req() req: Request) {
        return (req.user);
    }

    @UseGuards(AuthGuard('42'))
    @Get('signin/42')
    signFortyTwoIn(@Req() req: Request, @Res() res: Response) {
        console.log(req.user);
        return res.redirect('');
        // res.redirect('google.com');
        // return (res.status(200).json({ message: 'singe÷
    }

}
