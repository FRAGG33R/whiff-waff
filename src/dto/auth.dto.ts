import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, isBoolean } from "class-validator";
import {PlayerStatus} from '@prisma/client'


export class AuthDto {

    @IsNotEmpty()
    userName: string;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    avatar: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    passwordHash: string;

    @IsNotEmpty()
    @IsBoolean()
    twoFactorAuth: boolean;

    @IsNotEmpty()
    @IsEnum(PlayerStatus)
    status: PlayerStatus
}