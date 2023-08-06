import { ForbiddenException, HttpStatus, Injectable, InternalServerErrorException } from "@nestjs/common";
import { User, Prisma } from "@prisma/client";
import { SignUpDto } from "src/dto";
import { PrismaService } from "src/prisma/prisma.service";
import { AchievementService } from "src/achievements/achievements.service";
import { PrismaClientInitializationError, PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import * as values from "src/shared/constants/constants.values"
import * as bcrytpt from 'bcrypt';
import * as ErrorCode from '../shared/constants/constants.code-error';
import * as  CodeMessages from 'src/shared/constants/constants.messages';
import * as variables from 'src/shared/constants/constants.name-variables'
@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService, private readonly achievementService: AchievementService) { }

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