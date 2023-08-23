import { ForbiddenException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { Friendship, FriendshipStatus, Prisma, User } from "@prisma/client";
import { SignUpDto, UpdateUserDto } from "src/dto";
import { PrismaService } from "src/prisma/prisma.service";
import { AchievementService } from "src/achievements/achievements.service";
import { PrismaClientInitializationError, PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import * as values from "src/shared/constants/constants.values"
import * as ErrorCode from '../shared/constants/constants.code-error';
import * as  CodeMessages from 'src/shared/constants/constants.messages';
import * as variables from 'src/shared/constants/constants.name-variables'
import { BucketStorageService } from "src/bucket/bucket.storage-service";
import * as message from 'src/shared/constants/constants.messages'
const userService = 'userService';
@Injectable()
export class UsersService {
	logger = new Logger(userService);
	constructor(private readonly prismaService: PrismaService,
		private readonly achievementService: AchievementService,
		private readonly storageService: BucketStorageService,
	) { }
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
			else if (error instanceof PrismaClientInitializationError) {
				this.logger.error(error.message);
				throw new InternalServerErrorException();
			}
			else {
				this.logger.error(error.messages)
				throw new InternalServerErrorException();
			}
			this.logger.error(error.message);
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

	async findUserById(id: string): Promise<any> {
		try {
			const user = await this.prismaService.user.findUnique({
				select: {
					id: true,
					userName: true,
					firstName: true,
					lastName: true,
					email: true,
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
					id: id,
				}
			});
			if (!user)
				throw new ForbiddenException(CodeMessages.CREDENTIALS_INCORRECT_MSG);
			return user;
		} catch (error) {
			if (error instanceof PrismaClientInitializationError)
				throw new InternalServerErrorException();
		}
	}

	async findUserByUsername(userName: string, loggedUserId: string): Promise<any> {
		try {
			const user = await this.prismaService.user.findUnique({
				select: {
					id: true,
					userName: true,
					firstName: true,
					lastName: true,
					avatar: true,
					email: true,
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
					},
					receiverFriendship: {
						select: {
							status: true,
						},
						where: {
							senderId: loggedUserId
						},
					}
				},
				where: {
					userName: userName
				},
			});
			if (!user)
				throw new NotFoundException(message.USER_NOT_FOUND);
			return user;
		} catch (error) {
			throw new NotFoundException(message.USER_NOT_FOUND);
		}
	}

	async getHistoryGame(idUser: string, page: number, elementsNumer: number): Promise<any> {
		try {
			const historyGame = await this.prismaService.gameHistory.findMany({
				select: {
					game: {
						select: {
							playerOne: {
								select:
								{
									avatar: true,
									userName: true
								}
							},
							playerTwo: {
								select:
								{
									avatar: true,
									userName: true
								}
							}
						}
					},
					scoreLeft: true,
					scoreRight: true
				},
				where: {
					OR: [{ leftUserId: idUser }, { RightUserId: idUser }],
					accepted: true
				},
				skip: page * elementsNumer,
				take: elementsNumer
			});
			if (!historyGame)
				throw new NotFoundException(message.USER_NOT_FOUND);
			return (historyGame)
		} catch (error) {

		}
	}

	async upDateUserdata(id: string, dto: UpdateUserDto, avatarFile: Express.Multer.File): Promise<any> {
		try {
			const { avatar, userName } = await this.prismaService.user.findUnique({
				select: {
					userName: true,
					avatar: true
				},
				where: {
					id: id
				}
			})
			if (avatarFile) {
				this.storageService.deleteImage(userName + avatar.slice(avatar.lastIndexOf('.')));
				const fileName: string = (dto.userName || userName) + "." + avatarFile.mimetype.split('/')[1];
				const avatarUrl = await this.storageService.uploadImage(avatarFile, fileName);
				dto.avatar = avatarUrl;
			}
			const { verfiedEmail, twoFactorAuth, password, ...newUser } = await this.prismaService.user.update({
				where: {
					id: id
				},
				data: {
					avatar: dto.avatar,
					firstName: dto.firstName,
					lastName: dto.lastName,
					userName: dto.userName,
				}
			})

			return newUser;
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === ErrorCode.DUPLICATE_ENTRY_ERROR_CODE) {
					throw new ForbiddenException(dto.userName + CodeMessages.P2002_MSG)
				}
			}
		}
		throw new ForbiddenException();
	}

	async getFriends(id: string): Promise<any> {
		try {
			const friends = await this.prismaService.friendship.findMany({
				select: {
					receiver: {
						select: {
							id: true,
							avatar: true,
							userName: true,
							stat: {
								select: {
									level: true,
									rank: true
								}
							}
						}
					},
					sender: {
						select: {
							id: true,
							avatar: true,
							userName: true,
							stat: {
								select: {
									level: true,
									rank: true
								}
							}
						}
					},
					status: true,
				},
				where: {
					AND: [{ OR: [{ receivedId: id }, { senderId: id }] }, { OR: [{ status: FriendshipStatus.PENDING }, { status: FriendshipStatus.ACCEPTED }] }],
				}
			})
			return friends;
		} catch (error) {
			this.logger.error(error.message);
			throw error
		}
	}
}









