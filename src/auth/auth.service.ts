import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrytpt from 'bcrypt';
import * as ErrorCode from '../constents/constents.code-error';
import * as  CodeMessages from 'src/constents/constents.error-messages';
import { printSync } from '@swc/core';
@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService) { }

    async singUp(dto: AuthDto): Promise<User> {
        try {
            const salt: string = await bcrytpt.genSalt(10);
            dto.passwordHash = await bcrytpt.hash(dto.passwordHash, salt);
            const userInfos: User = await this.prismaService.user.create({
                data: {
                    userName: dto.userName,
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    avatar: dto.avatar,
                    email: dto.email,
                    passwordHash: dto.passwordHash,
                    passwordSalt: salt,
                    twoFactorAuth: dto.twoFactorAuth,
                    status: dto.status,
                    stat : {
                        create : {
                            wins: 0,
                            loses: 0,
                            level: 0,
                            rank: "ROOKIE"
                        }
                    },
                }
            });

            const achievements = await this.prismaService.achievement.findMany();
            for (let i = 0; i < achievements.length; i++)
            {
                await this.prismaService.haveAchievement.create({
                    data : {
                        userId: userInfos.id,
                        achievementId: achievements[i].id,
                        level: 0
                    }
                })
            }
            
            delete userInfos.passwordHash;
            delete userInfos.passwordSalt;
            return (userInfos);
        }
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === ErrorCode.DUPLICATE_ENTRY_ERROR_CODE) {
                    throw new ForbiddenException(CodeMessages.P2002_MSG + error.meta.target)
                }
            }
            throw error;
        }
    }

    singIn() {
        return ("singin")
    }
}
