import { Body, Controller, Post, UseGuards, Get, Req, Res, HttpCode, HttpStatus, Logger, Patch, UseInterceptors, BadRequestException, UploadedFile } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto, TwoAuthDto, UpdateUserDto } from 'src/dto';
import { LocalStrategy } from './strategies/local.strategy';
import { Request, Response } from 'express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/prisma.service';
import * as values from 'src/shared/constants/constants.values'
import * as  messages from 'src/shared/constants/constants.messages';
import { v4 as uuidv4 } from 'uuid';
import { LocalGuard } from './guards/guards.localGuard';
import { FourtyTwoGuad } from './guards/guards.fourtyTwoGuard';
import { JwtGuard } from './guards/guards.jwtGuard';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';

const tagAuthenticationSwagger = 'authentication'
const AuthControllerEndPoint = 'auth'
const signupAuthEndPoint = 'signup'
const signinAuthEndPoint = 'signin'
const signin42AuthEndPoint = 'signin/42'
const verifiedAuthEndPoint = 'verified/:token'
const generateTwoFactorAuth = 'generate-2fa/:userName'
const verifyTwoFactorAuth = 'verify-2fa'
const validTwoFactorAuth = 'valid-2fa'
const enableTwoFactorAuth = 'enable-2fa'
const disableTwoFactorAuth = 'disable-2fa'
const authController = 'authController';
const fourtyTwoCode = 'code'
const token = 'token'
const dataType = 'multipart/form-data'
const fourtyTwoCodeDescription = 'The authorization code received from the provider';
const tokenDescription = 'The verification token received via email'
const settings = 'settings'
const fileName = 'avatar'
@ApiTags(tagAuthenticationSwagger)
@Controller(AuthControllerEndPoint)
export class AuthController {
	logger = new Logger(authController);
	constructor(private readonly authService: AuthService,
		private readonly userService: UsersService,
		private readonly local: LocalStrategy,
		private readonly prisma: PrismaService,
	) { };

	@Post(signupAuthEndPoint)
	async signUp(@Body() dto: SignUpDto) {
		return (await this.authService.singUp(dto));
	}

	@UseGuards(LocalGuard)
	@Post(signinAuthEndPoint)
	signIn(@Body() dto: SignInDto, @Req() req: Request, @Res() res: Response) {
		res.send(req.user);
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

	@ApiBearerAuth()
	@ApiConsumes(dataType)
	@ApiBody({
		type: UpdateUserDto,
	})
	@UseGuards(JwtGuard)
	@Patch(settings)
	@UseInterceptors(FileInterceptor(fileName, {
		fileFilter: (req, file, cb) => {
			if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
				cb(null, true);
			} else {
				cb(new BadRequestException(messages.FILE_TYPE), false);
			}
		}
	}))
	async updateUserdata(@Body() dto: UpdateUserDto, @Req() req: Request, @UploadedFile() avatar: Express.Multer.File) {
		const newUser = await this.userService.upDateUserdata((req.user as any).id, dto, avatar);
		const token = await this.authService.insertIntraUser(newUser);
		return {newUser: newUser, token: token};
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

	@ApiBearerAuth()
	@Get(generateTwoFactorAuth)
	async TwoAuthGen(@Req() req: Request) {
		return (this.authService.TwoAuthGen(req.params.userName));
	}
	
	@ApiBearerAuth()
	@ApiBearerAuth()
	@Post(verifyTwoFactorAuth)
	async TwoAuthVer(@Body() dto: TwoAuthDto){
		return (this.authService.TwoAuthVer(dto));
	}
	
	@ApiBearerAuth()
	@Post(validTwoFactorAuth)
	async TwoAuthValid(@Body() dto: TwoAuthDto){
		return (this.authService.TwoAuthValid(dto));
	}
	
	
	@ApiBearerAuth()
	@Post(disableTwoFactorAuth)
	async TwoAuthDisable(@Body() dto: TwoAuthDto){
		return (this.authService.TwoAuthDisable(dto));
	}
	
	@ApiBearerAuth()
	@Post(enableTwoFactorAuth)
	async TwoAuthEnable(@Body() dto: TwoAuthDto){
		return (this.authService.TwoAuthEnable(dto));
	}
}