import { Body, Controller, Post, UseGuards, Get, Req, Res, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from 'src/dto';
import { LocalStrategy } from './strategies/local.strategy';
import { Request, Response } from 'express';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/prisma.service';
import * as values from 'src/shared/constants/constants.values'
import { v4 as uuidv4 } from 'uuid';
import { LocalGuard } from './guards/guards.localGuard';
import { FourtyTwoGuad } from './guards/guards.fourtyTwoGuard';

const tagAuthenticationSwagger = 'authentication'
const AuthControllerEndPoint = 'auth'
const signupAuthEndPoint = 'signup'
const signinAuthEndPoint = 'signin'
const signin42AuthEndPoint = 'signin/42'
const verifiedAuthEndPoint = 'verified/:token'

const authController = 'authController';
const fourtyTwoCode = 'code'
const token = 'token'

const fourtyTwoCodeDescription = 'The authorization code received from the provider';
const tokenDescription = 'The verification token received via email'
@ApiTags(tagAuthenticationSwagger)
@Controller(AuthControllerEndPoint)
export class AuthController {
	logger = new Logger(authController);
	constructor(private readonly authService: AuthService,
		private readonly local: LocalStrategy,
		private readonly prisma: PrismaService,
	) { };

	@Post(signupAuthEndPoint)
	async signUp(@Body() dto: SignUpDto) {
		return (await this.authService.singUp(dto));
	}

	@UseGuards(LocalGuard)
	@Post(signinAuthEndPoint)
	signIn(@Body() dto: SignInDto, @Req() req: Request) {
		return (req.user);
	}

	@ApiQuery({
		name: fourtyTwoCode,
		description: fourtyTwoCodeDescription,
	})
	@UseGuards(FourtyTwoGuad)
	@Get(signin42AuthEndPoint)
	@HttpCode(HttpStatus.CREATED)
	async signFortyTwoIn(@Req() req: { user: SignUpDto }, @Res() res: Response) {
		try {
			const generatedName = `${values.PREFIX_USERNAME}${uuidv4().slice(0, 8)}`;
			const dto: SignUpDto = {
				userName: generatedName, firstName: req.user.firstName, lastName: req.user.lastName,
				email: req.user.email, password: values.DEFAULT_PASSWORD_42_USER, avatar: req.user.avatar,
				twoFactorAuth: false, status: values.PlayerStatus.INACTIVE, verfiedEmail: false
			};
			const token = await this.authService.insertIntraUser(dto);
			res.send({ token: token });
		} catch (error) {
			this.logger.error(error.message)
		}
	}

	@ApiParam({
		name: token,
		description: tokenDescription,
	})
	@Get(verifiedAuthEndPoint)
	async verfyEmail(@Req() req: Request, @Res() res: Response) {//TODO html injection
		const loginUrl = await this.authService.verfyEmail(req.params.token);//TODO reject email
		res.redirect((loginUrl).toString());
	}
}