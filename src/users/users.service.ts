import { ForbiddenException, HttpStatus, Injectable, InternalServerErrorException } from "@nestjs/common";
import { User, Prisma } from "@prisma/client";
import * as values from "src/shared/constants/constants.values"
import * as messages from "src/shared/constants/constants.messages"
import { SignUpDto } from "src/dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrytpt from 'bcrypt';
import * as ErrorCode from '../shared/constants/constants.code-error';
import * as  CodeMessages from 'src/shared/constants/constants.messages';
import { AchievementService } from "src/achievements/achievements.service";
import { PrismaClientInitializationError, PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService, private readonly achievementService: AchievementService) { }

    async createUser(dto: SignUpDto): Promise<User> {
        try {
            const salt: string = await bcrytpt.genSalt(10);
            dto.password = await bcrytpt.hash(dto.password, salt);
            const userInfos: User = await this.prismaService.user.create({
                data: {
                    userName: dto.userName,
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    avatar: "default",
                    email: dto.email,
                    password: dto.password,
                    twoFactorAuth: false,
                    status: values.PlayerStatus.INACTIVE,
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
            delete userInfos.password;

            return (userInfos);
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === ErrorCode.DUPLICATE_ENTRY_ERROR_CODE) {
                    throw new ForbiddenException(CodeMessages.P2002_MSG + error.meta.target)
                }
            }
            if (error instanceof PrismaClientInitializationError)
                throw new InternalServerErrorException();
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
}