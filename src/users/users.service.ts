import { ForbiddenException, HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { FriendshipStatus, User } from "@prisma/client";
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
const prefixImage = 'cloud'
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
			else {
				this.logger.error(error.message);
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
			let { receiverFriendship, ...user } = await this.prismaService.user.findUnique({
				select: {
					id: true,
					userName: true,
					firstName: true,
					lastName: true,
					avatar: true,
					email: true,
					otpEnable: true,
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
			const isBlockedMe = await this.prismaService.friendship.findMany({
				where: {
					OR: [
						{
							AND: {
								senderId: user.id,
								receivedId: loggedUserId
							}
						}, {
							AND: {
								senderId: loggedUserId,
								receivedId: user.id
							}
						}]
				}
			});

			if (isBlockedMe[0] && ((isBlockedMe[0].status == FriendshipStatus.BLOCKED) && isBlockedMe[0].blockedId !== loggedUserId))
				throw { type: 'forbidden' };
			(user as any).status = (isBlockedMe.length > 0 && isBlockedMe[0].status) || FriendshipStatus.UNFRIEND;
			return user;
		} catch (error) {
			if (error.type == 'forbidden')
				throw new ForbiddenException('user blocked you');
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
					OR: [{ leftUserId: idUser }, { rightUserId: idUser }],
					accepted: true
				},
				skip: page * elementsNumer,
				take: elementsNumer,
			});
			if (!historyGame)
				throw new NotFoundException(message.USER_NOT_FOUND);
			const gamesNumber = await this.prismaService.gameHistory.count({
				where: {
					OR: [{ leftUserId: idUser }, { rightUserId: idUser }],
					accepted: true
				},
			})
			let gamesData: { historyGame: any, gamesNumber: any } = { historyGame, gamesNumber };
			(gamesData as any).elementsNumber = historyGame.length
			return (gamesData)
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
				await this.storageService.deleteImage(prefixImage + userName + avatar.slice(avatar.lastIndexOf('.')));
				const fileName: string = (dto.userName || userName) + "." + avatarFile.mimetype.split('/')[1];
				const avatarUrl = await this.storageService.uploadImage(avatarFile, prefixImage + fileName);
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

	private async getPendingFriends(id: string, page: number, elementsNumer: number): Promise<any> {
		const pendingFriends = this.prismaService.friendship.findMany({
			select: {
				sender: {
					select: {
						id: true,
						avatar: true,
						userName: true,
						status: true,
						stat: {
							select: {
								level: true,
								rank: true
							}
						}
					},
				},
				status: true,
			},
			where: {
				AND: [{ receivedId: id }, { status: FriendshipStatus.PENDING }],
			},
			skip: page * elementsNumer,
			take: elementsNumer,
		})
		return pendingFriends;
	}

	private async getAcceptedFriends(id: string, page: number, elementsNumer: number): Promise<any> {
		const acceptedFriends = this.prismaService.friendship.findMany({
			select: {
				receiver: {
					select: {
						id: true,
						avatar: true,
						userName: true,
						status: true,
						stat: {
							select: {
								level: true,
								rank: true
							}
						},
					},
				},
				sender: {
					select: {
						id: true,
						avatar: true,
						userName: true,
						status: true,
						stat: {
							select: {
								level: true,
								rank: true
							}
						}
					},
				},
				status: true,
			},
			where: {
				AND: [{ OR: [{ receivedId: id }, { senderId: id }] }, { status: FriendshipStatus.ACCEPTED }],
			},
			skip: page * elementsNumer,
			take: elementsNumer,
		})
		return acceptedFriends;
	}

	private async getAcceptedFriendById(loggedUserId: string, RequestSenderId: string): Promise<any> {
		const acceptedFriends = this.prismaService.friendship.findUnique({
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
						},
					},
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
					},
				},
				status: true,
			},
			where: {
				senderId_receivedId: {
					receivedId: loggedUserId,
					senderId: RequestSenderId
				}
			},
		})
		return acceptedFriends;
	}

	async getFriends(id: string, page: number, elementsNumer: number): Promise<any> {
		try {
			const pendingFriends = await this.getPendingFriends(id, page, elementsNumer);
			const acceptedFriends = await this.getAcceptedFriends(id, page, elementsNumer);
			const pendingNumber = await this.prismaService.friendship.count({
				where: {
					AND: [{ receivedId: id }, { status: FriendshipStatus.PENDING }],
				}
			})
			const acceptedNumber = await this.prismaService.friendship.count({
				where: {
					AND: [{ OR: [{ receivedId: id }, { senderId: id }] }, { status: FriendshipStatus.ACCEPTED }],
				}
			})
			let friendsData: { pendingFriends: any, acceptedFriends: any, pendingNumber: any, acceptedNumber: any } = { pendingFriends, acceptedFriends, pendingNumber, acceptedNumber }
			return friendsData;
		} catch (error) {
			this.logger.error(error.message);
			throw error
		}
	}

	async SendFriendshipRequest(senderId: string, receivedId: string): Promise<any> {
		try {
			const existingUser = await this.prismaService.friendship.findMany({
				where: {
					OR: [
						{
							AND: [{ receivedId: receivedId }, { senderId: senderId }]
						},
						{
							AND: [{ receivedId: senderId }, { senderId: receivedId }]
						}
					]
				},
			})
			for (let i = 0; i < existingUser.length; i++) {
				if (existingUser[i].status == FriendshipStatus.BLOCKED)
					throw message.INVITAION_TO_BLOCKED_USER
				else if (existingUser[i].status == FriendshipStatus.PENDING || existingUser[i].status == FriendshipStatus.ACCEPTED)
					throw message.ERROR_INVITATON
			}
			const data = await this.prismaService.friendship.create({
				data: {
					senderId: senderId,
					receivedId: receivedId,
					status: FriendshipStatus.PENDING
				}
			})
			return data;
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === ErrorCode.DUPLICATE_ENTRY_ERROR_CODE)
					throw new HttpException(message.ERROR_INVITATON, HttpStatus.CONFLICT)
				if (error.code === ErrorCode.FOREIGN_KEY_CONSTRAINT_CODE)
					throw new NotFoundException(message.UNEXISTING_ID)
			}
			throw new ForbiddenException(error);
		}
	}


	async deleteFriendshipTuple(loggedUserId: string, RequestSenderId: string): Promise<any> {
		const existData = await this.prismaService.friendship.findUnique({
			where: {
				senderId_receivedId: {
					receivedId: RequestSenderId,
					senderId: loggedUserId
				}
			}
		})
		if (existData) {
			await this.prismaService.friendship.delete({
				where: {
					senderId_receivedId: {
						receivedId: RequestSenderId,
						senderId: loggedUserId
					}
				},
			})
		}
	}

	async findFriendshipTuple(loggedUserId: string, RequestSenderId: string): Promise<any> {
		let data = await this.prismaService.friendship.findUnique({
			where: {
				senderId_receivedId: {
					receivedId: loggedUserId,
					senderId: RequestSenderId
				}
			},
		});
		if (!data)
			data = await this.prismaService.friendship.findUnique({
				where: {
					senderId_receivedId: {
						receivedId: RequestSenderId,
						senderId: loggedUserId
					}
				},
			});
		return data;
	}

	async updateFriendshipStatus(loggedUserId: string, RequestSenderId: string, status: FriendshipStatus): Promise<any> {
		try {
			let data: any;
			if (status == FriendshipStatus.REFUSED) {
				data = await this.prismaService.friendship.delete({
					where: {
						senderId_receivedId: {
							receivedId: loggedUserId,
							senderId: RequestSenderId
						}
					},
				})
			}
			else if (status == FriendshipStatus.UNFRIEND) {
				data = await this.findFriendshipTuple(loggedUserId, RequestSenderId);
				data = await this.prismaService.friendship.delete({
					where: {
						senderId_receivedId: {
							receivedId: data.receivedId,
							senderId: data.senderId
						}
					},
				})
			}
			else if (status == FriendshipStatus.ACCEPTED) {
				data = await this.prismaService.friendship.update({
					data: {
						status: status
					},
					where: {
						senderId_receivedId: {
							receivedId: loggedUserId,
							senderId: RequestSenderId
						}
					},
				})
				data = await this.getAcceptedFriendById(loggedUserId, RequestSenderId);
			}
			else {
				data = await this.findFriendshipTuple(loggedUserId, RequestSenderId);
				const blockedId = status == FriendshipStatus.BLOCKED ? loggedUserId : undefined;
				data = await this.prismaService.friendship.update({
					data: {
						status: status,
						blockedId: blockedId
					},
					where: {
						senderId_receivedId: {
							receivedId: data.receivedId,
							senderId: data.senderId
						}
					},
				});
			}
			return data;
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError)
				throw new NotFoundException(message.ERROR_SENT_INVITATON)
		}
	}

	async searchUsersByNames(firstName: string): Promise<any> {
		try {
			if (!firstName)
				return [];
			return await this.prismaService.user.findMany({
				select: {
					avatar: true,
					userName: true
				},
				where: {
					userName: {
						startsWith: firstName
					}
				}
			})
		} catch (error) {
			throw new InternalServerErrorException();
		}
	}

}
