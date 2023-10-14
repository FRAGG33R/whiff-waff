import { ForbiddenException, HttpStatus, HttpException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { SignUpDto, TwoAuthDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ResponseInfo } from 'src/shared/responses/responses.sucess-response';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import emailVlidationContent from '../shared/constants/constants.emailValidation'
import * as bcrytpt from 'bcrypt';
import * as  messages from 'src/shared/constants/constants.messages';
import * as  values from 'src/shared/constants/constants.values';
import * as os from 'os';
import * as env from 'src/shared/constants/constants.name-variables'
import * as path from 'src/shared/constants/constants.paths'
import * as OTPAuth from "otpauth";
import * as speakeasy from "speakeasy";
import * as qrCode from 'qrcode';
import * as fs from 'fs';

const authService = 'AuthService';
@Injectable()
export class AuthService {
	logger = new Logger(authService);
	constructor(
		private readonly prismaService: PrismaService,
		private readonly userService: UsersService,
		private readonly jwt: JwtService,
		private readonly mailerService: MailerService,
		private readonly config: ConfigService) { }

	async singUp(dto: SignUpDto): Promise<ResponseInfo> {
		dto.status = values.PlayerStatus.INACTIVE;
		dto.twoFactorAuth = false;
		dto.verfiedEmail = true;
		dto.avatar = path.DEFAULT_USER_AVATAR;
		const salt: string = await bcrytpt.genSalt(values.SALT_ROUNDS);
		dto.password = await bcrytpt.hash(dto.password, salt);
		const userInfos = await this.userService.createUser(dto);
		const email_jwt = await this.signToken(userInfos, this.config.get(env.JWT_EMAIL_SECRET),
			this.config.get(env.TOKEN_EMAIL_EXPIRATION_TIME));
		const fullName = `${dto.firstName} ${dto.lastName}`;
		await this.sendEmail(dto.email, this.config.get(env.EMAIL_SUBJECT), email_jwt, fullName);
		return new ResponseInfo(HttpStatus.CREATED, messages.SUCESSFULL_MSG);
	}

	async signToken(user: any, secretKey: string, expire: string): Promise<string> {
		const jwt = await this.jwt.signAsync(user, { secret: secretKey, expiresIn: expire });
		return (jwt);
	}

	async validateUser(receiver: string, password: string): Promise<any> {
		const user = await this.userService.findOneUser(receiver);
		if (user) {
			const expectedPassword = await bcrytpt.compare(password, user.password)
			if (expectedPassword) {
				const token = await this.signToken({ id: user.id, email: user.email, user: user.userName }, this.config.get(env.JWT_SECRET), this.config.get(env.JWT_EXPIRATION_TIME));
				const fullName = `${user.firstName} ${user.lastName}`;
				if (user.verfiedEmail == false) {
					this.sendEmail(user.email, this.config.get(env.EMAIL_SUBJECT), token, fullName);
					throw new ForbiddenException(messages.REQUIRED_VALIDATION_EMAIL);
				}
				return { statusCode: HttpStatus.CREATED, token: token, twoFa: user.twoFactorAuth, id: user.id };
			}
		}
		return (null);
	}

	async sendEmail(receiver: string, subject: string, token: any, fullName: string) {
		try {
			const hostname = os.hostname();
			const port = this.config.get(env.PORT);
			const confirmationLink: string = `${path.PROTOCOL}${hostname}${path.SEPARATOR}${port}${path.VALIDATION_EMAIL_ENDPOINT}${token}`;
			const fileContent: string = emailVlidationContent(confirmationLink, fullName);
			this.mailerService.sendMail({
				to: receiver,
				subject: subject,
				html: fileContent
			});
		} catch (error) {
			this.logger.error(error.messages)
		}
	}

	async verfyEmail(token: string): Promise<string> {
		let valid = true;
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
		} catch (error) {
			valid = false;
		}
		const loginUrl = `${path.PROTOCOL}${this.config.get(env.HOST_CLIENT)}${path.SEPARATOR}${this.config.get(env.CLIENT_PORT)}${path.REDIRECTION_ENDPOINT_VALID_EMAIL}${valid}`;
		return loginUrl;
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
			if (existsUser.twoFactorAuth == true)
				return { id: existsUser.id, twoFa: true };
			const token = await this.signToken({ id: existsUser.id, email: existsUser.email, user: existsUser.userName }, this.config.get(env.JWT_SECRET), this.config.get(env.JWT_EXPIRATION_TIME));
			return ({ token: token });
		} catch (error) {
			throw new InternalServerErrorException();
		}
	}

	async TwoAuthGen(userId: string) {


		const Secret = (): string => {
			const random = speakeasy.generateSecret({ length: 20 });
			return random.base32;
		};


		const existUser = await this.prismaService.user.findFirst({
			where: {
				userName: userId,
			},
		});

		if (!existUser) {
			throw new HttpException('NOT FOUND USER', HttpStatus.NOT_FOUND);
		}
		const base32Secret = Secret();
		const totp = new OTPAuth.TOTP({
			issuer: 'whiff-whaff',
			label: existUser.email,
			algorithm: 'SHA1',
			digits: 6,
			period: 30,
			secret: base32Secret,
		});
		const uri = totp.toString();
		const qrCodeImageBuffer = await qrCode.toDataURL(uri);
		await this.prismaService.user.update({
			where: {
				id: existUser.id,
			},
			data: {
				otpAuthurl: uri,
				otpSecret: base32Secret,
			},
		});
		return qrCodeImageBuffer;
	}

	async TwoAuthVer(dto: TwoAuthDto) {
		const userId = await this.prismaService.user.findFirst({
			where: {
				id: dto.id,
			},
		});

		if (!userId) {
			throw new HttpException('NOT FOUND USER', HttpStatus.NOT_FOUND);
		}

		if (userId.otpEnable) {
			return userId.otpEnable;
		}
		const totp = new OTPAuth.TOTP({
			issuer: 'whiff-whaff',
			label: userId.email,
			algorithm: 'SHA1',
			digits: 6,
			period: 30,
			secret: userId.otpSecret,
		});

		const validate = totp.validate({ token: dto.pin });

		if (validate === null) {
			throw new HttpException('INVALID PIN', HttpStatus.BAD_REQUEST);
		}

		const enable = await this.prismaService.user.update({
			where: {
				id: dto.id,
			},
			data: {
				otpEnable: true,
			},
		});
		return {
			otp_enabled: enable.otpEnable,
		};
	}

	async TwoAuthValid(dto: TwoAuthDto) {

		const userId = await this.prismaService.user.findFirst({
			where: {
				id: dto.id,
			},
		});

		if (!userId) {
			throw new HttpException('NOT FOUND USER', HttpStatus.NOT_FOUND);
		}

		const totp = new OTPAuth.TOTP({
			issuer: 'whiff-whaff',
			label: userId.email,
			algorithm: 'SHA1',
			digits: 6,
			period: 30,
			secret: userId.otpSecret,
		});

		const validate = totp.validate({ token: dto.pin });

		if (validate === null) {
			throw new HttpException('INVALID PIN', HttpStatus.BAD_REQUEST);
		}

		const enable = await this.prismaService.user.update({
			where: {
				id: dto.id,
			},
			data: {
				otpValidate: true,
			},
		});
		if (!enable.otpValidate) {
			throw new HttpException('Invalid pin', HttpStatus.BAD_REQUEST);
		}
		const user = await this.userService.findUserById(dto.id);
		const token = await this.signToken({ id: user.id, email: user.email, user: user.userName }, this.config.get(env.JWT_SECRET), this.config.get(env.JWT_EXPIRATION_TIME));
		return { token };
	}


	async TwoAuthDisable(dto: TwoAuthDto) {
		let checkId = await this.prismaService.user.findFirst({
			where: {
				id: dto.id,
			},
		});
		if (!checkId) {
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}

		const disable = await this.prismaService.user.update({
			where: {
				id: dto.id,
			},
			data: {
				otpEnable: false,
				otpValidate: false,
			}
		})
		return {
			otpEnable: disable.otpEnable,
			otpValidate: disable.otpValidate
		};
	}

	async TwoAuthEnable(dto: TwoAuthDto) {
		let checkId = await this.prismaService.user.findFirst({
			where: {
				id: dto.id,
			},
		});
		if (!checkId) {
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}
		const enable = await this.prismaService.user.update({
			where: {
				id: dto.id,
			},
			data: {
				otpEnable: true,
			}
		})
	}

	async checkOTP(email: string) {
		const check = await this.prismaService.user.findUnique({
			where: {
				email: email,
			}
		});
		if (check.otpEnable) {
			return true;
		}
		return false;
	}
}
