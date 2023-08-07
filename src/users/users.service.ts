import { ForbiddenException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { User } from "@prisma/client";
import { SignUpDto } from "src/dto";
import { PrismaService } from "src/prisma/prisma.service";
import { AchievementService } from "src/achievements/achievements.service";
import { PrismaClientInitializationError, PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import * as values from "src/shared/constants/constants.values"
import * as ErrorCode from '../shared/constants/constants.code-error';
import * as  CodeMessages from 'src/shared/constants/constants.messages';
import * as variables from 'src/shared/constants/constants.name-variables'

const authService = 'UserService';
@Injectable()
export class UsersService {
	constructor(private readonly prismaService: PrismaService, private readonly achievementService: AchievementService) { }
	logger = new Logger(authService);
	async createUser(dto: SignUpDto): Promise<User> {
		try {
			const userInfos: User = await this.prismaService.user.create({
				data: {
					userName: dto.userName,
					firstName: dto.firstName,
					lastName: dto.lastName,
					avatar: dto.avatar,
					email: dto.email,
					password: dto.password,
					twoFactorAuth: dto.twoFactorAuth,
					status: dto.status,
					verfiedEmail: dto.verfiedEmail,
					stat: {
						create: {
							wins: values.DEFAULT_NB_WINS_USER,
							loses: values.DEFAULT_NB_LOSES_USER,
							level: values.DEFAULT_LEVEL_USER,
							rank: values.DEFAULT_RANK_USER
						}
					},
				}
			});
			await this.achievementService.addAchievementsToUser(userInfos);
			return (delete userInfos.password, userInfos);
		}
		catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === ErrorCode.DUPLICATE_ENTRY_ERROR_CODE) {
					let field = (error.meta.target == variables.USERNAME_DB) ?
						this.prismaService.user.fields.userName.name :
						this.prismaService.user.fields.email.name;
					field = field.charAt(0).toUpperCase() + field.slice(1);
					throw new ForbiddenException(field + CodeMessages.P2002_MSG)
				}
			}
			else if (error instanceof PrismaClientInitializationError)
				throw new InternalServerErrorException();
				else {
					this.logger.error(error.messages)
					throw new InternalServerErrorException();
			}
		}
	}

	async findOneUser(email: string): Promise<User> {
		try {
			const user = await this.prismaService.user.findUnique({
				where: {
					email: email
				}
			})
			if (!user)
				throw new ForbiddenException(CodeMessages.CREDENTIALS_INCORRECT_MSG);
			return (user);
		} catch (error) {
			if (error instanceof PrismaClientInitializationError)
				throw new InternalServerErrorException();
		}
	}

	async findOneUserById(id: string): Promise<User> {
		try {
			const user = await this.prismaService.user.findUnique({
				where: {
					id: id
				}
			})
			if (!user)
				throw new ForbiddenException(CodeMessages.CREDENTIALS_INCORRECT_MSG);
			return (delete user.password, user);
		} catch (error) {
			if (error instanceof PrismaClientInitializationError)
				throw new InternalServerErrorException();
		}
	}

	async getUserData(userName: string): Promise<any> {
		const { id, ...userData } = await this.prismaService.user.findUnique({
			select: {
				id: true,
				userName: true,
				firstName: true,
				lastName: true,
				avatar: true,
				stat: {
					select: {
						wins: true,
						loses: true,
						level: true,
						rank: true
					}
				},
				achievements: {
					select: {
						level: true,
						achievement: {
							select: {
								name: true,
								description: true
							}
						}
					}
				}
			},
			where: {
				userName: userName
			}
		});

		const historyGame = await this.prismaService.gameHistory.findMany({
			select: {	
				game: {
					select :{
						playerOne: {
							select: 
							{
								firstName: true,
								lastName: true,
								avatar: true
							}
						},
						playerTwo: {
							select: 
							{
								firstName: true,
								lastName: true,
								avatar: true
							}
						}
					}
				},
				scoreLeft: true,
				scoreRight: true
			},
			where: {
				OR: [{ leftUserId: id }, { RightUserId: id }],
				accepted: true
			}
		});
		console.log(historyGame);
		return (historyGame)
	}
}